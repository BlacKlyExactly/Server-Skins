import styled, { css } from "styled-components";

export const Slider = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 12%;
    font-weight: 500;
    background: #7668cb;
    top: 70%;
    border-bottom-left-radius: 0.3vw;
    border-bottom-right-radius: 0.3vw;
    color: white;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
    z-index: 14;
    opacity: 0;
    font-size: 10px;
    cursor: pointer;

    @media screen and ( min-width: 800px ){
        font-size: 1.5vmin;
    }
`;

export const DetailsModal = styled.div`
    position: fixed;
    display: none;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
`;

export const DetailsModalBox = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 70%;
    height: 60%;
    background: #1d1d22;
    padding: 2vw;
    border-radius: 4px;
`;

export const DetailsModalBoxClose = styled.button`
    position: absolute;
    top: 4%;
    left: 2%;
    background: transparent;
    border: none;
    cursor: pointer;

    svg{
        width: 30px;
        height: 30px;
        color: white;
    }
`;

export const DetailsModalBoxData = styled.div`
    position: relative;
    width: 65%;
    height: 80%;
    display: flex;
    margin-left: 10%;
`;

export const DetailsModalBoxDataImage = styled.div`
    width: 60%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
        width: 65%;
        height: 45%;
        object-fit: cover;
    }
`;

export const DetailsModalBoxDataContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 40%;
    margin-left: 6%;
`;

export const DetailsModalBoxDataData = styled.div`
    position: relative;
`;

export const DetailsModalBoxDataContentName = styled.p`
    color: white;
    font-size: 30px;
    font-weight: bold;
    margin: 0;
    padding-bottom: 10%;
`;

export const DetailsModalBoxDataContentInfo = styled.p`
    color: white;
    font-size: 20px;
    font-weight: 800;
    margin: 0;
    margin-top: 1.5%;
`;

export const DetailsModalBoxDataContentButtons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    position: relative;
`;

export const DetailsModalBoxDataContentButton = styled.button`
    width: 100%;
    height: 25%;
    background: white;
    color: black;
    font-family: "Montserrat";
    font-weight: 800;
    border: none;
    margin: 2.5% 0;
    font-size: 100%;
    cursor: pointer;

    ${({ isBuy }) => isBuy && css`
        color: white;
        background: #17CC0A;
    `}
`;
