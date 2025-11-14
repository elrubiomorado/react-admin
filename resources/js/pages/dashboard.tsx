import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { BiGridAlt } from 'react-icons/bi';
import { MdFormatListBulleted } from 'react-icons/md';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inicio',
        href: dashboard().url,
    },
];

const estadoColor = (estado: string) => {
    switch (estado) {
        case 'En espera':
            return 'bg-yellow-400 text-black';
        case 'En proceso':
            return 'bg-green-500 text-white';
        case 'Error':
            return 'bg-red-500 text-white';
        default:
            return 'bg-gray-300 text-black';
    }
};

export default function Dashboard({
    cronometrosActivos,
}: {
    cronometrosActivos: any[];
}) {
    const [vista, setVista] = useState<'lista' | 'grid'>('lista');

    const data = [
        {
            ticket: '23434',
            titulo: 'Prueba 1',
            usuario: 'Juan lerma',
            prioridad: 1,
            tipo: 'Energía',
            estado: 'En espera',
        },
        {
            ticket: '23434',
            titulo: 'Prueba 2',
            usuario: 'Juan lerma',
            prioridad: 2,
            tipo: 'CFE',
            estado: 'En proceso',
        },
        {
            ticket: '43453',
            titulo: 'Prueba 3',
            usuario: 'Juan lerma',
            prioridad: 3,
            tipo: 'Energía',
            estado: 'En espera',
        },
        {
            ticket: '67657',
            titulo: 'Prueba 4',
            usuario: 'Juan lerma',
            prioridad: 1,
            tipo: 'CFE',
            estado: 'En proceso',
        },
        {
            ticket: '89978',
            titulo: 'Prueba 5',
            usuario: 'Juan lerma',
            prioridad: 2,
            tipo: 'Energía',
            estado: 'En espera',
        },
        {
            ticket: '545546',
            titulo: 'Prueba 6',
            usuario: 'Juan lerma',
            prioridad: 3,
            tipo: 'CFE',
            estado: 'En proceso',
        },
        {
            ticket: '34534',
            titulo: 'Prueba 7',
            usuario: 'Juan lerma',
            prioridad: 1,
            tipo: 'Energía',
            estado: 'En espera',
        },
        {
            ticket: '5464',
            titulo: 'Prueba 8',
            usuario: 'Juan lerma',
            prioridad: 2,
            tipo: 'CFE',
            estado: 'En proceso',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inicio" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/*** -------- Inicia el código de las cards -----------------*/}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-xl border-l-4 border-blue-500 bg-white p-6 text-center shadow-md">
                        <div className="mb-2 text-3xl font-bold text-blue-600">
                            {cronometrosActivos.length}
                        </div>
                        <div className="text-gray-600">Alarmas Totales</div>
                    </div>

                    <div className="rounded-xl border-l-4 border-green-500 bg-white p-6 text-center shadow-md">
                        <div className="mb-2 text-3xl font-bold text-green-600">
                            2
                        </div>
                        <div className="text-gray-600">Alarmas Activas</div>
                    </div>

                    <div className="rounded-xl border-l-4 border-gray-500 bg-white p-6 text-center shadow-md">
                        <div className="mb-2 text-3xl font-bold text-gray-600">
                            2
                        </div>
                        <div className="text-gray-600">Alarmas Inactivas</div>
                    </div>
                </div>
                {/***termina el código de las cards */}

                {/***------inicia parte de la info rápida ---- */}

                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        Listado de Alarmas
                    </h2>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setVista('grid')}
                            className={`rounded-lg border px-3 py-2 ${
                                vista === 'grid'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700'
                            }`}
                        >
                            <BiGridAlt />
                        </button>

                        <button
                            onClick={() => setVista('lista')}
                            className={`rounded-lg border px-3 py-2 ${
                                vista === 'lista'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700'
                            }`}
                        >
                            <MdFormatListBulleted />
                        </button>
                    </div>
                </div>

                {/* ------------------- Vista LISTA ----------------------- */}
                {vista === 'lista' && (
                    <div className="overflow-x-auto rounded-lg shadow">
                        <table className="w-full table-auto border-collapse">
                            <thead className="bg-gray-200 text-left">
                                <tr>
                                    <th className="p-3 font-semibold">
                                        TICKET
                                    </th>
                                    <th className="p-3 font-semibold">
                                        TÍTULO
                                    </th>
                                    <th className="p-3 font-semibold">
                                        USUARIO
                                    </th>
                                    <th className="p-3 font-semibold">
                                        PRIORIDAD
                                    </th>
                                    <th className="p-3 font-semibold">TIPO</th>
                                    <th className="p-3 font-semibold">
                                        ESTADO
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((item, i) => (
                                    <tr
                                        key={i}
                                        className="border-b transition hover:bg-gray-100"
                                    >
                                        <td className="p-3">{item.ticket}</td>
                                        <td className="p-3">{item.titulo}</td>
                                        <td className="p-3">{item.usuario}</td>
                                        <td className="p-3">
                                            {item.prioridad}
                                        </td>
                                        <td className="p-3">{item.tipo}</td>
                                        <td className="p-3">
                                            <span
                                                className={`rounded-md px-3 py-1 text-sm font-semibold ${estadoColor(
                                                    item.estado,
                                                )}`}
                                            >
                                                {item.estado}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* ------------------- Vista GRID ----------------------- */}
                {vista === 'grid' && (
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {data.map((item, i) => (
                            <div
                                key={i}
                                className="rounded-lg border bg-white p-4 shadow transition hover:shadow-md"
                            >
                                <div className="text-lg font-bold">
                                    {item.titulo}
                                </div>
                                <div className="text-sm text-gray-600">
                                    # {item.ticket}
                                </div>
                                <div className="text-sm text-gray-600">
                                    Inicio: {item.usuario}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/***Termina el código de la info rápida */}
            </div>
        </AppLayout>
    );
}
