import AppLayout from '@/layouts/app-layout';
import CronometroCard from '@/pages/Cronometros/CronometroCard'; // Ajusta la ruta según tu estructura
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { BiGridAlt } from 'react-icons/bi';
import { MdFormatListBulleted } from 'react-icons/md';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

// Función para manejar la eliminación (si es necesaria)
const handleDeleteCronometro = (id: number) => {
    // Aquí puedes implementar la lógica de eliminación
    console.log('Eliminar cronómetro:', id);
    // Por ejemplo: router.delete(`/cronometros/${id}`);
};

export default function Dashboard({
    cronometrosActivos,
}: {
    cronometrosActivos: any[];
}) {
    const [vista, setVista] = useState<'lista' | 'grid'>('grid'); // Cambié por defecto a 'grid'

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inicio" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-md p-4">
                {/*** -------- Inicia el código de las cards -----------------*/}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-md border-l-4 border-blue-500 bg-white p-6 text-center shadow-md">
                        <div className="mb-2 text-3xl font-bold text-blue-600">
                            {cronometrosActivos.length}
                        </div>
                        <div className="text-gray-600">Alarmas Totales</div>
                    </div>

                    <div className="rounded-md border-l-4 border-[#7eb989] bg-white p-6 text-center shadow-md">
                        <div className="mb-2 text-3xl font-bold text-green-600">
                            {
                                cronometrosActivos.filter((cron) => {
                                    const start = new Date(
                                        cron.created_at,
                                    ).getTime();
                                    const now = Date.now();
                                    const elapsedSeconds = Math.floor(
                                        (now - start) / 1000,
                                    );
                                    return elapsedSeconds < 45; // Ajusta según tu lógica de estados
                                }).length
                            }
                        </div>
                        <div className="text-gray-600">Alarmas Activas</div>
                    </div>

                    <div className="rounded-md border-l-4 border-gray-500 bg-white p-6 text-center shadow-md">
                        <div className="mb-2 text-3xl font-bold text-gray-600">
                            {
                                cronometrosActivos.filter((cron) => {
                                    const start = new Date(
                                        cron.created_at,
                                    ).getTime();
                                    const now = Date.now();
                                    const elapsedSeconds = Math.floor(
                                        (now - start) / 1000,
                                    );
                                    return elapsedSeconds >= 45; // Ajusta según tu lógica de estados
                                }).length
                            }
                        </div>
                        <div className="text-gray-600">Alarmas Inactivas</div>
                    </div>
                </div>
                {/***termina el código de las cards */}

                {/***------inicia parte de la info rápida ---- */}

                <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-l font-semibold">Listado de Alarmas</h2>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setVista('grid')}
                            className={`rounded-md border px-3 py-2 ${
                                vista === 'grid'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-700'
                            }`}
                        >
                            <BiGridAlt />
                        </button>

                        <button
                            onClick={() => setVista('lista')}
                            className={`rounded-md border px-3 py-2 ${
                                vista === 'lista'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-700'
                            }`}
                        >
                            <MdFormatListBulleted />
                        </button>
                    </div>
                </div>

                {/* ------------------- Vista LISTA (Tabla) ----------------------- */}
                {vista === 'lista' && (
                    <div className="overflow-x-auto rounded-lg shadow">
                        <table className="w-full table-auto border-collapse">
                            <thead className="bg-gray-200 text-left">
                                <tr>
                                    <th className="p-2 font-semibold">
                                        TICKET
                                    </th>
                                    <th className="p-2 font-semibold">
                                        TÍTULO
                                    </th>
                                    <th className="p-2 font-semibold">
                                        USUARIO
                                    </th>
                                    <th className="p-2 font-semibold">
                                        TIEMPO
                                    </th>
                                    <th className="p-2 font-semibold">
                                        ESTADO
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {cronometrosActivos.map((cron) => {
                                    const start = new Date(
                                        cron.created_at,
                                    ).getTime();
                                    const now = Date.now();
                                    const elapsedSeconds = Math.floor(
                                        (now - start) / 1000,
                                    );

                                    const formatTime = (seconds: number) => {
                                        const h = Math.floor(seconds / 3600)
                                            .toString()
                                            .padStart(2, '0');
                                        const m = Math.floor(
                                            (seconds % 3600) / 60,
                                        )
                                            .toString()
                                            .padStart(2, '0');
                                        const s = Math.floor(seconds % 60)
                                            .toString()
                                            .padStart(2, '0');
                                        return `${h}:${m}:${s}`;
                                    };

                                    const getStatusInfo = (seconds: number) => {
                                        if (seconds < 30)
                                            return {
                                                text: 'En Progreso',
                                                color: 'bg-[#7eb989] text-white',
                                            };
                                        if (seconds < 45)
                                            return {
                                                text: 'Casi Listo',
                                                color: 'bg-[#f8e384] text-gray-800',
                                            };
                                        return {
                                            text: 'Necesita Escalar',
                                            color: 'bg-[#eb646d] text-white',
                                        };
                                    };

                                    const status =
                                        getStatusInfo(elapsedSeconds);

                                    return (
                                        <tr
                                            key={cron.id}
                                            className="border-b transition hover:bg-gray-100"
                                        >
                                            <td className="p-2">
                                                #{cron.ticket}
                                            </td>
                                            <td className="p-2">
                                                {cron.title}
                                            </td>
                                            <td className="p-2">
                                                {cron.user?.name || 'N/A'}
                                            </td>
                                            <td className="p-2 font-mono">
                                                {formatTime(elapsedSeconds)}
                                            </td>
                                            <td className="p-2">
                                                <span
                                                    className={`rounded-md px-3 py-1 text-sm font-semibold ${status.color}`}
                                                >
                                                    {status.text}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* ------------------- Vista GRID (Tarjetas de Cronómetros) ----------------------- */}
                {vista === 'grid' && (
                    <div className="flex flex-wrap gap-4">
                        {cronometrosActivos.map((cron) => (
                            <CronometroCard
                                key={cron.id}
                                cron={cron}
                                onDelete={handleDeleteCronometro}
                            />
                        ))}
                    </div>
                )}

                {/***Termina el código de la info rápida */}
            </div>
        </AppLayout>
    );
}
