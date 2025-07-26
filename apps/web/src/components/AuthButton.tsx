'use client';

import { useAuth } from '@/hooks/useAuth';
import { signIn, signOut } from 'next-auth/react';

export default function AuthButton() {
    const { user, isLoggedIn, isLoading } = useAuth();

    const handleLogin = () => {
        const lang = localStorage.getItem('lang') || 'en';
        document.cookie = `preferred_lang=${lang}; path=/`;
        signIn('google');
    };

    if (isLoading) return <p>Loading...</p>;

    if (isLoggedIn && user) {
        return (
            <div className="flex flex-col gap-4">
                <p>
                    Signed in as {user?.email} ({user?.role})
                </p>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => signOut()}
                >
                    Sign out
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleLogin}>
                Sign in with Google
            </button>
        </div>
    );
}
