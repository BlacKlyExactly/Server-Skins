import React, { FC, useRef, useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { UserData } from "../../hooks/useAuth";

import {
    Wrapper,
} from "./style";

import SkinCard from "../SkinCard";

const SkinsSlider: FC<SkinsSliderProps> = ({ data, isLoged }) => {
    const [ skins, setSkins ] = useState(undefined);

    const slider = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchInventory = async() => {
            try {
                const response: AxiosResponse = await axios.get(`/api/inventory`);
                setSkins(Object.values(response.data.rgDescriptions).filter((item: any) => item.tradable === 1));
            } catch (error) {
                console.log(error);
            }
        }

        fetchInventory();
    }, [  ])

    return(
        <Wrapper ref={slider}>
            {
                skins && skins.map(( item: number, index: number ) => (
                    <SkinCard 
                        key={index} 
                        data={item} 
                        index={index}
                        userData={data}
                    />
                ))
            }
        </Wrapper>
    )
}

type SkinsSliderProps = {
    data: UserData,
    isLoged: boolean,
}

export default SkinsSlider;