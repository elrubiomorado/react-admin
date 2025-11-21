import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Utilidades', href: '/utilities' },
    { title: 'Calendarios', href: '/utilities/calendars' },
];

interface Props {
    calendars: any[];
}

export default function Index({ calendars }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de eliminar este evento de calendario?')) {
            router.delete(`/utilities/calendars/${id}`, {
                onSuccess: () => router.reload(),
                onError: (errors) => {
                    console.error('Error al eliminar:', errors);
                    alert('Error al eliminar el calendario');
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Calendarios" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Calendarios
                    </h1>

                    <Link href="/utilities/calendars/create">
                        <Button className="flex items-center gap-2 text-white shadow-md hover:bg-gray-900">
                            Crear nuevo evento
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Tabla */}
            <div className="p-4">
                <table className="w-full border-collapse overflow-hidden rounded-lg border border-gray-200 shadow">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-gray-700">Nota</th>
                            <th className="px-6 py-4 text-left text-gray-700">Fecha</th>
                            <th className="px-3 py-4 text-center text-gray-700">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {calendars.length > 0 ? (
                            calendars.map((calendar) => (
                                <tr key={calendar.id} className="transition hover:bg-gray-50">
                                    <td className="px-6 py-4">{calendar.note}</td>
                                    <td className="px-6 py-4">
                                        {calendar.date ?? 'Sin fecha'}
                                    </td>
                                    <td className="flex justify-center gap-3 px-3 py-4">
                                        <Link
                                            href={`/utilities/calendars/${calendar.id}/edit`}
                                            className="flex items-center gap-1 text-green-600 hover:text-green-800"
                                            title="Editar"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                            Editar
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(calendar.id)}
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
                                <td colSpan={3} className="px-6 py-6 text-center text-gray-500">
                                    No hay eventos registrados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
