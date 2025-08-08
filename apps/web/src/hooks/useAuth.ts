// hooks/useAuth.ts
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher'; // must return parsed JSON
import { UserData } from '@/types';

export function useAuth() {
    const {
        data: user,
        error,
        isLoading,
        mutate: refetch,
    } = useSWR<UserData>('/api/user/me', fetcher);

    return {
        user: user || null,
        error,
        isLoading,
        isLoggedIn: !!user,
        refetch, // call refetch() to manually re-fetch user
    };
}
