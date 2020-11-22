import React, { FC, useState, useEffect, useRef, ChangeEvent, Fragment } from "react";
import gsap from "gsap";
import SteamID from "steamid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faExclamationCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import logout from "../../utils/logout";
import { UserData } from "../../hooks/useAuth";
import useClientData from "../../hooks/useClientData";
import { NextRouter, useRouter } from 'next/router'

import {
    DropButton,
    DropBox,
    DropBoxButtons,
    DropBoxButton,
    DropBoxTradeUrlBox,
    DropBoxTradeInput,
    DropBoxTradeInfo,
    DropBoxTradeState,
    DropBoxTradeLabel
} from "./style";

const isValidTradeUrl = ( clientData: any ): boolean => {
    if(!clientData) return false;
    if(!clientData.tradeUrl) return false;

    const steamUrl: string = 'https://steamcommunity.com/tradeoffer/new/';
    return !clientData.tradeUrl.includes("undefined") && clientData.tradeUrl.includes(steamUrl);
}

const profileUrl: string = 'https://steamcommunity.com/profiles/'

const Dropdown: FC<DropdownProps> = ({ data }) => {
    const [ timeline ] = useState(gsap.timeline({ ease: "expo.inOut", paused: true }));
    const [ clientData, setCredits, setTradeUrl, fetchClientData ] = useClientData(data);
    const [ value, setValue ] = useState("");

    const router: NextRouter = useRouter();

    const dropBox = useRef<HTMLDivElement>(null);
    const dropButton = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => timeline.reversed(!timeline.reversed());

    const handleInputValue = async ( e: ChangeEvent<HTMLInputElement> ) => {
        e.preventDefault();
        setValue(e.target.value);
        setTradeUrl(e.target.value);

        await fetchClientData();
    }

    useEffect(() => {
        const isMobile: boolean = window.innerWidth >= 1200 ? false : true;

        timeline.from(dropBox.current, { display: "none", duration: 0 })
            .from(dropBox.current, { opacity: 0, y: isMobile ? 20 : -20, duration: 0.15 })
            .from(dropBox.current.children, { opacity: 0, x: -10, duration: 0.15, stagger: 0.1 })
            .reverse();
        
        const handleClick = ( e ) => {
            !dropBox.current.contains(e.target) &&
            !dropButton.current.contains(e.target) && 
            !timeline.reversed() && toggleDropdown();
        }

        const fetchTradeUrl = async () => {
            const clientData = await fetchClientData();
            isValidTradeUrl(clientData) && setValue(clientData.tradeUrl);
        }

        fetchTradeUrl();

        document.addEventListener('click', handleClick);

        return () => document.removeEventListener('click', handleClick);
    }, [ ])

    return(
        <>
            <DropButton 
                onClick={toggleDropdown} 
                ref={dropButton}
            >
                <FontAwesomeIcon icon={faCaretDown} />
            </DropButton>
            <DropBox ref={dropBox}>
                <DropBoxTradeUrlBox>
                    <DropBoxTradeInfo>
                        <DropBoxTradeLabel htmlFor="tradeUrl">
                            <a href={`${profileUrl}${new SteamID(data.steamId).getSteamID64()}/tradeoffers/privacy`}>Twój trade url</a>
                        </DropBoxTradeLabel>
                        <DropBoxTradeState isValid={isValidTradeUrl(clientData)}>
                            <FontAwesomeIcon icon={isValidTradeUrl(clientData) ? faCheckCircle : faExclamationCircle}/>
                        </DropBoxTradeState>
                    </DropBoxTradeInfo>
                    <DropBoxTradeInput 
                        name="tradeUrl"
                        value={value}
                        onChange={e => handleInputValue(e)}
                    />
                </DropBoxTradeUrlBox>
                <DropBoxButtons>
                    <DropBoxButton 
                        onClick={() => {
                            logout().then(() => window.location.reload())
                        }}
                    >
                        Wyloguj
                    </DropBoxButton>
                    <DropBoxButton
                        onClick={() => {
                            router.push("/historia");
                        }}
                    >
                        Historia
                    </DropBoxButton>
                </DropBoxButtons>
            </DropBox>
        </>
    )
}

type DropdownProps = {
    data: UserData,
}

export default Dropdown;