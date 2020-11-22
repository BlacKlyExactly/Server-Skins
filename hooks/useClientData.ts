import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { UserData } from "./useAuth";

const useClientData = ( data: UserData ) => {
    const [ clientData, setClientData ] = useState(undefined); 

    const fetchClientData = async () => {
        return new Promise( async ( resolve, reject ) => {
            try {
                if(!data) resolve(0);
                
                const userData: AxiosResponse = await axios.get(`api/users/${data.steamId}`);
                setClientData(userData.data);

                resolve(userData.data);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        })
    }

    useEffect(() => {
        fetchClientData();
    }, [  ])

    const setCredits = async ( value: number ) => {
        return new Promise( async ( resolve, reject ) => {
            try {
                await axios.get(`api/users/setcredits/${data.steamId}&${value}`);
                
                resolve(0);
            } catch (error) {
                reject(error);
            }
        })
    }

    const setTradeUrl = async ( link: string ) => {
        return new Promise( async ( resolve, reject ) => {
            try {
                const tradeData: string[] = link.replace("https://steamcommunity.com/tradeoffer/new/", "").split("&token=");
                const token: string = tradeData[1];
                const partner: string = tradeData[0].split("=")[1];

                await axios.get(`/api/users/settradeurl/${data.steamId}&${partner}&${token}`);

                resolve(0);
            } catch (error) {
                reject(error);
            }
        })
    }

    return [ clientData, setCredits, setTradeUrl, fetchClientData ];
}

export default useClientData;