import { withMiddlewareAuth } from "@supabase/auth-helpers-nextjs";

export const middleware = withMiddlewareAuth({ redirectTo: "/zaloguj" });

export const config = {
    matcher: ['/krwiodawca/:path*']
}
