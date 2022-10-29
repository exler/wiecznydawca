import Link from 'next/link'
import { useUserContext } from '@/utils/user-context';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

export default function Navbar() {
    const router = useRouter();
    const supabaseClient = useSupabaseClient();
    const { user } = useUserContext();

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href={!user ? '/' : '/krwiodawca'}><a className="btn btn-ghost normal-case text-xl">Everdonor</a></Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    {
                        !user ? (
                            <>
                                <li><Link href="/zaloguj"><a>Zaloguj się</a></Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link href="/krwiodawca/dodaj"><a className="btn btn-primary">Dodaj</a></Link></li>
                                <li><Link href="/krwiodawca/dziennik"><a>Dziennik</a></Link></li>
                                <li><Link href="/krwiodawca/odznaki"><a>Odznaki</a></Link></li>
                                <li><Link href="/krwiodawca/ustawienia"><a>Ustawienia</a></Link></li>
                                <li><button onClick={async () => {
                                    await supabaseClient.auth.signOut();
                                    router.push("/zaloguj");
                                }}>Wyloguj się</button></li>
                            </>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}
