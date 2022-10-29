import '../styles/globals.css'
import { useState } from 'react'
import type { AppProps } from 'next/app'
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../types_db'
import { UserContextProvider } from '../utils/user-context'
import Layout from '@/components/Layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient<Database>())

  return (
    <>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <UserContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContextProvider>
      </SessionContextProvider>
    </>
  )
}
