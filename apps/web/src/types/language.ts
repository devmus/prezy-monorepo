import addStore_en from '@/locales/en/addStore.json' assert { type: 'json' };
import sidebar_en from '@/locales/en/sidebar.json' assert { type: 'json' };
import auth_en from '@/locales/en/auth.json' assert { type: 'json' };
import common_en from '@/locales/en/common.json' assert { type: 'json' };

// This assumes all locales have same structure, so just use 'en'
export const translations_en = {
    addStore: addStore_en,
    sidebar: sidebar_en,
    auth: auth_en,
    common: common_en,
} as const;

export type TranslationsEn = typeof translations_en;
export type Namespace = keyof TranslationsEn; // "addStore" | "sidebar" | ...
export type FullTranslationKey = `${Namespace}.${string}`;
export type Lang = 'en' | 'sv' | 'th';

export type LangContextType = {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: (key: FullTranslationKey) => string;
};

export type LanguageOption = {
    code: 'en' | 'sv' | 'th';
    label: FullTranslationKey;
    flagSrc: string;
};
