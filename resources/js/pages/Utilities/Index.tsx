import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { GiMexico } from "react-icons/gi";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { Head, Link } from '@inertiajs/react';
// Breadcrumbs para la navegación (migas de pan)
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Utilidades', href: '/utilities' },
];

// Componente principal que muestra la lista de homologaciones
export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Utilities" />
            {/* <div className="flex flex-col gap-4 p-4">
                <h1>TODO</h1>
                <Link href="/utilities/places">
                    <Button className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700">
                        Ir a utilitites/places
                    </Button>
                </Link>
            </div> */}
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Primer recuadro: va a Places */}

                    <Link
                        href="/utilities/places" // O route('utilities.places.index')
                        className="relative flex aspect-video transform items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg transition duration-200 hover:scale-105 hover:shadow-xl dark:border-sidebar-border"
                    >
                        {/* Icono grande */}
                        <div className="flex flex-col items-center gap-2">
                            <GiMexico className="h-12 w-12"> </GiMexico>
                            {/* Texto */}
                            <span className="text-lg font-bold">Plazas</span>
                        </div>
                    </Link>
                    <Link
                        href="/utilities/teams" // O route('utilities.places.index')
                        className="relative flex aspect-video transform items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 bg-linear-to-r from-black to-black text-white shadow-lg transition duration-200 hover:scale-105 hover:shadow-xl dark:border-sidebar-border"
                    >
                        {/* Icono grande */}
                        <div className="flex flex-col items-center gap-2">
                            <FaUsers className="h-12 w-12"> </FaUsers>
                            {/* Texto */}
                            <span className="text-lg font-bold">Equipos de trabajo</span>
                        </div>
                    </Link>
                       <Link
                        href="/utilities/calendars" // O route('utilities.places.index')
                        className="relative flex aspect-video transform items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 bg-linear-to-r from-black to-black text-white shadow-lg transition duration-200 hover:scale-105 hover:shadow-xl dark:border-sidebar-border"
                    >
                        {/* Icono grande */}
                        <div className="flex flex-col items-center gap-2">
                            <AiOutlineCalendar className="h-12 w-12"> </AiOutlineCalendar>
                            {/* Texto */}
                            <span className="text-lg font-bold">Calendarios</span>
                        </div>
                    </Link>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
