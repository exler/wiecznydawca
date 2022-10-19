import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import Auth from '../components/Auth'
import Index from '../components/Index'
import { Session } from '@supabase/supabase-js'

export default function IndexPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          setSession(session)
        }

        setIsLoading(false)
      }
    }

    getInitialSession()

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    ).data

    return () => {
      mounted = false

      subscription?.unsubscribe()
    }
  }, [])

  return (
    <div className="container flex">
      {!session ? (
        <Auth />
      ) : (
        <Index key={session.user.id} session={session} />
      )}
    </div>
  )
}
