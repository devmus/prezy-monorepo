// apps/web/hooks/useAuth.ts

import { useSession } from 'next-auth/react';
import { SessionUser } from '@prezy/auth'; // your shared type

export function useAuth() {
    const { data: session, status } = useSession();

    const user = session?.user as SessionUser | undefined;

    return {
        user,
        isLoggedIn: !!user,
        isLoading: status === 'loading',
        isAdmin: user?.role === 'admin',
        isShopkeeper: user?.role === 'shopkeeper',
    };
}
