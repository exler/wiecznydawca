
import { useState } from 'react'
import { supabase } from '../utils/supabase'

export default function Auth() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleLogin = async (email: string) => {
        try {
            setLoading(true)
            const { error } = await supabase.auth.signInWithOtp({ email })
            if (error) throw error
            alert('Check your email for the login link!')
        } catch (error) {
            if (error instanceof Error)
                alert(error.message)
            else
                alert(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="card w-full mx-auto max-w-sm bg-base-200">
            <form className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                        <input type="email" className="input input-bordered" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary" onClick={(e) => {
                        e.preventDefault()
                        handleLogin(email)
                    }} disabled={loading}>{loading ? 'Loading' : 'Send magic link'}</button>
                </div>
            </form>
        </div>
    )
}
