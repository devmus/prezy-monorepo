'use client';

import { useLang } from '@/context/LangContext';
import { LanguageOption } from '@/types';
import { Listbox } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const languageOptions: LanguageOption[] = [
    { code: 'en', label: 'common.english', flagSrc: '/images/flags/gb.webp' },
    { code: 'sv', label: 'common.swedish', flagSrc: '/images/flags/se.webp' },
    { code: 'th', label: 'common.thai', flagSrc: '/images/flags/th.webp' },
];

interface LanguageSwitcherProps {
    isCollapsed?: boolean;
}

export default function LanguageSwitcher({ isCollapsed = false }: LanguageSwitcherProps) {
    const { lang, setLang, t } = useLang();
    const [selected, setSelected] = useState(languageOptions[0]);

    useEffect(() => {
        const current = languageOptions.find((l) => l.code === lang);
        if (current) setSelected(current);
    }, [lang]);

    const handleChange = (option: LanguageOption) => {
        setSelected(option);
        setLang(option.code);
    };

    return (
        <div className={`${!isCollapsed ? 'w-40' : 'w-12'}`}>
            <Listbox value={selected} onChange={handleChange}>
                <div className="relative">
                    <Listbox.Button className="flex items-center w-full border rounded px-3 py-1 bg-background text-foreground justify-between">
                        <div className="flex items-center gap-2">
                            <div className="relative w-6 h-4">
                                <Image
                                    src={selected.flagSrc}
                                    alt=""
                                    fill
                                    sizes="24px"
                                    className="object-contain"
                                />
                            </div>
                            {!isCollapsed && <span>{t(selected.label)}</span>}
                        </div>
                        {!isCollapsed && <ChevronDown className="w-4 h-4 ml-2" />}
                    </Listbox.Button>

                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border rounded shadow-md max-h-60 overflow-auto">
                        {languageOptions.map((option) => (
                            <Listbox.Option
                                key={option.code}
                                value={option}
                                className={({ active }) =>
                                    `flex items-center gap-2 px-3 py-2 cursor-pointer ${
                                        active ? 'bg-gray-100' : ''
                                    }`
                                }
                            >
                                <div className="relative w-6 h-4">
                                    <Image
                                        src={option.flagSrc}
                                        alt=""
                                        fill
                                        sizes="24px"
                                        className="object-contain"
                                    />
                                </div>
                                {!isCollapsed && <span>{t(option.label)}</span>}
                                {selected.code === option.code && (
                                    <Check className="w-4 h-4 ml-auto text-primary" />
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
        </div>
    );
}
