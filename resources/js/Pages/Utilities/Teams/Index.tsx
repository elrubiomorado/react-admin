import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Utilidades', href: '/utilities' },
    { title: 'Equipos de Trabajo', href: '/utilities/teams' },
];

interface Props {
    teams: any[];
}

export default function Index({ teams }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de eliminar este equipo de trabajo?')) {
            router.delete(`/utilities/teams/${id}`, {
                onSuccess: () => router.reload(),
                onError: (errors) => {
                    console.error('Error al eliminar:', errors);
                    alert('Error al eliminar el equipo de trabajo');
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Places" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Equipos de Trabajo
                    </h1>

                    <Link href="/utilities/teams/create">
                        <Button className="flex items-center gap-2 text-white shadow-md hover:bg-gray-900">
                            Crear nuevo equipo de trabajo
                        </Button>
                    </Link>
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
                                Unidad de negocio
                            </th>
                            <th className="px-3 py-4 text-center text-gray-700">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {teams.length > 0 ? (
                            teams.map((team) => (
                                <tr
                                    key={team.id}
                                    className="transition hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">{team.name}</td>
                                    <td className="px-6 py-4">Negocio</td>
                                    <td className="flex justify-center gap-2 px-3 py-4">
                                        {/* Botón Editar */}
                                        <Button
                                            size="sm"
                                            className="flex items-center gap-2 bg-blue-600 text-white transition-shadow duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95"
                                            onClick={() =>
                                                router.visit(
                                                    `/utilities/teams/${team.id}/edit`,
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
                                                handleDelete(team.id)
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
                                    colSpan={5}
                                    className="px-6 py-6 text-center text-gray-500"
                                >
                                    No hay equipos registrados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
