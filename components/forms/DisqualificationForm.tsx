import { formatDate } from "@/utils/helpers";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Disqualification } from "types"

export default function DisqualificationForm({ disqualification_id }: { disqualification_id?: number }) {
    const [formState, setFormState] = useState<Disqualification>({} as Disqualification);
    const user = useUser();
    const router = useRouter();
    const supabaseClient = useSupabaseClient();

    useEffect(() => {
        if (disqualification_id) {
            const fetchData = async () => {
                const { data, error } = await supabaseClient.from('disqualifications').select().eq('id', disqualification_id).single();

                if (error)
                    throw new Error('Error fetching data');

                if (data)
                    setFormState(data);
            }

            fetchData().catch(console.error);
        }
    }, [supabaseClient, disqualification_id]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const { data, error } = await supabaseClient.from('disqualifications').upsert({
                id: disqualification_id,
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
                router.push('/krwiodawca/dziennik')
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
                    <input type="number" name="for_days" value={formState.for_days || ''} onChange={handleInputChange} className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Data dyskwalifikacji</span>
                    </label>
                    <input type="date" name="date" value={formatDate(formState.date) || ''} onChange={handleInputChange} className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Hemoglobina</span>
                    </label>
                    <input type="text" name="hemoglobin" value={formState.hemoglobin || ''} onChange={handleInputChange} className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Ciśnienie krwi skurczowe</span>
                    </label>
                    <input type="text" name="systolic_pressure" value={formState.systolic_pressure || ''} onChange={handleInputChange} className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Ciśnienie krwi rozkurczowe</span>
                    </label>
                    <input type="text" name="diastolic_pressure" value={formState.diastolic_pressure || ''} onChange={handleInputChange} className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Notatka</span>
                    </label>
                    <textarea
                        name="notes"
                        placeholder="Notes"
                        value={formState.notes || ''}
                        onChange={handleInputChange}
                        className="textarea textarea-bordered h-24" >
                    </textarea>
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">{!disqualification_id ? 'Dodaj' : 'Zmień'}</button>
                </div>
            </form>
        </div>
    )
}

