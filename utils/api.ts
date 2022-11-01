import { formatDate } from "./helpers";
import { supabase } from "./supabase";

export const getDonations = async (user_id: string) => {
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

export const getDisqualifications = async (user_id: string) => {
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

export const getDonationStats = async (user_id: string) => {
    const { data, error } = await supabase.rpc('get_donation_stats', { uid: user_id })

    if (error) {
        console.error(error)
        return null
    }

    return data
}

export const getLatestDonationDate = async (user_id: string) => {
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
