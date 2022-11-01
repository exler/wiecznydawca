import { User, useSessionContext, useUser as useSupabaseUser } from '@supabase/auth-helpers-react';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { UserDetails } from 'types';

type UserContextType = {
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext();
    const user = useSupabaseUser();

    useEffect(() => {
        const getUserDetails = () => supabase.from('users').select('*').single();

        if (user && !isLoadingData && !userDetails) {
            setIsLoadingData(true);
            getUserDetails().then(({ data, error }) => {
                if (error) {
                    console.error(error);
                } else {
                    setUserDetails(data);
                }

                setIsLoadingData(false);
            });
        } else if (!user && !isLoadingUser && !isLoadingData) {
            setUserDetails(null);
        }
    }, [user, isLoadingUser, isLoadingData, userDetails, supabase]);

    const value = {
        user, userDetails, isLoading: isLoadingUser || isLoadingData,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error(`useUser must be used within a UserContextProvider.`);
    }
    return context;
};
