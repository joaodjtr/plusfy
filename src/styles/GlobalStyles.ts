import {createGlobalStyle} from 'styled-components'
import {colors} from './style'

const GlobalStyles = createGlobalStyle`
    html, body, #root{
        height: 100%;
        min-height: 100vh;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    body{
        background: ${colors.background};
    }

    table{
        border-collapse: collapse;
        border-spacing: 0;
    }

    table, caption, tbody, tfoot, thead, tr, th, td {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }

    *{
        margin: 0;
        padding: 0;
        outline: 0;
        border: none;
        box-sizing: border-box;
        list-style: none;
        text-decoration: none;
        color: #fff;
    }

    *,
    button,
    input{
        font-family: Montserrat, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    h1{
        font-size: 40px;
        font-weight: 600;
        line-height: 49px;
    }
`

export default GlobalStyles