'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import addStore_en from '@/locales/en/addStore.json';
import sidebar_en from '@/locales/en/sidebar.json';
import auth_en from '@/locales/en/auth.json';
import common_en from '@/locales/en/common.json';

import addStore_sv from '@/locales/sv/addStore.json';
import sidebar_sv from '@/locales/sv/sidebar.json';
import auth_sv from '@/locales/sv/auth.json';
import common_sv from '@/locales/sv/common.json';

import addStore_th from '@/locales/th/addStore.json';
import sidebar_th from '@/locales/th/sidebar.json';
import auth_th from '@/locales/th/auth.json';
import common_th from '@/locales/th/common.json';
import { FullTranslationKey, Lang, LangContextType, Namespace } from '@/types';
import { useAuth } from '@/hooks/useAuth';

const translations = {
    en: {
        addStore: addStore_en,
        sidebar: sidebar_en,
        auth: auth_en,
        common: common_en,
    },
    sv: {
        addStore: addStore_sv,
        sidebar: sidebar_sv,
        auth: auth_sv,
        common: common_sv,
    },
    th: {
        addStore: addStore_th,
        sidebar: sidebar_th,
        auth: auth_th,
        common: common_th,
    },
} as const;

const LangContext = createContext<LangContextType | undefined>(undefined);

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
    const [lang, setLangState] = useState<Lang>('en');
    const { user } = useAuth(); // ✅ use custom hook

    useEffect(() => {
        // First priority: local storage
        const stored = localStorage.getItem('lang') as Lang | null;

        if (user?.language) {
            // Logged in: prefer DB lang, override localStorage
            setLangState(user.language);
            localStorage.setItem('lang', user.language);
        } else if (stored) {
            // Not logged in: use stored localStorage lang
            setLangState(stored);
        }
    }, [user?.language]);

    const setLang = (lang: Lang) => {
        setLangState(lang);
        localStorage.setItem('lang', lang);
    };

    const t = (key: FullTranslationKey): string => {
        const [namespace, actualKey] = key.split('.') as [Namespace, string];
        const section = translations[lang][namespace];
        const value = (section as Record<string, string>)?.[actualKey];
        return value ?? key;
    };

    return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
};

export const useLang = (): LangContextType => {
    const context = useContext(LangContext);
    if (!context) throw new Error('useLang must be used inside LangProvider');
    return context;
};
