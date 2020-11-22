import React, { FC } from "react";
import styled, { keyframes } from "styled-components";

const loader = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    } 
`;

const Ring = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    div{
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 70%;
        height: 70%;
        margin: 8px;
        border: 8px solid #fff;
        border-radius: 50%;
        animation: ${loader} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;
    }

    &:nth-child(1){
        animation-delay: -0.45s;
    }

    &:nth-child(2){
        animation-delay: -0.3s;
    }

    &:nth-child(3){
        animation-delay: -0.15s;
    }
`;

const Loader: FC = () => (
    <Ring>
        <div/>
        <div/>
        <div/>
    </Ring>
)

export default Loader