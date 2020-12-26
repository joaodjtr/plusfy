import React from 'react';
import styled from 'styled-components';
import {PlayCircle, PauseCircle, Play, Pause, SkipBack as Prev, SkipForward as Next, Shuffle, Repeat} from 'react-feather'
import { breakpoints, colors, metrics } from '../../../../styles/style';
import useNowPlayingMainButtons from '../../../../common/hooks/components/nowPlaying/useNowPlayingMainButtons';
import { ICurrentState } from '../../../../redux/store/currentState/types';
import { IStore } from '../../../../redux/store/types';
import { useSelector } from 'react-redux';
import { handleRepeatState } from '../../../../common/helpers/helperNowPlaying';

const CenterButtons = () => {
    const {clickShuffle, clickPrevious, clickPlayPause, clickNext, clickRepeat} = useNowPlayingMainButtons()
    const currentState = useSelector<IStore, ICurrentState>(store => store.currentState)

    return(
        <>
            <Desktop>
                <ShuffleButton
                    onClick={clickShuffle}
                    isAvailable={currentState.actions?.disallows?.toggling_shuffle === true ? false : true}
                    isActive={currentState.shuffle_state || false}
                >
                    <Shuffle/>
                </ShuffleButton>
                <ActionButton
                    onClick={clickPrevious}
                    isAvailable={currentState.actions?.disallows?.skipping_prev === true ? false : true}
                >
                    <Prev/>
                </ActionButton>
                <PlayPauseButton
                    onClick={clickPlayPause}
                    isPlaying={currentState.is_playing || false}
                >
                    {currentState.is_playing ? <PauseCircle/> : <PlayCircle/>}
                </PlayPauseButton>
                <ActionButton
                    onClick={clickNext}
                    isAvailable={currentState.actions?.disallows?.skipping_next === true ? false : true}
                >
                    <Next/>
                </ActionButton>
                <RepeatButton
                    onClick={clickRepeat}
                    isAvailable={currentState.actions?.disallows?.toggling_repeat_track === true ? false : true}
                    repeatState={currentState.repeat_state || 'off'}
                >
                    <Repeat/>
                </RepeatButton>
            </Desktop>
            <Mobile>
                <ActionButton
                    onClick={clickPrevious}
                    isAvailable={currentState.actions?.disallows?.skipping_prev === true ? false : true}
                >
                    <Prev/>
                </ActionButton>
                <PlayPauseButton
                    onClick={clickPlayPause}
                    isPlaying={currentState.is_playing || false}
                >
                    {currentState.is_playing ? <Pause/> : <Play/>}
                </PlayPauseButton>
                <ActionButton
                    onClick={clickNext}
                    isAvailable={currentState.actions?.disallows?.skipping_next === true ? false : true}
                >
                    <Next/>
                </ActionButton>
            </Mobile>
        </>
    );
}

export default CenterButtons

interface AvailableAction{
    isAvailable: boolean
}

interface ShuffleButton extends AvailableAction{
    isActive: boolean
} 

interface RepeatButton extends AvailableAction{
    repeatState: ICurrentState['repeat_state']
}

const ActionButton = styled.figure<AvailableAction>`
    margin: 0 ${metrics.spacing4};

    svg{
        height: 20px;
        width: 20px;
        fill: #fff;
    }

    ${({isAvailable}) => {
        if(!isAvailable){
            return `
                svg{
                    opacity: var(--iconOpacityDisabled);
                }
                pointer-events: none;
                user-select: none;`
        }
        return `
            svg{
                opacity: var(--iconOpacity);
            }
            cursor: pointer;
        `
    }}

    @media(max-width: ${breakpoints.tbl}){
        margin: 0 ${metrics.spacing3};
    }

    @media(max-width: ${breakpoints.tbp}){
        margin: 0 10px;
        &:first-child{
            margin-left: 0;
        }

        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media(max-width: ${breakpoints.smp}){
        margin: 0 7.5px;
    }
`

const MockupShuffleAndRepeat = styled(ActionButton)`
    @media(max-width: ${breakpoints.lg}){
        margin: 0 ${metrics.spacing3};
    }
    
    @media(max-width: ${breakpoints.tbl}){
        margin: 0 ${metrics.spacing2};
    }
`

const ShuffleButton = styled(MockupShuffleAndRepeat)<ShuffleButton>`
    svg{
        fill: none;
        ${({isActive}) => isActive ? `stroke: ${colors.primary}; opacity: 1;` : ''}
    }
`

const RepeatButton = styled(MockupShuffleAndRepeat)<RepeatButton>`
    svg{
        fill: none;
    }

    ${({repeatState}) => handleRepeatState(repeatState || 'off')}
`

const PlayPauseButton = styled.figure<{isPlaying: boolean}>`
    cursor: pointer;

    svg{
        height: 40px;
        width: 40px;
        opacity: var(--iconOpacity);

        circle{
            stroke-width: 1px;
        }

        polygon{
            fill: #fff;
        }
    }

    @media(max-width: ${breakpoints.tbp}){
        display: flex;
        justify-content: center;
        height: 35px;
        width: 35px;

        svg{
            height: 100%;
            width: 100%;
            stroke-width: 0;

            rect{
                width: 4px;
                fill: #fff;
            }
        }
    }

    @media(max-width: ${breakpoints.sml}){
        height: 30px;
        width: 30px;
    }
`

const Mobile = styled.div`
    height: 100%;
    width: 100%;
    display: none;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    padding: var(--innerPadding);
    padding-right: 0;

    @media(max-width: ${breakpoints.tbp}){
        display: flex;
    }
`

const Desktop = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--innerVertical) 0;
    

    @media(max-width: ${breakpoints.tbl}){
        justify-content: space-between;
    }

    @media(max-width: ${breakpoints.tbp}){
        display: none;
    }

    figure{
        svg{
            transition: var(--iconOpacityTransition);
        }

        &:hover{
            svg{
                opacity: var(--iconOpacityActivate);
            }
        }
    }
`