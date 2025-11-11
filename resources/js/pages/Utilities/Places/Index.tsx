import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Utilidades', href: '/utilities' },
    { title: 'Plazas', href: '/utilities/places' },
];

interface Props {
    places: any[];
    zones: any[];
    search?: string;
    zone_id?: number | string;
}

export default function Index({
    places,
    zones,
    search: initialSearch = '',
    zone_id: initialZone = '',
}: Props) {
    const [searchText, setSearchText] = useState(initialSearch ?? '');
    const [zoneFilter, setZoneFilter] = useState(initialZone ?? '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                '/utilities/places',
                { search: searchText, zone_id: zoneFilter },
                { preserveState: true, replace: true }
            );
        }, 300);
        return () => clearTimeout(timeout);
    }, [searchText, zoneFilter]);

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de eliminar esta plaza?')) {
            router.delete(`/utilities/places/${id}`, {
                onSuccess: () => router.reload(),
                onError: (errors) => {
                    console.error('Error al eliminar:', errors);
                    alert('Error al eliminar la plaza');
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Plazas" />

            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-3xl font-bold text-gray-800">
                Plazas
                </h1>

                <div className="flex justify-start">
                    <Link href="/utilities/places/create">
                        <Button className="flex items-center gap-2 text-white shadow-md hover:bg-gray-900">
                            Añadir plaza
                        </Button>
                    </Link>
                </div>

                {/* Filtros */}
                <div className="mt-2 flex gap-2">
                    <input
                        type="text"
                        placeholder="Buscar por nombre, estado o zona"
                        value={searchText ?? ''}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="flex-1 rounded border px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                    <select
                        value={zoneFilter ?? ''}
                        onChange={(e) => setZoneFilter(e.target.value)}
                        className="rounded border px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                        <option value="">Todas las zonas</option>
                        {zones.map((zone: any) => (
                            <option key={zone.id} value={zone.id}>
                                {zone.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Tabla */}
            <div className="p-4">
                <table className="w-full border-collapse overflow-hidden rounded-lg border border-gray-200 shadow">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-gray-700">Nombre</th>
                            <th className="px-6 py-4 text-left text-gray-700">Abreviatura</th>
                            <th className="px-6 py-4 text-left text-gray-700">Estado</th>
                            <th className="px-6 py-4 text-left text-gray-700">Zona</th>
                            <th className="px-3 py-4 text-center text-gray-700">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {places.length > 0 ? (
                            places.map((place) => (
                                <tr key={place.id} className="transition hover:bg-gray-50">
                                    <td className="px-6 py-4">{place.name}</td>
                                    <td className="px-6 py-4">{place.short_name}</td>
                                    <td className="px-6 py-4">{place.state?.name ?? '—'}</td>
                                    <td className="px-6 py-4">{place.state?.zone?.name ?? '—'}</td>
                                    <td className="flex justify-center gap-3 px-3 py-4">
                                        <Link
                                            href={`/utilities/places/${place.id}/edit`}
                                            className="flex items-center gap-1 text-green-600 hover:text-green-800"
                                            title="Editar"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(place.id)}
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
                                    No hay plazas registradas
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
