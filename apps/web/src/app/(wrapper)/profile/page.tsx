// apps/web/app/profile/page.tsx

'use client';

import { useAuth } from '@/hooks/useAuth';
import { useLang } from '@/context/LangContext';
import { useState } from 'react';
import { Lang } from '@/types';

export default function ProfilePage() {
    const { user, isLoggedIn, isLoading } = useAuth();
    const { lang, setLang } = useLang();
    const [saving, setSaving] = useState(false);

    const handleLanguageChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value as Lang;
        setSaving(true);

        const res = await fetch('/api/user/language', {
            method: 'PATCH',
            body: JSON.stringify({ language: newLang }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            setLang(newLang); // update context
        }

        setSaving(false);
    };

    if (isLoading) return <p>Loading...</p>;
    if (!isLoggedIn || !user) return <p>You must be logged in to view your profile.</p>;

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl space-y-4">
            <h1 className="text-2xl font-semibold">Your Account</h1>
            <p>
                <b>Name:</b> {user.name ?? 'N/A'}
            </p>
            <p>
                <b>Email:</b> {user.email ?? 'N/A'}
            </p>
            <p>
                <b>Role:</b> {user.role ?? 'unknown'}
            </p>

            <div>
                <label className="block mb-1 font-medium">Preferred Language</label>
                <select
                    value={lang}
                    onChange={handleLanguageChange}
                    className="border rounded px-3 py-2"
                >
                    <option value="en">English</option>
                    <option value="sv">Svenska</option>
                    <option value="th">ไทย</option>
                </select>
                {saving && <p className="text-sm text-gray-500 mt-1">Saving...</p>}
            </div>
        </div>
    );
}
