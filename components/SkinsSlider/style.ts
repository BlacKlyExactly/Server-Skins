import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    
    @media screen and (min-width: 800px){
        padding-top: 20vh;
        padding-bottom: 20vh;
        overflow: hidden;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-content: center;
        justify-items: center;
        gap: 0;
    }

    @media screen and (min-width: 1200px){
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
`;