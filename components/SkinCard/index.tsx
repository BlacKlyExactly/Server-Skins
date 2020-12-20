import React, { FC, useEffect, useState, useRef } from "react";
import axios, { AxiosResponse } from "axios";
import SkinDetails from "../SkinDetails";
import Loader from "../Loader";
import useBuy from "../../hooks/useBuy";

import {
    Wrapper,
    ImageBox,
    Skin,
    ItemState,
    ItemStatTrak,
    PriceBox,
    Price
} from "./style";

const getState = ( tags: Array<Tag> ): Tag | undefined => tags.find(( tag: Tag ) => tag.category === "Exterior");

const transformState = ( tags: Array<Tag> ): string => {
    const state: Tag = getState(tags);

    if(!state) return;

    let skinState: string = state.name.replace('-', " ");
    let splitedState: Array<string> = skinState.split(" ");

    const firstLetter: string = splitedState[0][0];
    const secondLetter: string | undefined = splitedState[1] ? splitedState[1][0] : "";

    return firstLetter+secondLetter;
}

const isStatTrak = ( tags: Array<Tag> ): boolean => {
    return tags.find(( tag: Tag ) => tag.name === "StatTrak™") !== undefined ? true : false;
}

const SkinCard: FC<SkinCardProps> = ({ data, index, userData }) => {
    const [ price, setPrice ] = useState(undefined);

    const card = useRef<HTMLDivElement>(null);
    const buyAction = useBuy(userData, price, data.name, data.classid); 

    useEffect(() => {
        const fetchPrice = async() => {
            try {
                if(!data.market_hash_name) return;
                    const response: AxiosResponse = await axios.get(`api/prices/${unescape(data.market_hash_name)}&${index}`);
                    const median: number | undefined = response.data ? response.data.median : undefined;
                    const medianPrice: number | undefined = median ? median * 100 : undefined;
                    
		    medianPrice && setPrice(medianPrice.toFixed());
            } catch (error) {
                console.log(error);
            }
        }

        fetchPrice(); 
    }, [ ])
    
    return(
        <Wrapper 
            ref={card} 
            isLoaded={price ? false : true}
        >               
            <ItemState onClick={buyAction}>
                <span>{transformState(data.tags)}</span>
                {isStatTrak(data.tags) && <ItemStatTrak>ST</ItemStatTrak>}
            </ItemState>
            <ImageBox>
                <Skin src={`https://community.cloudflare.steamstatic.com/economy/image/${data.icon_url}`} />
            </ImageBox>
            <PriceBox>
                <Price>{price}$</Price>
            </PriceBox>
            <SkinDetails 
                ref={card} 
                data={data} 
                price={price}
                buyAction={buyAction}
            />            
        </Wrapper>
    )
};

type SkinCardProps = {
    data: any,
    index: number,
    userData: any
}

type Tag = {
    internal_name: string,
    name: string, 
    category: string,
    category_name: string
}


export default SkinCard;
