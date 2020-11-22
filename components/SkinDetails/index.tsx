import React, { forwardRef, useEffect, useRef, useState, MutableRefObject, ChangeEvent } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";

import {
    Slider,
    DetailsModal,
    DetailsModalBox,
    DetailsModalBoxClose,
    DetailsModalBoxData,
    DetailsModalBoxDataImage,
    DetailsModalBoxDataContent,
    DetailsModalBoxDataData,
    DetailsModalBoxDataContentName,
    DetailsModalBoxDataContentInfo,
    DetailsModalBoxDataContentButtons,
    DetailsModalBoxDataContentButton
} from "./style";

const SkinDetails = forwardRef(
    ( 
        props: DetailsProps,
        ref: MutableRefObject<HTMLDivElement>
    ) => {
        const isMobile: boolean = window.innerWidth >= 800 ? false : true;

        if(isMobile) return null;

        const { data, price, buyAction } = props;

        const [ timeline ] = useState(gsap.timeline({ paused: true, ease: "power4.inOut" }));

        const slider = useRef<HTMLDivElement>(null);
        const modal = useRef<HTMLDivElement>(null);
        const modalBox = useRef<HTMLDivElement>(null);
        const modalBoxData = useRef<HTMLDivElement>(null);

        const skinCard: HTMLDivElement = ref.current;

        const handleModalOpen = () => timeline.reversed(!timeline.reversed());

        const toggle = ( enter: boolean ) => {
            gsap.to(slider.current, { 
                    top: enter ? "104%" : "80%", 
                    opacity: enter ? 1 : 0, 
                    duration: 0.25, 
                    ease: "power4.inOut" 
            });
        }

        const getRarity = () => data.tags.find(tag => tag.category === "Rarity");
        const getState = () => data.tags.find(tag => tag.category === "Exterior");

        const handleModalClick = ( e: ChangeEvent<HTMLDivElement> ) => !modalBox.current.contains(e.target) && handleModalOpen();

        useEffect(() => {
            timeline.to(modal.current, { display: "flex", duration: 0 })
                    .from(modal.current, { opacity: 0, duration: 0.2 })
                    .from(modalBox.current, { opacity: 0, scale: 0.8, duration: 0.2 })
                    .from(modalBox.current.children, { opacity: 0, stagger: 0.1, y:-20, duration: 0.2 })
                    .from(modalBoxData.current.children, { opacity: 0, stagger: 0.1, x:-20, duration: 0.2 })
                    .reverse();
        }, [ timeline ])

        useEffect(() => {
            skinCard.addEventListener('mouseenter', () => toggle(true));
            skinCard.addEventListener('mouseleave', () => toggle(false));

            return () => {
                skinCard.removeEventListener('mouseenter', () => toggle(true));
                skinCard.removeEventListener('mouseleave', () => toggle(false));
            }
        }, [ ])

        return(
            <>
                <Slider ref={slider} onClick={handleModalOpen}>
                    Więcej informacji
                </Slider>
                <DetailsModal ref={modal} onClick={e => handleModalClick(e)}>
                    <DetailsModalBox ref={modalBox}>
                        <DetailsModalBoxClose onClick={handleModalOpen}>
                            <FontAwesomeIcon icon={faTimes} />
                        </DetailsModalBoxClose>
                        <DetailsModalBoxData>
                            <DetailsModalBoxDataImage>
                                <img src={`https://community.cloudflare.steamstatic.com/economy/image/${data.icon_url}`}/>
                            </DetailsModalBoxDataImage>
                            <DetailsModalBoxDataContent ref={modalBoxData}>
                                    <DetailsModalBoxDataData>
                                        <DetailsModalBoxDataContentName>
                                            {data.name}
                                        </DetailsModalBoxDataContentName>
                                        {
                                            getRarity() && (
                                                <DetailsModalBoxDataContentInfo>
                                                    Rzadkość: <span style={{ color: `#${getRarity().color}` }}>{getRarity().name}</span>
                                                </DetailsModalBoxDataContentInfo>
                                            )
                                        }
                                        {
                                            getState() && (
                                                <DetailsModalBoxDataContentInfo>
                                                    Stan: {getState().name}
                                                </DetailsModalBoxDataContentInfo>
                                            )
                                        }
                                    </DetailsModalBoxDataData>
                                    <DetailsModalBoxDataContentButtons>
                                        {
                                            data.actions && (
                                                <DetailsModalBoxDataContentButton
                                                    onClick={() => window.location = data.actions[0].link}
                                                >
                                                    Podgląd w grze
                                                </DetailsModalBoxDataContentButton>
                                            )
                                        }
                                        <DetailsModalBoxDataContentButton 
                                            isBuy
                                            onClick={buyAction}
                                        >
                                            Kup {price} $
                                        </DetailsModalBoxDataContentButton>
                                    </DetailsModalBoxDataContentButtons>
                            </DetailsModalBoxDataContent>
                        </DetailsModalBoxData>
                    </DetailsModalBox>
                </DetailsModal>
            </>
        )
    }
)

type DetailsProps = {
    price: number,
    data: any,
    buyAction: any
}

export default SkinDetails;