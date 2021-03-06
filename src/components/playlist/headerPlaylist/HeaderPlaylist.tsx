import React, { useContext } from 'react'
import styled from 'styled-components'
import { Page, Container, Title, metrics, colors, breakpoints } from '../../../styles/style'
import { Link } from 'react-router-dom'
import HeaderPlaylistButtons from './HeaderPlaylistButtons'
import ContextPlaylist from '../ContextPlaylist'
import { calculatePlaylistDuration, formatNumberTracks, formatPlaylistImage } from '../../../common/helpers/helperPlaylist'


const HeaderPlaylist = () => {
    const { playlist, fakePlaylist } = useContext(ContextPlaylist)
    const name = playlist?.name || fakePlaylist?.name || ''
    const image = formatPlaylistImage(playlist, fakePlaylist) 
    const playlistDuration = calculatePlaylistDuration(playlist)
    const numberTracks = formatNumberTracks(playlist)
    
    return (
        <>{playlist || fakePlaylist ?
            <Header>
                <Container>
                    <HeaderInner>  
                        <figure>
                            <img src={image} alt={`Playlist: ${name}`} />
                        </figure>
                        <span>
                            <small>Playlist</small>
                            <Title>{name}</Title>
                            {
                                playlist ? 
                                <p>
                                    <Link to={`/user/${playlist.owner.id}`}>
                                        De {playlist.owner.display_name || `Usuário - ${playlist.owner.id}`}
                                    </Link> 
                                    <span> - {numberTracks}, {playlistDuration}</span>
                                </p>
                                : <></>
                            }
                            <HeaderPlaylistButtons/>
                        </span>
                    </HeaderInner>
                </Container>
            </Header>
        : <></>}</>
    )
}

export default HeaderPlaylist

const HeaderInner = styled.header`
    --image-size: 200px;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;

    ${Container}{
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
    }

    & > figure{
        height: var(--image-size);
        width: var(--image-size);

        img{
            height: 100%;
            width: 100%;
            border-radius: ${metrics.borderRadius};
            box-shadow: ${metrics.boxShadow};
            object-fit: cover;
        }
    }


    & > span{
        padding: 0 0 0 ${metrics.spacing4};
        flex: 1 1 auto;
        min-height: var(--image-size);
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-end;

        small{
            margin: 0;
            text-transform: uppercase;
            font-weight: 500;
            font-size: 16px;
            letter-spacing: 1.2px;
        }

        ${Title}{
            margin: ${metrics.spacing2} 0 0 0;
            line-height: 1.2;
        }
        
        p{
            margin: ${metrics.spacing2} 0 0 0;
            *{
                font-weight: 500;
                font-size: 16px;
                color: ${colors.gray};
            }
            a{
                text-decoration: underline;
            }
        }
    }

    @media(max-width: ${breakpoints.tbl}){
        --image-size: 175px;

        & > span{
            p *{
                font-size: 14px;
            }
            ${Title}{
                font-size: 25px;
            }
        }
    }

    @media(max-width: ${breakpoints.tbp}){
        --image-size: 200px;
        height: auto;
        flex-flow: column nowrap;
        align-items: center;
        padding: ${metrics.spacing3} 0 0 0;

        & > figure{
            height: auto;
            width: 100%;
            max-width: var(--image-size);

            img{
                object-fit: contain;
            }
        }

        & > span{
            min-height: 0;
            padding: ${metrics.spacing3} 0 0 0;

            *{
                text-align: center;
            }
            small{
                font-size: 12px;
            }
            p{
                margin-top: ${metrics.spacing3};
            }
            ${Title}{
                font-size: 23px;
            }
        }
    }

    @media(max-width: ${breakpoints.sml}){
        & > span p span{
            display: none;
        }
    }
`

const Header = styled(Page)`
    height: auto;
    flex: 0;
    padding-bottom: 0;
`