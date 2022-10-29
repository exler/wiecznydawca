import { supabase } from "./supabase";

export const getDonations = async (user_id: string) => {
    const { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('user_id', user_id)
        .order('date', { ascending: false })

    if (error) {
        console.log(error)
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
        console.log(error)
        return null
    }

    return data
}
