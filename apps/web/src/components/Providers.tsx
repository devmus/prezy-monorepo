'use client';

import { SessionProvider } from 'next-auth/react';
import { LangProvider } from '@/context/LangContext';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <LangProvider>
                {children}
                <Toaster />
            </LangProvider>
        </SessionProvider>
    );
}
