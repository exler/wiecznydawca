import { User, useSessionContext, useUser as useSupabaseUser } from '@supabase/auth-helpers-react';
import { createContext, useContext, useEffect, useState } from 'react';
import { UserDetails } from 'types';

type UserContextType = {
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);


export interface Props {
    [propName: string]: any;
}

export const UserContextProvider = (props: Props) => {
    const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext();
    const user = useSupabaseUser();
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

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

    return <UserContext.Provider value={value} {...props} />
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error(`useUser must be used within a MyUserContextProvider.`);
    }
    return context;
};
