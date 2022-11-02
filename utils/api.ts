import { formatDate } from "./helpers";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types_db";

export const getUserDetails = async (supabase: SupabaseClient<Database>) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .single();

    if (error) {
        console.error(error);
        return null
    }

    return data
}

export const getDonations = async (supabase: SupabaseClient<Database>, user_id: string) => {
    const { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('user_id', user_id)
        .order('date', { ascending: false })

    if (error) {
        console.error(error)
        return null
    }

    return data
}

export const getDisqualifications = async (supabase: SupabaseClient<Database>, user_id: string) => {
    const { data, error } = await supabase
        .from('disqualifications')
        .select('*')
        .eq('user_id', user_id)
        .order('date', { ascending: false })

    if (error) {
        console.error(error)
        return null
    }

    return data
}

export const getDonationStats = async (supabase: SupabaseClient<Database>, user_id: string) => {
    const { data, error } = await supabase.rpc('get_donation_stats', { uid: user_id })

    if (error) {
        console.error(error)
        return null
    }

    return data
}

export const getLatestDonationDate = async (supabase: SupabaseClient<Database>, user_id: string) => {
    const { data, error } = await supabase
        .from('donations')
        .select('date')
        .eq('user_id', user_id)
        .order('date', { ascending: false })
        .limit(1)
        .single()

    if (error) {
        console.error(error)
        return null
    }

    return formatDate(data.date)
}
