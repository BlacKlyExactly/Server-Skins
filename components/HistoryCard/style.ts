import styled, { css } from "styled-components";

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    background: #201D1D;
    width: 100%;
    height: 60px;
    margin: 0.5vw 0;

    @media screen and (min-width: 800px){
        width: 85%;
        height: 7vmin;
    }
`;

export const Field = styled.div`
    ${({ fieldWidth }) => css`
        width: ${fieldWidth ? fieldWidth : "25%"};
    `};

    ${({ fieldBgColor }) => fieldBgColor && css`
        background: ${fieldBgColor};
    `};

    ${({ fieldColor }) => css`
        color: ${fieldColor ? fieldColor : "white"};
    `};

    ${({ fieldRightBorder }) => fieldRightBorder && css`
        border-right: .15vw solid white;
    `};

    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 8px;
    svg{
        width: 3.2vmin;
        height: 3.2vmin
    }

    @media screen and (min-width: 800px){
        font-size: 2vmin;
    }
`;