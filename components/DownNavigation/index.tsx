import React, { FC } from "react";
import LoginButton from "../LoginButton";
import Dropdown from "../Dropdown";
import { UserData } from "../../hooks/useAuth";
import useClientData from "../../hooks/useClientData";

import {
    Wrapper,
    Selects,
    User,
    Avatar,
    Nickname,
    Balance
} from "./style";

const UpNavigation: FC<UpNavigationProps> = ({ data }) => {
    const [ clientData ] = useClientData(data);

    return(
        <Wrapper>
            <Selects>
                {
                    data && clientData ? (
                        <User>
                            <Avatar url={data.avatar}/>
                            <Nickname>
                                {data.name}
                            </Nickname>
                            <Dropdown data={data}/>
                            <Balance>
                                {clientData.credits} $
                            </Balance>
                        </User>
                    ) : <LoginButton/>
                }
            </Selects>
        </Wrapper>
    )
};

type UpNavigationProps = {
    data: UserData
}

export default UpNavigation;