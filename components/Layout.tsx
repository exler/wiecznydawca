import Head from 'next/head';

import Navbar from './ui/Navbar';
import Footer from './ui/Footer';
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
            <main className="container mx-auto w-full">
                {children}
            </main>
            <Footer />
        </>
    );
}
