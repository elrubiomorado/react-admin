import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/dashboard' },
    { title: 'Ingenieros', href: '/engineers' },
];

interface Engineer {
    id: number;
    name: string;
    email?: string;
    teams_user?: string;
    place?: { name: string };
    job_title?: {
        title: string;
        team?: { name: string };
    };
    phones?: any[]; // 👈 corregido
}

interface Props {
    engineers: Engineer[];
    search?: string;
}

export default function Index({
    search: initialSearch = '',
    engineers,
}: Props) {
    const [searchText, setSearchText] = useState(initialSearch ?? '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                '/engineers',
                { search: searchText },
                { preserveState: true, replace: true },
            );
        }, 300);
        return () => clearTimeout(timeout);
    }, [searchText]);

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de eliminar este ingeniero?')) {
            router.delete(`/engineers/${id}`, {
                onSuccess: () => router.reload(),
                onError: (errors) => {
                    console.error('Error al eliminar:', errors);
                    alert('Error al eliminar al ingeniero');
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ingenieros" />

            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Lista de ingenieros
                </h1>

                <div className="flex justify-start">
                    <Link href="/engineers/create">
                        <Button className="flex items-center gap-2 bg-blue-500 text-white shadow-md hover:bg-blue-600">
                            Añadir ingeniero
                        </Button>
                    </Link>
                </div>

                {/* Filtro de búsqueda */}
                <div className="mt-2 flex gap-2">
                    <input
                        type="text"
                        placeholder="Buscar por nombre, equipo, puesto, etc."
                        value={searchText ?? ''}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="flex-1 rounded border px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>
            </div>

            {/* Tabla */}
            <div className="p-4">
                <table className="w-full border-collapse overflow-hidden rounded-lg border border-gray-200 shadow">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-gray-700">
                                Nombre
                            </th>
                            <th className="px-6 py-4 text-left text-gray-700">
                                Teléfonos
                            </th>
                            <th className="px-6 py-4 text-left text-gray-700">
                                Email
                            </th>
                            <th className="px-6 py-4 text-left text-gray-700">
                                Usuario Teams
                            </th>
                            <th className="px-6 py-4 text-left text-gray-700">
                                Puesto
                            </th>
                            <th className="px-6 py-4 text-left text-gray-700">
                                Equipo de trabajo
                            </th>
                            <th className="px-6 py-4 text-left text-gray-700">
                                Plaza
                            </th>
                            <th className="px-3 py-4 text-center text-gray-700">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {engineers.length > 0 ? (
                            engineers.map((engineer) => (
                                <tr
                                    key={engineer.id}
                                    className="transition hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {engineer.name}
                                    </td>

                                    <td className="px-6 py-4 text-gray-700">
                                        {engineer.phones?.length ? (
                                            <div className="flex flex-wrap gap-2">
                                                {engineer.phones.map((p, i) => (
                                                    <span
                                                        key={i}
                                                        className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                                                    >
                                                        {p.phone}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            '—'
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        {engineer.email ?? '—'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {engineer.teams_user ?? '—'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {engineer.job_title?.title ?? '—'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {engineer.job_title?.team?.name ?? '—'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {engineer.place?.name ?? '—'}
                                    </td>

                                    <td className="flex justify-center gap-2 px-3 py-4">
                                        {/* Botón Editar */}
                                        <Button
                                            size="sm"
                                            className="flex items-center gap-2 bg-blue-600 text-white transition-shadow duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95"
                                            onClick={() =>
                                                router.visit(
                                                    `/engineers/${engineer.id}/edit`,
                                                )
                                            }
                                            title="Editar"
                                        >
                                            <PencilIcon className="h-4 w-4 text-white" />
                                            <span>Editar</span>
                                        </Button>

                                        {/* Botón Eliminar */}
                                        <Button
                                            size="sm"
                                            className="flex items-center gap-2 bg-red-600 text-white transition-shadow duration-200 hover:bg-red-700 hover:shadow-md active:scale-95"
                                            onClick={() =>
                                                handleDelete(engineer.id)
                                            }
                                            title="Eliminar"
                                        >
                                            <TrashIcon className="h-4 w-4 text-white" />
                                            <span>Eliminar</span>
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-6 py-6 text-center text-gray-500"
                                >
                                    No hay ingenieros registrados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
