import { getDisqualifications, getDonations } from "@/utils/api";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Disqualification, Donation } from "types";
import { useUser } from "@/utils/user-context";
import DonationForm from "@/components/forms/DonationForm";
import DisqualificationForm from "@/components/forms/DisqualificationForm";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { formatAmount, formatDate, getDonationKindName } from "@/utils/helpers";

export default function DziennikPage() {
    const [chosenToUpdate, setChosenToUpdate] = useState<Donation | Disqualification | null>(null);
    const [events, setEvents] = useState<(Donation | Disqualification)[]>([]);
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();

    useEffect(() => {
        const fetchData = async () => {
            const donations = await getDonations(user!.id);
            const disqualifications = await getDisqualifications(user!.id);

            if (donations && disqualifications) {
                let ets = [...donations, ...disqualifications];
                ets.sort((a, b) => (a.created_at < b.created_at) ? 1 : ((b.created_at < a.created_at) ? -1 : 0));
                setEvents(ets);
            } else {
                throw new Error('Error fetching data');
            }
        }

        if (user && !events.length)
            fetchData().catch(console.error);
    }, [events, user])

    const renderForm = () => {
        if ('kind' in chosenToUpdate!) {
            return <DonationForm donation_id={chosenToUpdate!.id} />
        }
        else {
            return <DisqualificationForm disqualification_id={chosenToUpdate!.id} />
        }
    }

    const deleteEvent = async (event: Donation | Disqualification) => {
        const table_name = 'kind' in event ? 'donations' : 'disqualifications';
        const { error } = await supabaseClient.from(table_name).delete().eq('id', event.id);

        if (error)
            console.error(error);

        setEvents(events.filter(e => e.id !== event.id));
    }

    return (
        <>
            <Head>
                <title>Dziennik</title>
            </Head>

            <div className="flex flex-col">
                {!chosenToUpdate ? (
                    <>
                        {events && (
                            events.map((event, index) => (
                                <div key={index} className="w-full lg:w-2/4 mx-auto mb-4 card card-side bg-base-100 shadow-xl">
                                    <figure>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 16 16" className="ml-4 fill-primary">
                                            {'kind' in event ? (
                                                <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z" />
                                            ) : (
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                                            )}

                                        </svg>
                                    </figure>
                                    <div className="card-body">
                                        <div className="card-actions justify-between">
                                            <div>
                                                <p>{formatDate(event.date)}</p>
                                                <h2 className="card-title">
                                                    {"kind" in event ? (
                                                        <>{getDonationKindName(event.kind)}</>
                                                    ) : (
                                                        <>Dyskwalifikacja</>
                                                    )}
                                                </h2>
                                                <p>
                                                    {"kind" in event ? (
                                                        <span className="text-error">{formatAmount(event.volume!)}</span>
                                                    ) : (
                                                        <>Okres: {event.for_days} dni</>
                                                    )}
                                                </p>
                                                {event.hemoglobin && (
                                                    <p className="text-sm">Hemoglobina: {event.hemoglobin.toFixed(1)}</p>
                                                )}
                                            </div>
                                            <p></p>
                                            <div>
                                                <button className="btn btn-success mr-2" onClick={() => setChosenToUpdate(event)}>Zmień</button>
                                                <button className="btn btn-error" onClick={() => deleteEvent(event)}>Usuń</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </>
                ) : (
                    <>
                        <button onClick={() => setChosenToUpdate(null)} className="btn btn-success flex mx-auto mb-2">Wróć</button>
                        {renderForm()}
                    </>
                )}
            </div>
        </>
    )
}
