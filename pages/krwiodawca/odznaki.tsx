import { getDonationStats } from "@/utils/api";
import { calculateBloodDonated, formatAmount } from "@/utils/helpers";
import Image from "next/image";
import Head from "next/head";
import honorowy_1 from "@/public/odznaki/honorowy_I.png";
import honorowy_2 from "@/public/odznaki/honorowy_II.png";
import honorowy_3 from "@/public/odznaki/honorowy_III.png";
import zasluzony_zdrowia_narodu from "@/public/odznaki/zasluzony_zdrowia_narodu.png";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = withPageAuth({
    async getServerSideProps(context, supabase) {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        const stats = await getDonationStats(supabase, user!.id);

        if (!stats)
            throw new Error("Nie udało się pobrać danych");

        return {
            props: {
                totalDonated: stats.reduce((acc, curr) => acc + calculateBloodDonated(curr.total_volume, curr.kind), 0),
            }
        }
    }
})

interface Props {
    totalDonated: number;
}

export default function OdznakiPage({ totalDonated }: Props) {
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
                <title>Odznaki | Wieczny Dawca</title>
            </Head>

            <div className="flex flex-col lg:flex-row">
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
