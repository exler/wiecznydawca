import '../styles/globals.css'
import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../utils/supabase'

function MyApp({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        setSession(session)
      }
    }

    getInitialSession()

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  })

  return (
    <>
      <Navbar session={session} />
      <Component {...pageProps} session={session} />
    </>
  )
}

export default MyApp
