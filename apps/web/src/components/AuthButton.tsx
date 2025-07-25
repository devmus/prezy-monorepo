'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButton() {
    const { data: session, status } = useSession();

    if (status === 'loading') return <p>Loading...</p>;

    if (session) {
        return (
            <div className="flex items-center gap-4">
                <p>
                    Signed in as {session.user?.email} ({session.user?.role})
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
        <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => signIn('google')}
        >
            Sign in with Google
        </button>
    );
}
