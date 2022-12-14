import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { Donation, DonationKind } from "types";
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { formatDate } from '@/utils/helpers';

export default function DonationForm({ donation_id }: { donation_id?: number }) {
    const [formState, setFormState] = useState<Donation>({ kind: DonationKind.BLOOD } as Donation);
    const user = useUser();
    const router = useRouter();
    const supabaseClient = useSupabaseClient();

    useEffect(() => {
        if (donation_id) {
            const fetchData = async () => {
                const { data, error } = await supabaseClient.from('donations').select().eq('id', donation_id).single();

                if (error)
                    throw new Error('Error fetching data');

                if (data)
                    setFormState(data);
            }

            fetchData().catch(console.error);
        }
    }, [supabaseClient, donation_id]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const { data, error } = await supabaseClient.from('donations').upsert({
                id: donation_id,
                user_id: user!.id,
                kind: formState.kind,
                date: formState.date,
                hemoglobin: formState.hemoglobin,
                systolic_pressure: formState.systolic_pressure,
                diastolic_pressure: formState.diastolic_pressure,
                volume: formState.volume,
                notes: formState.notes,
            });

            if (error) {
                throw error;
            }
            else {
                router.push('/krwiodawca/dziennik')
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
            console.error(error);
        }
    }

    return (
        <div className="card w-full mx-auto max-w-sm bg-base-200">
            <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Rodzaj donacji</span>
                    </label>
                    <select name="kind" value={formState.kind} onChange={handleInputChange} className="select select-bordered w-full max-w-xs">
                        <option value={DonationKind.BLOOD}>Krew pe??na</option>
                        <option value={DonationKind.PLASMA}>Osocze</option>
                        <option value={DonationKind.PLATELETS}>P??ytki krwi</option>
                        <option value={DonationKind.RED_CELLS}>Krwinki czerwone</option>
                        <option value={DonationKind.WHITE_CELLS}>Krwinki bia??e</option>
                        <option value={DonationKind.PLASMA_PLATELETS}>Osocze i p??ytki</option>
                    </select>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Data donacji</span>
                    </label>
                    <input type="date" value={formatDate(formState.date) || ''} onChange={handleInputChange} name="date" required className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Obj??to????</span>
                    </label>
                    <input type="text" value={formState.volume || ''} onChange={handleInputChange} name="volume" required className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Hemoglobina</span>
                    </label>
                    <input type="number" step="0.1" value={formState.hemoglobin || ''} onChange={handleInputChange} name="hemoglobin" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Ci??nienie krwi skurczowe</span>
                    </label>
                    <input type="number" value={formState.systolic_pressure || ''} onChange={handleInputChange} name="systolic_pressure" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Ci??nienie krwi rozkurczowe</span>
                    </label>
                    <input type="number" value={formState.diastolic_pressure || ''} onChange={handleInputChange} name="diastolic_pressure" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Notatka</span>
                    </label>
                    <textarea value={formState.notes || ''} onChange={handleInputChange} name="notes" className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">{!donation_id ? 'Dodaj' : 'Zmie??'}</button>
                </div>
            </form>
        </div>
    )
}

