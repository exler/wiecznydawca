import FormButton from "@/components/ui/FormButton";
import Input from "@/components/ui/Input";
import { useUser } from "@/utils/user-context";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FormEvent, useEffect, useState } from "react";
import { renderTailwindMessage } from "@/utils/helpers";

export default function UstawieniaPage() {
    const userContext = useUser();
    const supabaseClient = useSupabaseClient();

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [message, setMessage] = useState<{ type: string; content: string } | null>(null);

    useEffect(() => {
        if (userContext.user)
            setEmail(userContext.user.email || '');

        if (userContext.userDetails)
            setFullName(userContext.userDetails.full_name || '');
    }, [userContext.user, userContext.userDetails])


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setMessage(null);

        if (email !== userContext.user?.email) {
            const { error } = await supabaseClient.auth.updateUser({ email });
            if (error)
                setMessage({ type: 'error', content: error.message });
        }

        if (fullName !== userContext.userDetails?.full_name) {
            const { error } = await supabaseClient.from('users').update({ full_name: fullName }).eq('id', userContext.user?.id);
            if (error)
                setMessage({ type: 'error', content: error.message });
        }

        if (!message)
            setMessage({ type: 'success', content: 'Dane zaktualizowane!' });

        setLoading(false);
    }

    return (
        <><div className="mx-auto w-1/2 mb-4">
            {message && renderTailwindMessage(message.type, message.content)}
        </div>
            <div className="card w-full mx-auto max-w-sm bg-base-200">
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                            <Input type="email" className="input input-bordered" placeholder="Email" value={email} onChange={setEmail} required />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Imię i nazwisko</span>
                            <Input type="text" className="input input-bordered" placeholder="Imię i nazwisko" value={fullName} onChange={setFullName} required />
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <FormButton
                            type="submit"
                            className="btn btn-primary"
                            loading={loading}
                            disabled={!email.length}>
                            {loading ? 'Aktualizacja danych...' : 'Zaktualizuj dane'}
                        </FormButton>
                    </div>
                </form>
            </div>
        </>
    )
}
