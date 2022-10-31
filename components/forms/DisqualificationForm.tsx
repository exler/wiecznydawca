import { useUserContext } from "@/utils/user-context"
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router"
import { useState } from "react"
import { Disqualification } from "types"

export default function DisqualificationForm() {
    const [formState, setFormState] = useState<Disqualification>({} as Disqualification);
    const { user } = useUserContext();
    const router = useRouter();
    const supabaseClient = useSupabaseClient();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const { data, error } = await supabaseClient.from('disqualifications').insert({
                user_id: user!.id,
                for_days: formState.for_days,
                date: formState.date,
                hemoglobin: formState.hemoglobin,
                systolic_pressure: formState.systolic_pressure,
                diastolic_pressure: formState.diastolic_pressure,
                notes: formState.notes,
            })

            if (error) {
                throw error;
            }
            else {
                console.log(data);
                router.push('/')
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
            console.error(error);
        }
    }

    return (
        <div className="card w-full mx-auto max-w-sm bg-base-200">
            <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Liczba dni</span>
                    </label>
                    <input type="number" name="for_days" onChange={handleInputChange} className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Data dyskwalifikacji</span>
                    </label>
                    <input type="date" name="date" onChange={handleInputChange} className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Hemoglobina</span>
                    </label>
                    <input type="text" name="hemoglobin" onChange={handleInputChange} className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Ciśnienie krwi skurczowe</span>
                    </label>
                    <input type="text" name="systolic_pressure" onChange={handleInputChange} className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Ciśnienie krwi rozkurczowe</span>
                    </label>
                    <input type="text" name="diastolic_pressure" onChange={handleInputChange} className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Notatka</span>
                    </label>
                    <textarea name="notes" placeholder="Notes" onChange={handleInputChange} className="textarea textarea-bordered h-24" ></textarea>
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">Dodaj</button>
                </div>
            </form>
        </div>
    )
}

