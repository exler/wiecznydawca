import { Database } from "types_db";

export interface UserDetails {
    id: string;
    full_name?: string;
}

export enum DonationKind {
    BLOOD = "blood",
    PLASMA = "plasma",
    PLATELETS = "platelets",
    RED_CELLS = "red_cells",
    WHITE_CELLS = "white_cells",
    PLASMA_PLATELETS = "plasma_platelets"
}

export interface Donation {
    id: number
    user_id: string
    hemoglobin?: number | null
    systolic_pressure?: number | null
    diastolic_pressure?: number | null
    volume?: number | null
    kind: Database["public"]["Enums"]["donation_kind"]
    date: string
    notes?: string | null
    created_at?: string
}

export interface Disqualification {
    id: number;
    user_id: string;
    hemoglobin?: number | null;
    systolic_pressure?: number | null;
    diastolic_pressure?: number | null;
    for_days: number;
    date: string;
    notes?: string | null;
    created_at?: string;
}
