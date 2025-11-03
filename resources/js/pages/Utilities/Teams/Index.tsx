import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Utilities', href: '/utilities' },
    { title: 'Teams', href: '/utilities/teams' },
];

interface Props {
    teams: any[];
}

export default function Index({ teams }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de eliminar esta plaza?')) {
            router.delete(`/utilities/teams/${id}`, {
                onSuccess: () => router.reload(),
                onError: (errors) => {
                    console.error('Error al eliminar:', errors);
                    alert('Error al eliminar el team');
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Places" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Teams
                    </h1>

                    <Link href="/utilities/teams/create">
                        <Button className="flex items-center gap-2 text-white shadow-md hover:bg-gray-900">
                            Crear nuevo team
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Tabla */}
            <div className="p-4">
                <table className="w-full border-collapse overflow-hidden rounded-lg border border-gray-200 shadow">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-gray-700">Nombre</th>
                            <th className="px-6 py-4 text-left text-gray-700">Unidad de negocio</th>
                            <th className="px-3 py-4 text-center text-gray-700">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {teams.length > 0 ? (
                            teams.map((team) => (
                                <tr key={team.id} className="transition hover:bg-gray-50">
                                    <td className="px-6 py-4">{team.name}</td>
                                    <td className="px-6 py-4">Negocio</td>
                                    <td className="flex justify-center gap-3 px-3 py-4">
                                        <Link
                                            href={`/utilities/teams/${team.id}/edit`}
                                            className="flex items-center gap-1 text-green-600 hover:text-green-800"
                                            title="Editar"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(team.id)}
                                            className="flex items-center gap-1 text-red-600 hover:text-red-800"
                                            title="Eliminar"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-6 text-center text-gray-500">
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
