import styled from "styled-components";
import { Gold, Dark } from "../../utils/colors";

export const Wrapper = styled.nav`
    position: fixed;
    top: calc(100% - 80px);
    right: 0;
    width: 90%;
    min-height: 80px;
    z-index: 100;

    @media screen and (min-width: 1200px){
        width: 35%;
        height: 6.2vw;
        top: calc(100% - 6.2vw);
        top: 0;
    }
`;

export const Selects = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    min-height: 80px;
    background: ${Gold};
    border-top-left-radius: 50vw;
    border-bottom-left-radius: 50vw;
    box-shadow: 
        0 0 20px ${Dark}78,
        inset 0 0 10px rgba(0, 0, 0, 0.2);
    font-weight: 700;

    &::before{
        content: "";
        position: absolute;
        right: 0;
        top: -40%;
        width: 90%;
        height: 100%;
        background: ${Gold};
        border-top-left-radius: 50vw;
        border-bottom-left-radius: 50vw;
        z-index: -1;
        box-shadow:
            0 0 20px ${Gold}99,
            inset 0 0 10px rgba(0, 0, 0, 0.2);
    }

    @media screen and (min-width: 1200px){
        height: 6.2vw;

        &::before{
            top: 40%;
        }
    }
`;

export const User = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
`;

interface AvatarProps {
    url: string
}

export const Avatar = styled.div<AvatarProps>`
    min-width: 50px;
    min-height: 50px;
    background: url(${({ url }) => url});
    background-size: cover;
    border-radius: 50vw;
    border: 3px solid white;
    box-shadow: 0 0 20px white;

    @media screen and (min-width: 800px){
        height: 4.531vw;
        width: 4.531vw;
        border: .3vw solid white
    }
`;

export const Nickname = styled.span`
    font-size: 15px;
    font-weight: 700;
    color: white;
    margin-left: 10px;
    text-shadow: 0 0 20px white;

    @media screen and (min-width: 800px){
        font-size: 2.5vmin;
    }
`;

export const Balance = styled.span`
    font-size: 15px;
    margin-left: 20px;
    padding-left: 20px;
    color: white;
    font-weight: 700;
    border-left: 2.5px solid white;
    text-shadow: 0 0 20px white;
    
    @media screen and (min-width: 800px){
        font-size: 3vmin;
    }
`;