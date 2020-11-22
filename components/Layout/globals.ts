import { createGlobalStyle } from "styled-components";
import { Dark, Gold } from "../../utils/colors";

export default createGlobalStyle`
    html, body{
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }

    body{
        position: relative;
        background: url('/assets/background.png');
    }

    *,
    *::after,
    *::before{
        box-sizing: inherit;
    }

    ul{
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    a,
    a:active{
        color: inherit
    }

    @media screen and (min-width: 800px){
        ::-webkit-scrollbar {
            width: 25px;
        }

        ::-webkit-scrollbar-track {
            background: #1f1f1f;
        }

        ::-webkit-scrollbar-thumb {
            background: ${Gold};
            border-radius: 25vw;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
        }
    }
`;