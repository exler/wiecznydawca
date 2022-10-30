import { getDonationStats } from "@/utils/api";
import { useUserContext } from "@/utils/user-context";
import { useEffect, useState } from "react"

export default function PulpitPage() {
    const [donationStats, setDonationStats] = useState<{ kind: string, total_volume: number }[] | null>(null);
    const { user } = useUserContext();

    useEffect(() => {
        const fetchData = async () => {
            const stats = await getDonationStats(user!.id);

            if (stats) {
                setDonationStats(stats);
            } else {
                throw new Error('Error fetching data');
            }
        }

        fetchData().catch(console.error);
    }, [user])

    return (
        <div>
            {!donationStats ? <div>Loading...</div> : (
                <>
                    {donationStats.map((stats, index) => (
                        <div key={index}>Oddano {stats.total_volume}ml {stats.kind}</div>
                    ))
                    }
                </>
            )}
            Ostatnia donacja 17.08.2022
        </div>
    )
}
