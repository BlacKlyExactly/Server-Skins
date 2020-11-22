import React, { FC } from "react";
import Link from "next/link";
import { FontAwesomeIconProps, FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    Wrapper,
    Selects,
    Select
} from "./style";

const UpNavigation: FC<UpNavigationProps> = ({ selects }) => {
    return(
        <Wrapper>
            <Selects>
                {selects && selects.map(({ name, icon, path }: UpNavItem) => (
                    <Link href={path || "/"} key={name}>
                        <Select>
                            <FontAwesomeIcon icon={icon}/>
                            <span>{name}</span>
                        </Select>
                    </Link>
                ))}
            </Selects>
        </Wrapper>
    )
};

type UpNavigationProps = {
    selects?: Array<UpNavItem>
}

export interface UpNavItem {
    name: string,
    icon: FontAwesomeIconProps['icon'],
    path?: string
}

export default UpNavigation;