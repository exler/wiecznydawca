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

    const renderLinks = () => {
        if (!user) {
            return (
                <>
                    <li><Link href="/zaloguj">Zaloguj się</Link></li>
                </>
            )
        } else {
            return (
                <>
                    <li className="mr-2"><Link href="/krwiodawca/dodaj" className="lg:btn lg:btn-primary">Nowy wpis</Link></li>
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
    }

    return (
        <div className="navbar bg-base-100 flex flex-row-reverse lg:flex-row justify-between">
            <div className="lg:flex ml-2">
                <Link href={!user ? '/' : '/krwiodawca'}>
                    <Image src={logo} alt="Wieczny Dawca" height={48} />
                </Link>
            </div>
            <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box">
                    {renderLinks()}
                </ul>
            </div>
            <div className="hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {renderLinks()}
                </ul>
            </div>
        </div>
    )
}
