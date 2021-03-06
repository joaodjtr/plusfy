import React, { useContext, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { AdditionalColumn, AdditionalTrackRowOption } from '../../../../components/common/listTracks/types';
import ContextPlaylist from '../../../../components/playlist/ContextPlaylist';
import { IStore } from '../../../../redux/store/types';
import { IUser } from '../../../../redux/store/user/types';
import { Track } from "../../../api/webapi/types"
import {Calendar} from 'react-feather'
import { formatAddedAt } from '../../../helpers/helperPlaylist';
import useDisabledTracks from '../../state/useDisabledTracks';
import { isTrackDisabled } from '../../../api/disabledTracks/disabledTracks';
import { addToQueue } from '../../../api/webapi/player';
import { IToken } from '../../../../redux/store/token/types';
import useAlert from '../alert/useAlert';
import { removeTracksPlaylist } from '../../../api/webapi/playlists';
import useAddToPlaylist from '../addPlaylist/useAddToPlaylist';

interface HookProps{
    (): {
        tracks: Track[]
        additionalColumns: AdditionalColumn[]
        additionalOptions: AdditionalTrackRowOption[]
        continuousPlayback: boolean
    }
}

const usePlaylistTracks: HookProps = () => {
    const {playlist, fakePlaylist, updatePlaylist} = useContext(ContextPlaylist)
    const [continuousPlayback, setContinuousPlayback] = useState(false)
    const actionDisableTracks = useDisabledTracks()
    const {id: userId} = useSelector<IStore, IUser>(store => store.user)
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const addToPlaylist = useAddToPlaylist()
    const createAlert = useAlert()

    const tracks = useMemo(() => {
        if(playlist){
            return playlist?.tracks.items.filter(item => item.track ? true : false).map(item => item.track)
        }else{
            setContinuousPlayback(true)
            return fakePlaylist?.tracks.filter(track => track ? true : false) || []
        }
    },[playlist, fakePlaylist])


    const additionalColumns = useMemo<AdditionalColumn[]>(() => {
        if(playlist){
            return [{
                headerContent: <Calendar/>,
                bodyContent: playlist?.tracks.items.map(item => formatAddedAt(item.added_at)) || []
            }]
        }
        return []
    },[playlist])

    const additionalOptions = useMemo<AdditionalTrackRowOption[]>(() => {
        if(playlist){
            const options: AdditionalTrackRowOption[] = [
                {
                    content: 'Adicionar à playlist',
                    onClick: async (track) => {
                        addToPlaylist('add-track', [track?.uri || ''], updatePlaylist)
                    }
                },
                {
                    content: 'Habilitar nessa playlist',
                    condition: (track) => isTrackDisabled({userId, playlistURI: playlist.uri, tracks: [{uri: track?.uri || ''}]})[0],
                    onClick: (track) => {
                        actionDisableTracks({action: 'enable', playlistURI: playlist.uri, tracks: [{uri: track?.uri || ''}]})
                    }
                },
                {
                    content: 'Adicionar à fila',
                    condition: (track) => !isTrackDisabled({userId, playlistURI: playlist.uri, tracks: [{uri: track?.uri || ''}]})[0],
                    onClick: async (track) => {
                        const res = await addToQueue({accessToken, uri: track?.uri || ''})
                        if(res?.status === 204)
                            createAlert('normal','Música adicionada à fila 🎶.')
                    }
                },
                {
                    content: 'Desabilitar nessa playlist',
                    condition: (track) => !isTrackDisabled({userId, playlistURI: playlist.uri, tracks: [{uri: track?.uri || ''}]})[0],
                    onClick: (track) => {
                        actionDisableTracks({action: 'disable', playlistURI: playlist.uri, tracks: [{uri: track?.uri || ''}]})
                    }
                }
            ]

            if(playlist.owner.id === userId){
                const removePlaylistOption: AdditionalTrackRowOption = {
                    content: 'Remover dessa playlist',
                    onClick: async (track, index) => {
                        const status = await removeTracksPlaylist(accessToken, {playlistId: playlist.id, tracks: [{uri: track?.uri || '', positions: [index]}]})
                        if(status === 200){
                            updatePlaylist()
                            createAlert('normal', 'Música removida dessa playlist 👋.')
                        }
                    }
                }
                
                return [options[0], removePlaylistOption, ...options.slice(1)]
            }
            return [...options]
        }
        return []
    },[addToPlaylist, playlist, actionDisableTracks, userId, accessToken, createAlert, updatePlaylist])

    return {tracks, continuousPlayback, additionalColumns, additionalOptions}
}

export default usePlaylistTracks