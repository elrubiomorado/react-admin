import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState } from 'react';

// Breadcrumbs para edición
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Utilities', href: '/utilities/' },
    { title: 'Teams', href: '/utilities/teams' },
    { title: 'Edit', href: '#' },
];

interface Props {
    team: {
        id: number;
        name: string;
    };
}

export default function Edit({ team }: Props) {
    // Estado inicial del formulario con valores por defecto para evitar inputs no controlados
    const [form, setForm] = useState({
        name: team.name || '',
    });

    const [infoOpen, setInfoOpen] = useState(false);

    // Actualiza el estado del formulario
    const handleChange = (field: string, value: string | number) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/utilities/teams/${team.id}`, form, {
            onSuccess: () => {
                // Opcional: mensaje o redirección
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Team: ${team.name}`} />

            <div className="flex w-full justify-center py-6">
                <div className="w-full max-w-3xl px-6">
                    {/* Cabecera */}
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Edit Team</h1>
                        <Link href="/utilities/teams">
                            <Button>Volver</Button>
                        </Link>
                    </div>

                    {/* Información desplegable */}
                    <div className="mb-6">
                        <button
                            type="button"
                            onClick={() => setInfoOpen(!infoOpen)}
                            className="flex w-full items-center justify-between rounded bg-gray-100 px-4 py-2 text-left hover:bg-gray-200"
                        >
                            <span className="font-semibold">
                                Cómo usar este formulario
                            </span>
                            <span>{infoOpen ? '▲' : '▼'}</span>
                        </button>

                        {infoOpen && (
                            <div className="mt-2 rounded border-l-4 border-blue-500 bg-gray-50 p-4 text-sm text-gray-700">
                                <p className="mb-2">
                                    Aquí puedes editar los datos del team
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Formulario */}
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 gap-4"
                    >
                        <input
                            type="text"
                            placeholder="Nombre del team"
                            value={form.name}
                            onChange={(e) =>
                                handleChange(
                                    'name',
                                    e.target.value.toUpperCase(),
                                )
                            }
                            className="w-full rounded border px-3 py-2"
                            required
                        />

                        {/* TODO */}
                        {/* <input
                            type="text"
                            placeholder="Nombre corto"
                            value={form.unidadNegocio}
                            onChange={(e) =>
                                handleChange('unidadNegocio', e.target.value.toUpperCase())
                            }
                            className="w-full rounded border px-3 py-2"
                            required
                        /> */}

                        <Button type="submit">Update Team</Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
