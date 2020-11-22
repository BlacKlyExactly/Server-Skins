import styled from "styled-components";
import { Gold, Dark } from "../../utils/colors";

export const Wrapper = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 90%;
    z-index: 100;

    @media screen and (min-width: 800px){
        width: 45%;
        height: 6.2vw;
    }
`;

export const Selects = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 80px;
    background: ${Gold};
    border-top-right-radius: 50vw;
    border-bottom-right-radius: 50vw;
    box-shadow: 
        0 0 20px ${Dark}78,
        inset 0 0 10px rgba(0, 0, 0, 0.2);
    font-weight: 700;

    &::before{
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        width: 90%;
        height: 80px;
        background: ${Gold};
        border-top-right-radius: 50vw;
        border-bottom-right-radius: 50vw;
        z-index: -1;
        box-shadow: 
            0 0 20px ${Gold}99,
            inset 0 0 10px rgba(0, 0, 0, 0.3);
    }

    @media screen and (min-width: 1200px){
        justify-content: flex-start;
        height: 6.2vw;
    }
`;

export const Select = styled.li`
    display: flex;
    font-size: 30px;
    color: white;
    text-shadow: 0 0 20px white;
    cursor: pointer;

    svg{
        margin: 0 20px;
        width: 32px;
        height: 32px;
        filter: drop-shadow(0 0 10px white);
    }
    
    span{
        display: none;

        @media screen and (min-width: 1200px){
            display: inherit;
        }
    }

    @media screen and (min-width: 800px){
        font-size: 1.2vw;
        margin: 0 1vw;
    }
`;