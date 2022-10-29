import { useRouter } from 'next/router'
import { useState } from "react";
import { supabase } from "../../utils/supabase"
import { Donation, DonationKind } from "types";
import { useUserContext } from "@/utils/user-context";

export default function DonationForm() {
    const [formState, setFormState] = useState<Donation>({ kind: DonationKind.BLOOD } as Donation);
    const { user } = useUserContext();
    const router = useRouter();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const { data, error } = await supabase.from('donations').insert({
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
                console.log(data);
                router.push('/')
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
                    <select name="kind" onChange={handleInputChange} className="select select-bordered w-full max-w-xs">
                        <option value={DonationKind.BLOOD}>Krew pełna</option>
                        <option value={DonationKind.PLASMA}>Osocze</option>
                        <option value={DonationKind.PLATELETS}>Płytki krwi</option>
                        <option value={DonationKind.RED_CELLS}>Krwinki czerwone</option>
                        <option value={DonationKind.WHITE_CELLS}>Krwinki białe</option>
                        <option value={DonationKind.PLASMA_PLATELETS}>Osocze i płytki</option>
                    </select>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Data donacji</span>
                    </label>
                    <input type="date" onChange={handleInputChange} name="date" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Objętość</span>
                    </label>
                    <input type="text" onChange={handleInputChange} name="volume" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Hemoglobina</span>
                    </label>
                    <input type="text" onChange={handleInputChange} name="hemoglobin" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Ciśnienie krwi skurczowe</span>
                    </label>
                    <input type="text" onChange={handleInputChange} name="systolic_pressure" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Ciśnienie krwi rozkurczowe</span>
                    </label>
                    <input type="text" onChange={handleInputChange} name="diastolic_pressure" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Notatka</span>
                    </label>
                    <textarea onChange={handleInputChange} name="notes" className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">Dodaj</button>
                </div>
            </form>
        </div>
    )
}

