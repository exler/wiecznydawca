import Link from 'next/link'
import Image from 'next/image';
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
                <Link href={!user ? '/' : '/krwiodawca'}><a><Image src="/logo.png" alt="Wieczny Dawca" width={128} height={42} /></a></Link>
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
                                <li className="mr-2"><Link href="/krwiodawca/dodaj"><a className="btn btn-primary">Dodaj</a></Link></li>
                                <li className="mr-2"><Link href="/krwiodawca/dziennik"><a>Dziennik</a></Link></li>
                                <li className="mr-2"><Link href="/krwiodawca/odznaki"><a>Odznaki</a></Link></li>
                                <li className="mr-2"><Link href="/krwiodawca/ustawienia"><a>Ustawienia</a></Link></li>
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
