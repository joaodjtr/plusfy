import React from 'react'
import { ThumbnailTrack as Props} from '../../../common/hooks/components/mood/landing/types'
import styled from 'styled-components'
import { colors } from '../../../styles/style'

const ThumbnailTrack: React.FC<Props> = ({name, imgSrc}) => {
    return (
        <ThumbnailStyled imgSrc={imgSrc} title={name}>
            <img src={imgSrc} alt={name}/>
        </ThumbnailStyled>
    )
}

const ThumbnailStyled = styled.figure<{imgSrc: string}>`
    height: 100%;
    width: 100%;
    background: ${colors.darkerBackground};
    position: relative;

    &::before{
        content: "";
        padding-bottom: 100%;
        display: block;
    }
    
    img{
        height: 100%;
        width: 100%;
        max-height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
        transition: .5s opacity;
        opacity: 0;

        ${({imgSrc}) => {
            if(imgSrc){
                return `
                    opacity: 1;
                `
            }
        }}
    }
`

export default ThumbnailTrack