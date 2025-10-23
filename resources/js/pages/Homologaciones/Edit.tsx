import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

interface Homologacion {
    id: number;
    name: string;
    title_base: string;
    body: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Homologaciones', href: '/homologaciones' },
    { title: 'Editar', href: '#' },
];

export default function Edit({ homologacion }: { homologacion: Homologacion }) {
    const [form, setForm] = useState({
        name: '',
        title_base: '',
        body: ''
    });
    const [infoOpen, setInfoOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Cargar los datos de la homologación cuando el componente se monta
    useEffect(() => {
        if (homologacion) {
            setForm({
                name: homologacion.name || '',
                title_base: homologacion.title_base || '',
                body: homologacion.body || ''
            });
        }
    }, [homologacion]);

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        router.put(`/homologaciones/${homologacion.id}`, form, {
            onSuccess: () => {
                setLoading(false);
            },
            onError: (errors) => {
                console.error('Error al actualizar:', errors);
                setLoading(false);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Homologación" />

            <div className="flex justify-center w-full py-6">
                <div className="w-full max-w-3xl px-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Editar homologación: {homologacion.name}</h1>
                        <Link href="/homologaciones">
                            <Button>Volver</Button>
                        </Link>
                    </div>

                    {/* Explicación desplegable */}
                    <div className="mb-6">
                        <button
                            type="button"
                            onClick={() => setInfoOpen(!infoOpen)}
                            className="w-full text-left bg-gray-100 px-4 py-2 rounded flex justify-between items-center hover:bg-gray-200"
                        >
                            <span className="font-semibold">Cómo usar este formulario</span>
                            <span>{infoOpen ? '▲' : '▼'}</span>
                        </button>

                        {infoOpen && (
                            <div className="bg-gray-50 border-l-4 border-blue-500 p-4 mt-2 rounded text-sm text-gray-700">
                                <p className="mb-2">
                                    Edita los campos de la homologación. Puedes modificar el nombre, el título base y el cuerpo.
                                </p>
                                <p className="mb-2">
                                    En <strong>Title base</strong> y <strong>Body</strong> puedes usar variables entre llaves <code>{'{variable}'}</code>, como <code>{'{equipo}'}</code> o <code>{'{ip}'}</code>.
                                </p>
                                <p>
                                    Los cambios se guardarán y podrás usar la homologación actualizada en la tabla principal.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre de la homologación
                            </label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="border rounded w-full px-3 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Título base (puede contener variables entre llaves)
                            </label>
                            <input
                                type="text"
                                value={form.title_base}
                                onChange={(e) => handleChange('title_base', e.target.value)}
                                className="border rounded w-full px-3 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cuerpo (puede contener variables entre llaves)
                            </label>
                            <textarea
                                value={form.body}
                                onChange={(e) => handleChange('body', e.target.value)}
                                className="border rounded w-full px-3 py-2"
                                rows={6}
                                required
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button 
                                type="submit" 
                                className="bg-green-600 hover:bg-green-700"
                                disabled={loading}
                            >
                                {loading ? 'Guardando...' : 'Actualizar homologación'}
                            </Button>
                            <Link href="/homologaciones">
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}