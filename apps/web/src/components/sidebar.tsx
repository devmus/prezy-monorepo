'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { NavigationItems } from '@/types';
import {
    Home,
    Mail,
    Gift,
    Store,
    Menu,
    ArrowLeftFromLine,
    Info,
    CircleUserRound,
    LogIn,
    LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLang } from '@/context/LangContext';
import { useAuth } from '@/hooks/useAuth';

export default function Sidebar() {
    const { user } = useAuth();
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
        { icon: Info, label: t('sidebar.about'), href: '/about' },
        { icon: Mail, label: t('sidebar.contact'), href: '/contact' },
    ];

    const tertiaryItems: NavigationItems[] = user
        ? [
              { icon: CircleUserRound, label: t('sidebar.profile'), href: '/profile' },
              ...(user.role === 'shopkeeper'
                  ? [{ icon: Store, label: t('sidebar.myStore'), href: '/stores/manage' }]
                  : []),
              { icon: LogOut, label: t('sidebar.logout'), href: '/login' },
          ]
        : [{ icon: LogIn, label: t('sidebar.login'), href: '/login' }];

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

                {/* Langague switcher */}
                <div className="flex flex-col justify-center items-center gap-2">
                    <LanguageSwitcher isCollapsed={isCollapsed} />
                </div>
            </div>
        </div>
    );
}
