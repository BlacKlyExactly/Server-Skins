import React, { FC } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import styled from "styled-components";
import { faHome, faDiceFive, faDizzy } from '@fortawesome/free-solid-svg-icons';
import useAuth, { UserData } from "../hooks/useAuth";

import Layout from "../components/Layout";
import UpNavigation, { UpNavItem } from "../components/UpNavigation";
import DownNavigation from "../components/DownNavigation";
import SkinsSlider from "../components/SkinsSlider";
import PageLoader from "../components/PageLoader";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-content: flex-start;
    position: relative;
    height: 100vh;
    background-position: center;

    @media screen and ( min-width: 800px ){
        height: 100%;
    }
`;

const selects: Array<UpNavItem> = [
  { name: "Strona Główna", path: "/", icon: faHome },
  { name: "FAQ", path: "https://how2kill.pl/f.a.q-sklepiku-ze-skinami/", icon: faDiceFive },
  { name: "Forum", path: "https://how2kill.pl/", icon: faDizzy }
];

const IndexPage: FC<IndexPageProps> = ({ data, isLoged }) => (
  <Layout>
      <PageLoader/>
      <Wrapper>
          <UpNavigation selects={selects}/>
          <DownNavigation data={data}/>
          <SkinsSlider data={data} isLoged={isLoged}/>
      </Wrapper>
  </Layout>
);

type IndexPageProps = {
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

export default IndexPage;