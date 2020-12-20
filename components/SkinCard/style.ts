import styled, { css } from 'styled-components';

import { Gold } from "../../utils/colors";

interface WrapperProps {
    active: boolean
}

export const Wrapper = styled.div<WrapperProps>`
    position: relative;
    min-width: 177px;
    height: 300px; 
    margin: 5px 20px 5px 20px;
    transition: transform 0.15s;
    flex-direction: column;

    &::after{
        content: "\f07a";
        color: white;
        font-size: 350%;
        font-family: "Font Awesome 5 Free";
        font-weight: 800;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.15s;
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        background: gray;
        opacity: 0;
    }

    ${({ active }) => active && css`
        transform: scale(0.8);
        opacity: 0.5;
    `}

    ${({ isLoaded }) => isLoaded && css`
       display: flex;
       align-items: center;
       justify-content: center;
       border: 0.1vw solid ${Gold}90;
    `}

    @media screen and (min-width: 800px){
        height: 40vmin;
        width: 30vmin;
    }

    @media screen and (min-width: 1200px){
        width: 15%;
        height: 20vmax;
        margin: 0;
        margin: 1.5vmin 0.5vmin;
    }

    &:hover{
        &::after{
            opacity: 0.5;
        }
    }
`;

export const ImageBox = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80%;
    background: #262525;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
    cursor: pointer;
`;

export const Skin = styled.img`
    width: 70%;
    object-fit: cover;
    cursor: pointer;    
`;

export const ItemState = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 75%;
    top: 5%;
    font-size: 25px;
    color: white;
    font-weight: 700;
    text-shadow: 0 0 20px white;
    z-index: 10;
    cursor: pointer;

    @media screen and (min-width: 800px){
        font-size: 200%;
    }
`;

export const ItemStatTrak = styled.div`
    color: #D02828;
    text-shadow: 0 0 20px #D02828;
    margin-left: 20px;
    padding-left: 15px;
    border-left: .2vw solid #D02828;
    height: 15%;
`;

export const PriceBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 20%;
    background: ${Gold};
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
    cursor: pointer;
`;

export const Price = styled.span`
    font-size: 21px;
    color: white;
    font-weight: 700;
    text-shadow: 0 0 20px white;

    @media screen and (min-width: 800px){
        font-size: 200%;
    }
`;