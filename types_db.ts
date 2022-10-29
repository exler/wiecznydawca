export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[]

export interface Database {
    public: {
        Tables: {
            disqualifications: {
                Row: {
                    user_id: string
                    hemoglobin: number | null
                    systolic_pressure: number | null
                    diastolic_pressure: number | null
                    for_days: number
                    date: string
                    notes: string | null
                    created_at: string
                    id: number
                }
                Insert: {
                    user_id: string
                    hemoglobin?: number | null
                    systolic_pressure?: number | null
                    diastolic_pressure?: number | null
                    for_days: number
                    date: string
                    notes?: string | null
                    created_at?: string
                    id?: number
                }
                Update: {
                    user_id?: string
                    hemoglobin?: number | null
                    systolic_pressure?: number | null
                    diastolic_pressure?: number | null
                    for_days?: number
                    date?: string
                    notes?: string | null
                    created_at?: string
                    id?: number
                }
            }
            donations: {
                Row: {
                    user_id: string
                    id: number
                    hemoglobin: number | null
                    systolic_pressure: number | null
                    diastolic_pressure: number | null
                    volume: number | null
                    kind: Database["public"]["Enums"]["donation_kind"]
                    date: string
                    notes: string | null
                    created_at: string
                }
                Insert: {
                    user_id: string
                    id?: number
                    hemoglobin?: number | null
                    systolic_pressure?: number | null
                    diastolic_pressure?: number | null
                    volume?: number | null
                    kind: Database["public"]["Enums"]["donation_kind"]
                    date: string
                    notes?: string | null
                    created_at?: string
                }
                Update: {
                    user_id?: string
                    id?: number
                    hemoglobin?: number | null
                    systolic_pressure?: number | null
                    diastolic_pressure?: number | null
                    volume?: number | null
                    kind?: Database["public"]["Enums"]["donation_kind"]
                    date?: string
                    notes?: string | null
                    created_at?: string
                }
            }
            users: {
                Row: {
                    id: string
                    full_name: string | null
                }
                Insert: {
                    id: string
                    full_name?: string | null
                }
                Update: {
                    id?: string
                    full_name?: string | null
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            get_donation_stats: {
                Args: { uid: string }
                Returns: Record<string, number>
            }
        }
        Enums: {
            donation_kind:
            | "blood"
            | "plasma"
            | "platelets"
            | "red_cells"
            | "white_cells"
            | "plasma_platelets"
        }
    }
}
