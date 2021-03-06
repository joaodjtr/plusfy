import styled, {css} from "styled-components";
import { breakpoints, metrics, Title, Text } from "../../styles/style";

export const ListContent = styled.div`
    flex: 1;
    max-width: 50%;
    
    ${Title}{
        font-size: 30px;
        margin: 0 0 ${metrics.spacing3} 0;
    }

    @media(max-width: ${breakpoints.tbl}){
        max-width: inherit;
        padding: 0 0 ${metrics.spacing3} 0;

        ${Title}{
            margin: 0 0 ${metrics.spacing1} 0;
        }
    }

    @media(max-width: ${breakpoints.sml}){
        ${Title}{
            font-size: 25px;
        }
    }
`

export const MessageStatus = styled(ListContent)<{status: 'loading' | string}>`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;

    svg{
        height: 75px;
        width: 75px;
        ${({status}) => status === 'loading' ? 'animation: rotation 3s infinite linear;' : '' }

        @keyframes rotation{
            from{
                transform: rotate(0deg);
            }
            to{
                transform: rotate(359deg);
            }
        }
    }

    ${Text}{
        margin: ${metrics.spacing3} 0 0 0;
        text-align: center;
    }
`

export const ListsWrapper = styled.div`
    flex: 1 1 auto;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    margin: ${metrics.spacing4} 0 0 0;
    
    @media(max-width: ${breakpoints.tbl}){
        flex-flow: column nowrap;
        
        ${ListContent}{
            &:nth-child(1){
                order: 2;
            }
            &:nth-child(2){
                order: 1;
            }
        }
        
        ${MessageStatus}{
            padding: ${metrics.spacing5} 0;
        }
    }
`

export const additionalCSS = css`
    li{
        div{
            &:nth-child(1){
                padding-left: 0;
                padding-right: 0;
            }
            &:nth-child(2) img{
                width: 55px;
                height: 55px;

                @media(max-width: ${breakpoints.sml}){
                    height: 45px;
                    width: 45px;
                }
            }
        }
    }
`