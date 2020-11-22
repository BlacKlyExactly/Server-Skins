import styled, { css } from "styled-components";
import { Gold, Dark } from "../../utils/colors";

export const DropButton = styled.button`
    background: transparent;
    border: none;
    color: white;
    margin: 0 0.5vw;
    cursor: pointer;    

    svg{
        width: 30px;
        height: 30px;

        transform: rotate(180deg);

        @media screen and (min-width: 1200px){
            transform: rotate(0deg);
        }
    }
`;

export const DropBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    background: ${Gold};
    top: -250%;
    right: 5%;
    width: 300px;
    height: 200px;
    border-radius: 0.7vw;
    box-shadow: 
        0 0 20px rgba(0, 0, 0, 0.2),
        inset 0 0 10px rgba(0, 0, 0, 0.3);

    @media screen and (min-width: 1200px){
        top: 90%;
        width: 400px;
        height: 300px;
    }
`;

export const DropBoxButtons = styled.div`
    width: 100%;
    height: 35%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DropBoxButton = styled.button`
    width: 25%;
    height: 50%;
    font-family: "Montserrat";
    background: ${Dark};
    color: ${Gold};
    font-weight: 600;
    border: none;
    margin: 1vw 10px;
    cursor: pointer;

    @media screen and (min-width: 800px){
        width: 25%;
        height: 35%;
        margin: 0 0.2vw;
    }
`;

export const DropBoxTradeUrlBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2vw 0;
    width: 80%;
`;

export const DropBoxTradeInput = styled.input`
    padding: 2vmax 1vmax;
    height: 100%;
    border: none;
    border-bottom: 0.2vw solid ${Dark};
    width: 100%;
    font-family: "Montserrat";

    @media screen and (min-width: 800px){
        padding: 0.5vw 1vmax;
    }
`;

export const DropBoxTradeInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 1vw 0;
`;

export const DropBoxTradeLabel = styled.label`
    font-size: 2.5vmax;

    @media screen and (min-width: 800px){
        font-size: 1.7vmin;
    }
`;

export const DropBoxTradeState = styled.span`
    color: #ff051b;

    ${({ isValid }) => isValid && css`
        color: #2cfc03;
    `}

    svg{
        height: 20px;
        width: 20px;

        @media screen and (min-width: 800px){
            width: 2vmin;
            height: 2vmin;
        }
        filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
    }
`;