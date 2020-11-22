import React, { FC } from "react";
import { useRouter, NextRouter } from "next/router";
import styled from "styled-components";

const Button = styled.button`
    width: 109px;
    height: 66px;
    background: url('/assets/button.png');
    border: none;
`;

const LoginButton: FC = () => {
    const router: NextRouter = useRouter();

    const handleButtonClick = () => router.push('/api/authenticate');

    return <Button onClick={handleButtonClick}/>
};

export default LoginButton;
