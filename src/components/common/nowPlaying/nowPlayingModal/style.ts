import styled from 'styled-components'
import { IPlayer } from '../../../../common/api/webapi/types'
import { handleRepeatState } from '../../../../common/helpers/helperNowPlaying'
import { colors } from '../../../../styles/style'

export const Controls = styled.div`
    margin: 16px 0 0 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media(max-width: 360px){
        margin: 8px 0 0 0;
    }
`

interface ButtonProps{
    isAvailable?: boolean
    isActive?: boolean
    repeatState?: IPlayer['repeat_state']
}

export const Button = styled.button<ButtonProps>`
    svg{
        cursor: pointer;
        height: 20px;
        width: 20px;
        transition: var(--iconOpacityTransition);
        stroke-width: 1.5px;

        @media(min-width: 480px){ 
            height: 25px;
            width: 25px;
        }
    }

    ${({isAvailable, isActive, repeatState}) => {
        let css = ''

        if(isAvailable === false)
            css += `
                svg{
                    opacity: var(--iconOpacityDisabled);
                }
                pointer-events: none;
                user-select: none;
            `
        if(isActive === true)
            css += `
                svg{
                    stroke: ${colors.primary};
                    color: ${colors.primary};
                    opacity: var(--iconOpacityActivate);
                }
            `
        if(repeatState){
            css += handleRepeatState(repeatState)
        }

        return css
    }}
`