import React, { FC, ReactNode } from "react";
import Head from "next/head";

import Global from "./globals";

const siteTitle: string = "How2kill | Skiny";
export const siteDescription: string = "Wymieniaj skiny za granie na serwerach sieci How2kill. Wystarczy, że grasz, to takie proste!";

const Layout: FC<LayoutProps> = ({ children, title = siteTitle, description = siteDescription }) => {
    return(
        <>  
            <Head>
                <title>{title}</title>
                <meta
                    name="description"
                    content={description}
                />
                <link 
                    rel="stylesheet" 
                    href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" 
                />
                <link 
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700;800&display=swap" 
                    rel="stylesheet"
                />
            </Head>
            <Global/>
            {children}
        </>
    )
};

type LayoutProps = {
    children: ReactNode,
    title?: string,
    description?: string
};

export default Layout;