import { getDisqualifications, getDonations } from "@/utils/api";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Disqualification, Donation } from "types";
import { useUserContext } from "@/utils/user-context";

export default function DziennikPage() {
    const [events, setEvents] = useState<(Donation | Disqualification)[]>([]);
    const { user } = useUserContext();

    useEffect(() => {
        const fetchData = async () => {
            const donations = await getDonations(user!.id);
            const disqualifications = await getDisqualifications(user!.id);

            if (donations && disqualifications) {
                let ets = [...donations, ...disqualifications];
                ets.sort((a, b) => (a.created_at > b.created_at) ? 1 : ((b.created_at > a.created_at) ? -1 : 0));
                setEvents(ets);
            } else {
                throw new Error('Error fetching data');
            }
        }

        fetchData().catch(console.error);
    }, [user])

    return (
        <>
            <Head>
                <title>Dziennik</title>
            </Head>

            <div className="container flex">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Dziennik</h2>
                    </div>
                </div>

                {events && (
                    events.map((event, index) => (
                        <div key={index} className="card w-96 bg-base-100 shadow-xl">
                            {"kind" in event ? (
                                <>
                                    Donacja {event.id}
                                </>
                            ) : (
                                <>
                                    Dyskwalifikacja {event.id}
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </>
    )
}
