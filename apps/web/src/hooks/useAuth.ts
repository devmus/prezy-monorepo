// hooks/useAuth.ts
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher'; // must return parsed JSON
import { UserDTO } from '@prezy/types';

export function useAuth() {
    const {
        data: user,
        error,
        isLoading,
        mutate: refetch,
    } = useSWR<UserDTO>('/api/user/me', fetcher);

    return {
        user: user || null,
        error,
        isLoading,
        isLoggedIn: !!user,
        refetch, // call refetch() to manually re-fetch user
    };
}
