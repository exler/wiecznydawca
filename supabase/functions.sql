/**
* DONATION STATS
**/
DROP FUNCTION IF EXISTS public.get_donation_stats;
CREATE FUNCTION public.get_donation_stats(uid UUID)
RETURNS TABLE(kind donation_kind, total_volume BIGINT) 
LANGUAGE plpgsql
PARALLEL SAFE
AS $$
BEGIN
    RETURN QUERY
        SELECT dk.donation_kinds, COALESCE(SUM(d.volume), 0)
        FROM 
            (SELECT UNNEST(ENUM_RANGE(NULL::donation_kind)) AS donation_kinds) dk 
            LEFT JOIN donations d ON d.kind = dk.donation_kinds AND d.user_id = uid
        GROUP BY dk.donation_kinds;
END
$$;
