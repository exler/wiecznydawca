import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react"
import Input from "@/components/ui/Input";
import FormButton from "@/components/ui/FormButton";
import { renderTailwindMessage } from "@/utils/helpers";
import Head from "next/head";

export default function ZalogujPage() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState<{ type: string; content: string } | null>(null);

    const router = useRouter();
    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setMessage(null);

        const { error } = await supabaseClient.auth.signInWithOtp({ email });
        if (error) {
            setMessage({ type: 'error', content: error.message });
        } else {
            setMessage({ type: 'success', content: 'Sprawdź swoją skrzynkę pocztową.' });
        }

        setLoading(false);
    }

    useEffect(() => {
        if (user) {
            router.replace("/krwiodawca");
        }
    }, [user, router]);


    if (!user)
        return (
            <>
                <Head>
                    <title>Zaloguj się | Wieczny Dawca</title>
                </Head>
                <div className="mx-auto w-1/2 mb-4">
                    {message && renderTailwindMessage(message.type, message.content)}
                </div>
                <div className="card w-full mx-auto max-w-sm bg-base-200">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                                <Input type="email" className="input input-bordered" placeholder="Email" value={email} onChange={setEmail} required />
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <FormButton
                                type="submit"
                                className="btn btn-primary"
                                loading={loading}
                                disabled={!email.length}>
                                {loading ? 'Wysyłanie...' : 'Wyślij link do zalogowania'}
                            </FormButton>
                        </div>
                    </form>
                </div>
            </>
        )
    else
        return <></>
}
