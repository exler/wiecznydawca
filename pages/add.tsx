import { Session } from "@supabase/supabase-js"
import { useState } from "react"
import DisqualificationForm from "../components/forms/DisqualificationForm"
import DonationForm from "../components/forms/DonationForm"

enum JournalKind {
    DONATION = 1,
    DISQUALIFICATION,
}

export default function AddPage({ session }: { session: Session }) {
    const [chosenJournalKind, setChosenJournalKind] = useState<JournalKind | null>(null)

    const renderForm = () => {
        if (chosenJournalKind == JournalKind.DONATION) {
            return <DonationForm session={session} />
        }
        else if (chosenJournalKind == JournalKind.DISQUALIFICATION) {
            return <DisqualificationForm session={session} />
        }

        return null
    }

    return (
        <>
            {
                !chosenJournalKind ? (
                    <div className="flex w-full mx-auto">
                        <div onClick={() => setChosenJournalKind(JournalKind.DONATION)} className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Donacja</h2>
                            </div>
                        </div>
                        <div onClick={() => setChosenJournalKind(JournalKind.DISQUALIFICATION)} className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Dyskwalifikacja</h2>
                            </div>
                        </div>


                    </div>
                ) : (
                    <>
                        <button onClick={() => setChosenJournalKind(null)} className="btn btn-secondary">Wróć</button>
                        {renderForm()}
                    </>
                )
            }
        </>
    )
}
