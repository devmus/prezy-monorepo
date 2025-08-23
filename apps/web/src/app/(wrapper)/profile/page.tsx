// apps/web/src/app/(wrapper)/profile/page.tsx

'use client';

import { useAuth } from '@/hooks/useAuth';
import { useLang } from '@/context/LangContext';
import { useState } from 'react';
import { LanguageSetting } from '@/types';
import { UserRole } from '@prezy/types';
import { mutate } from 'swr';

export default function ProfilePage() {
    const { user, isLoggedIn, isLoading } = useAuth();
    const { setLang } = useLang();
    // const [role, setRole] = useState<UserRole>('user');
    const [saving, setSaving] = useState(false);

    // set role when user is loaded
    // useEffect(() => {
    //     if (user?.role) {
    //         setRole(user.role);
    //     }
    // }, [user?.role]);

    const handleLanguageChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const languageSetting = e.target.value as LanguageSetting;
        setSaving(true);

        const res = await fetch('/api/user/language', {
            method: 'PATCH',
            body: JSON.stringify({ language: languageSetting }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            await mutate('/api/user/me'); // re-fetch user, Sidebar updates!
            setLang(languageSetting);
        }

        setSaving(false);
    };

    const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = e.target.value as UserRole;

        setSaving(true);

        const res = await fetch('/api/user/role', {
            method: 'PATCH',
            body: JSON.stringify({ role: newRole }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            await mutate('/api/user/me'); // re-fetch user, Sidebar updates!
        }

        setSaving(false);
    };

    if (isLoading) return <p>Loading...</p>;
    if (!isLoggedIn || !user) return <p>You must be logged in to view your profile.</p>;

    return (
        <section>
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
                <p>
                    <b>Preferred language:</b> {user.language ?? 'unknown'}
                </p>
            </div>
            {user && (
                <>
                    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl space-y-4">
                        <h2 className="text-2xl font-semibold">Change preferred language</h2>
                        <div className="flex flex-col gap-2">
                            <span className="mb-1 font-small">
                                Language setting for the website.
                            </span>
                            <select
                                value={user.language}
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
                    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl space-y-4">
                        <h2 className="text-2xl font-semibold">Change role</h2>
                        <div className="flex flex-col gap-2">
                            <span className="mb-1 font-small">
                                Selecting shopkeeper role will allow you to create and manage your
                                shop.
                            </span>
                            <select
                                value={user.role}
                                onChange={handleRoleChange}
                                className="border rounded px-3 py-2"
                            >
                                <option value="user">User</option>
                                <option value="shopkeeper">Shopkeeper</option>
                            </select>
                            {saving && <p className="text-sm text-gray-500 mt-1">Saving...</p>}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}
