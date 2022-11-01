import { getDonationStats } from "@/utils/api";
import { useUserContext } from "@/utils/user-context";
import { calculateBloodDonated, formatAmount } from "@/utils/helpers";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import honorowy_1 from "@/public/odznaki/honorowy_I.png";
import honorowy_2 from "@/public/odznaki/honorowy_II.png";
import honorowy_3 from "@/public/odznaki/honorowy_III.png";
import zasluzony_zdrowia_narodu from "@/public/odznaki/zasluzony_zdrowia_narodu.png";


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
            return `Pozostało: ${formatAmount(goal - totalDonated)}`
        }
    }

    return (
        <>
            <Head>
                <title>Odznaki</title>
            </Head>

            <div className="flex flex-row">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <Image src={honorowy_1} alt="" height={128} />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Zasłużony Honorowy Dawca Krwi</h2>
                        <p>I stopnia</p>
                        <p>{getAmountLeft(6000)}</p>
                        <progress className="progress progress-secondary w-56" value={totalDonated} max="6000"></progress>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <Image src={honorowy_2} alt="" height={128} />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Zasłużony Honorowy Dawca Krwi</h2>
                        <p>II stopnia</p>
                        <p>{getAmountLeft(12000)}</p>
                        <progress className="progress progress-secondary w-56" value={totalDonated} max="12000"></progress>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <Image src={honorowy_3} alt="" height={128} />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Zasłużony Honorowy Dawca Krwi</h2>
                        <p>III stopnia</p>
                        <p>{getAmountLeft(18000)}</p>
                        <progress className="progress progress-secondary w-56" value={totalDonated} max="18000"></progress>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <Image src={zasluzony_zdrowia_narodu} alt="" height={128} />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Honorowy Dawca Krwi</h2>
                        <p>Zasłużony dla Zdrowia Narodu</p>
                        <p>{getAmountLeft(20000)}</p>
                        <progress className="progress progress-secondary w-56" value={totalDonated} max="20000"></progress>
                    </div>
                </div>
            </div>
        </>
    )
}
