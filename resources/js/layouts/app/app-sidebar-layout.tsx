import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import AppLogo from '/public/images/mega-logo.png';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
                <footer className="mt-auto bg-slate-900 py-3 text-white">
                    <div className="container mx-auto flex flex-col items-center justify-between px-7 md:flex-row">
                        <p className="mb-2 text-center md:mb-0 md:text-left">
                            © 2025 Mega —{' '}
                            <strong>Ingenieros en desarrollo</strong> Nataly,
                            Edgar y Jesús.
                        </p>
                        <img src={AppLogo} alt="mega" className="h-7 w-7" />
                    </div>
                </footer>
            </AppContent>
        </AppShell>
    );
}
