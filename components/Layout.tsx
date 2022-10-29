import Head from 'next/head';

import Navbar from './ui/Navbar';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <>
            <Head>
                <title>Wieczny Dawca</title>
                <meta name="robots" content="follow, index" />
            </Head>
            <Navbar />
            <main>{children}</main>
        </>
    );
}
