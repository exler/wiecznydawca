import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react"
import { useUser } from "@/utils/user-context";
import Input from "@/components/ui/Input";
import FormButton from "@/components/ui/FormButton";

export default function ZalogujPage() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState<{ type?: string; content?: string }>({
        type: '',
        content: '',
    });

    const router = useRouter();
    const userContext = useUser();
    const supabaseClient = useSupabaseClient();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setMessage({});

        const { error } = await supabaseClient.auth.signInWithOtp({ email });
        if (error) {
            setMessage({ type: 'error', content: error.message });
        } else {
            setMessage({ type: 'success', content: 'Sprawdź swoją skrzynkę pocztową.' });
        }

        setLoading(false);
    }

    useEffect(() => {
        if (userContext.user) {
            router.replace("/krwiodawca");
        }
    }, [userContext, router]);


    if (!userContext.user)
        return (
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
        )
    else
        return <></>
}
