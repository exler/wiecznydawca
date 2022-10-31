import { DonationKind } from "types"

/**
* Recalculate different donation kinds to blood (in ml).
* https://krwiodawcy.org/kalkulator-donacji/
*/
export const calculateBloodDonated = (volume: number, kind: string) => {
    if (volume == 0)
        return 0

    switch (kind) {
        case DonationKind.BLOOD:
            return volume
        case DonationKind.PLASMA:
            return ~~(volume / 3) // Get the whole number (faster than Math.floor)
        case DonationKind.PLATELETS:
            if (volume <= 500)
                return 500
            else
                return 1000
        case DonationKind.RED_CELLS:
            if (volume <= 300)
                return 500
            else
                return 1000
        case DonationKind.WHITE_CELLS:
            return 2000
        case DonationKind.PLASMA_PLATELETS:
            if (volume <= 800)
                return 650
            else
                return 1000
        default:
            console.warn("Unknown donation kind", kind)
            return volume
    }
}

export const formatDate = (date: string) => {
    const d = new Date(date)
    return `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`
}
