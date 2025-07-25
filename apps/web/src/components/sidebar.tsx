'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { NavigationItems } from '@/types';
import {
    Home,
    User,
    Mail,
    Gift,
    Store,
    //  Settings,
    Menu,
    ArrowLeftFromLine,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLang } from '@/context/LangContext';

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { t } = useLang();

    // Set initial collapsed state based on screen size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsCollapsed(window.innerWidth < 768); // 768px is typical mobile breakpoint
        };

        // Set initial state
        checkScreenSize();

        // Add event listener for window resize
        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const navigationItems: NavigationItems[] = [
        { icon: Gift, label: t('sidebar.services'), href: '/services' },
        { icon: Store, label: t('sidebar.stores'), href: '/stores' },
    ];

    const secondaryItems: NavigationItems[] = [
        { icon: Home, label: t('sidebar.home'), href: '/home' },
        { icon: User, label: t('sidebar.about'), href: '/about' },
        { icon: Mail, label: t('sidebar.contact'), href: '/contact' },
    ];

    const tertiaryItems: NavigationItems[] = [
        { icon: User, label: t('sidebar.login'), href: '/login' },
        // { icon: Settings, label: 'Settings', href: '/settings' },
    ];

    return (
        <div
            className={`bg-card border-r flex flex-col h-screen transition-all duration-300 ${
                isCollapsed ? 'w-16' : 'w-64'
            }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b  ">
                {!isCollapsed && (
                    <Link href="/">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-sm">P</span>
                            </div>
                            <span className="font-semibold text-lg">Prezy</span>
                        </div>
                    </Link>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="h-8 w-8"
                >
                    {isCollapsed ? (
                        <Menu className="h-4 w-4" />
                    ) : (
                        <ArrowLeftFromLine className="h-4 w-4" />
                    )}
                </Button>
            </div>

            <div className="flex flex-col ">
                <div>
                    {/* Navigation */}
                    <div
                        className={`flex flex-col justify-center ${isCollapsed ? 'p-4 items-center space-y-2' : 'p-4 space-y-2'}`}
                    >
                        {navigationItems.map((item) => (
                            <Link href={item.href} key={item.label}>
                                <Button
                                    variant="ghost"
                                    className={`w-full justify-start ${isCollapsed ? 'flex justify-center items-center px-2' : 'px-2'}`}
                                >
                                    <item.icon
                                        className={`${isCollapsed ? 'h-4 w-4 ' : 'h-4 w-4 mr-3'}`}
                                    />
                                    {!isCollapsed && item.label}
                                </Button>
                            </Link>
                        ))}
                    </div>

                    <Separator className="" />

                    {/* Secondary Navigation */}
                    <div
                        className={`flex flex-col justify-center ${isCollapsed ? 'p-4 items-center space-y-2' : 'p-4 space-y-2'}`}
                    >
                        {secondaryItems.map((item) => (
                            <Link href={item.href} key={item.label}>
                                <Button
                                    variant="ghost"
                                    className={`w-full justify-start ${isCollapsed ? 'flex justify-center items-center px-2' : 'px-2'}`}
                                >
                                    <item.icon
                                        className={`${isCollapsed ? 'h-4 w-4 ' : 'h-4 w-4 mr-3'}`}
                                    />
                                    {!isCollapsed && item.label}
                                </Button>
                            </Link>
                        ))}
                    </div>

                    <Separator className="" />

                    {/* Tertiary Navigation */}
                    <div
                        className={`flex flex-col justify-center ${isCollapsed ? 'p-4 items-center space-y-2' : 'p-4 space-y-2'}`}
                    >
                        {tertiaryItems.map((item) => (
                            <Link href={item.href} key={item.label}>
                                <Button
                                    variant="ghost"
                                    className={`w-full justify-start ${isCollapsed ? 'flex justify-center items-center px-2' : 'px-2'}`}
                                >
                                    <item.icon
                                        className={`${isCollapsed ? 'h-4 w-4 ' : 'h-4 w-4 mr-3'}`}
                                    />
                                    {!isCollapsed && item.label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-2">
                    {/* <p>Language:</p> */}
                    <LanguageSwitcher isCollapsed={isCollapsed} />
                </div>
            </div>

            {/* User Profile
            {!isCollapsed && (
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-primary-foreground text-sm font-medium">U</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">User Name</p>
                            <p className="text-xs text-muted-foreground truncate">
                                user@example.com
                            </p>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
}
