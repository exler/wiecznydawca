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
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main className="container mx-auto w-full">
                {children}
            </main>
            <Footer />
        </>
    );
}
