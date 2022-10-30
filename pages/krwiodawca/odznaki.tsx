import { getDonationStats } from "@/utils/api";
import { useUserContext } from "@/utils/user-context";
import { calculateBloodDonated } from "@/utils/helpers";
import { useEffect, useState } from "react";

export default function OdznakiPage() {
    const [totalDonated, setTotalDonated] = useState<number>(0);
    const { user } = useUserContext();

    useEffect(() => {
        const fetchData = async () => {
            const stats = await getDonationStats(user!.id);

            if (stats) {
                setTotalDonated(stats.reduce((acc, curr) => acc + calculateBloodDonated(curr.total_volume, curr.kind), 0));
            } else {
                throw new Error('Error fetching data');
            }
        }

        fetchData().catch(console.error);
    }, [user])

    const getAmountLeft = (goal: number) => {
        if (goal <= totalDonated) {
            return 'Osiągnięto!'
        } else {
            return `Pozostało: ${goal - totalDonated}ml`
        }
    }

    return (
        <>
            <div>
                Zasłużony Honorowy Dawca Krwi - III stopnia - {getAmountLeft(6000)}
            </div>
            <div>
                Zasłużony Honorowy Dawca Krwi II stopnia - {getAmountLeft(12000)}
            </div>
            <div>
                Zasłużony Honorowy Dawca Krwi I stopnia - {getAmountLeft(18000)}
            </div>
            <div>
                Honorowy Dawca Krwi - Zasłużony dla Zdrowia Narodu - {getAmountLeft(20000)}
            </div>
        </>
    )
}
