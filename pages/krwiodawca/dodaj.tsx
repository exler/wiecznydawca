import { useState } from "react"
import DisqualificationForm from "../../components/forms/DisqualificationForm"
import DonationForm from "../../components/forms/DonationForm"

enum JournalKind {
    DONATION = 1,
    DISQUALIFICATION,
}

export default function AddPage() {
    const [chosenJournalKind, setChosenJournalKind] = useState<JournalKind | null>(null)

    const renderForm = () => {
        if (chosenJournalKind == JournalKind.DONATION) {
            return <DonationForm />
        }
        else if (chosenJournalKind == JournalKind.DISQUALIFICATION) {
            return <DisqualificationForm />
        }

        return null
    }

    return (
        <>
            {
                !chosenJournalKind ? (
                    <div className="flex w-full mx-auto justify-center">
                        <div onClick={() => setChosenJournalKind(JournalKind.DONATION)} className="card w-96 bg-base-100 shadow-xl mr-4 cursor-pointer">
                            <figure className="px-10 pt-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 16 16" className="fill-primary">
                                    <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z" />
                                </svg>
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Donacja</h2>
                            </div>
                        </div>
                        <div onClick={() => setChosenJournalKind(JournalKind.DISQUALIFICATION)} className="card w-96 bg-base-100 shadow-xl cursor-pointer">
                            <figure className="px-10 pt-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 16 16" className="fill-accent">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                                </svg>
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Dyskwalifikacja</h2>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <button onClick={() => setChosenJournalKind(null)} className="btn btn-success flex mx-auto mb-2">Wróć</button>
                        {renderForm()}
                    </>
                )
            }
        </>
    )
}
