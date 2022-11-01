import { getDonationStats, getLatestDonationDate } from "@/utils/api";
import { calculateBloodDonated, formatAmount, getDonationKindName } from "@/utils/helpers";
import { useUser } from "@/utils/user-context";
import { useEffect, useState } from "react";

export default function PulpitPage() {
    const [donationStats, setDonationStats] = useState<{ kind: string, total_volume: number }[] | null>(null);
    const [totalDonated, setTotalDonated] = useState<number>(0);
    const [latestDonationDate, setLatestDonationDate] = useState<string | null>(null);
    const { user } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            const stats = await getDonationStats(user!.id);
            const latestDonation = await getLatestDonationDate(user!.id);

            if (stats && latestDonation) {
                setDonationStats(stats);
                setTotalDonated(stats.reduce((acc, curr) => acc + calculateBloodDonated(curr.total_volume, curr.kind), 0));
                setLatestDonationDate(latestDonation);
            } else {
                throw new Error('Error fetching data');
            }
        }

        fetchData().catch(console.error);
    }, [user])



    return (
        <>
            <div className="stats shadow flex flex-row justify-center w-2/5 mx-auto">
                <div className="stat">
                    <div className="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <div className="stat-title">Oddano</div>
                    <div className="stat-value text-primary">{formatAmount(totalDonated)} krwi</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                    <div className="stat-title">Ostatnia donacja</div>
                    <div className="stat-value text-secondary">{latestDonationDate}</div>
                </div>
            </div>

            <div className="mt-4 flex flex-row align-center justify-center">
                {donationStats?.map((stats, index) => (
                    <div key={index} className="card w-1/5 bg-primary text-primary-content mb-2 mr-2">
                        <div className="card-body">
                            <h6 className="card-title">{getDonationKindName(stats.kind)}</h6>
                            <h2>{formatAmount(stats.total_volume)}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

