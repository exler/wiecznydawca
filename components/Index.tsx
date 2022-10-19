import { Session } from '@supabase/supabase-js'
import { supabase } from '../utils/supabase'

export default function Index({ session }: { session: Session }) {
    async function getCurrentUser() {
        const {
            data: { session },
            error,
        } = await supabase.auth.getSession()

        if (error) {
            throw error
        }

        if (!session?.user) {
            throw new Error('User not logged in')
        }

        return session.user
    }

    return (
        <div>
            Oddano 8,1L krwi
            Ostatnia donacja 17.08.2022
        </div>
    )
}
