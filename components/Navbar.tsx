import { Session } from '@supabase/supabase-js'
import Link from 'next/link'
import { supabase } from '../utils/supabase'

export default function Navbar({ session }: { session: Session | null }) {
    return (
        <>
            {
                !session ? null : (
                    <div className="navbar bg-base-100" >
                        <div className="flex-1">
                            <Link href="/"><a className="btn btn-ghost normal-case text-xl">Everdonor</a></Link>
                        </div>
                        <div className="flex-none">
                            <ul className="menu menu-horizontal p-0">
                                <li><Link href="/add"><a className="btn btn-primary">Dodaj</a></Link></li>
                                <li><a>Dziennik</a></li>
                                <li><a>Odznaki</a></li>
                                <li><a>Ustawienia</a></li>
                                <li><button onClick={() => supabase.auth.signOut()}>Wyloguj się</button></li>
                            </ul>
                        </div>
                    </div>
                )
            }
        </>
    )
}
