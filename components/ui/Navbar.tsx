import Link from 'next/link'
import Image from 'next/image';
import { useUser } from '@/utils/user-context';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import logo from '@/public/logo.png';

export default function Navbar() {
    const router = useRouter();
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1 ml-2">
                <Link href={!user ? '/' : '/krwiodawca'}>
                    <Image src={logo} alt="Wieczny Dawca" height={48} />
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    {
                        !user ? (
                            <>
                                <li><Link href="/zaloguj">Zaloguj się</Link></li>
                            </>
                        ) : (
                            <>
                                <li className="mr-2"><Link href="/krwiodawca/dodaj" className="btn btn-primary">Nowy wpis</Link></li>
                                <li className="mr-2"><Link href="/krwiodawca/dziennik">Dziennik</Link></li>
                                <li className="mr-2"><Link href="/krwiodawca/odznaki">Odznaki</Link></li>
                                <li className="mr-2"><Link href="/krwiodawca/ustawienia">Ustawienia</Link></li>
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
