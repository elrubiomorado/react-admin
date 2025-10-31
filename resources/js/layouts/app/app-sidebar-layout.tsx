import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import Migajerito from '/public/images/Megajerito.jpeg';

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
                <footer className="mt-auto bg-black py-3 text-white">
                    <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
                        <p className="mb-2 text-center md:mb-0 md:text-left">
                            Created by <strong>Ingenieros en desarrollo</strong>{' '}
                            Nataly, Edgar y Jesús.
                        </p>
                        <img
                            src={Migajerito}
                            alt="Logo migajeros"
                            className="h-10 rounded-md"
                        />
                    </div>
                </footer>
            </AppContent>
        </AppShell>
    );
}
