'use client';

import AuthButton from '@/components/AuthButton';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
    const { user, isLoggedIn, isLoading } = useAuth();

    return (
        <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
                {isLoggedIn ? (
                    <>
                        <h1 className="text-3xl font-bold mb-6">You are signed in.</h1>
                        <p className="text-muted-foreground mb-8">
                            Log out by clicking the button.
                        </p>
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold mb-6">Sign up or log in here!</h1>
                        <p className="text-muted-foreground mb-8">
                            Create an account to get started.
                        </p>
                    </>
                )}
                <AuthButton />
            </div>
        </div>
    );
}
