import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { faHome, faDiceFive, faDizzy } from '@fortawesome/free-solid-svg-icons';
import axios, { AxiosResponse } from "axios";

import Layout from "../components/Layout";
import HistoryCard from "../components/HistoryCard";
import UpNavigation, { UpNavItem } from "../components/UpNavigation";
import DownNavigation from "../components/DownNavigation";
import PageLoader from "../components/PageLoader";
import useAuth, { UserData } from "../hooks/useAuth";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    padding: 20vh 0;
`;

const selects: Array<UpNavItem> = [
    { name: "Strona Główna", path: "/", icon: faHome },
    { name: "FAQ", path: "https://how2kill.pl/f.a.q-sklepiku-ze-skinami/", icon: faDiceFive },
    { name: "Forum", path: "https://how2kill.pl/", icon: faDizzy }
  ];

const History: FC<HistoryPageProps> = ({ data, isLoged }) => {
    const [ trades, setTrades ] = useState(undefined)

    useEffect(() => {
        const fetchTrades = async () => {
            try {
                const userTrades: AxiosResponse = await axios.get(`/api/users/trades/${data.steamId}`);
                setTrades(userTrades.data);
                console.log(userTrades.data);
            } catch (error) {
                console.log(error);
            }
        }

        isLoged && fetchTrades();
    }, [ ]);

    return(
        <Layout>
            <Wrapper>
                <PageLoader/>
                <UpNavigation selects={selects}/>
                <DownNavigation data={data}/>
                {
                    trades && trades.map(( trade: any ) => (
                        <HistoryCard trade={trade}/>
                    ))
                }
            </Wrapper>
        </Layout>
    );
}

type HistoryPageProps = {
    data: UserData,
    isLoged: boolean
};

export const getServerSideProps: GetServerSideProps = async ( ctx: GetServerSidePropsContext ) => {
    const [ token, isLoged, data ] = useAuth(ctx);
  
    return {
      props: {
        data,
        isLoged
      }
    }
  }  

export default History;