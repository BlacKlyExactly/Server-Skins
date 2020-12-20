import React, { useEffect, useRef, FC } from 'react';
import styled, { keyframes } from "styled-components";
import { Gold } from "../utils/colors";
import gsap from "gsap";

const Wrapper = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 200;
    overflow: hidden;
    background: black;
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
    position: relative;
    border: 1vw solid #383838;
    border-top: 1vw solid ${Gold};
    width: 5vw;
    height: 5vw;
    border-radius: 50%;
    z-index: 160;
    animation: ${spin} 0.6s linear infinite;
`;

const Loader: FC = () => {
    const wrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const load = () => {
            const tl = gsap.timeline({ delay: 0.5 });
            const loader: ChildNode = wrapper.current.childNodes[0];
            const blur: HTMLDivElement = wrapper.current;
            
            tl.to(loader, { duration: 0.1, y: +10, opacity: 0, "display": "none" })
              .to(blur, { duration: 0.1, y: +10, opacity: 0, "z-index": -1, "display": "none" })
              .then(() => document.body.style.overflow = 'visible');
        }

        document.readyState === "complete" || !window ? load() : window.addEventListener('load', load);

        return () =>  {
            load();
            window.removeEventListener('load', load);
        }

    }, [])

    return(
        <Wrapper ref={wrapper}>
            <Spinner />
        </Wrapper>
    )
}

export default Loader;