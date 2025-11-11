import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Homologaciones', href: '/homologaciones' },
    { title: 'Crear', href: '/homologaciones/create' },
];

export default function Create() {
    const [form, setForm] = useState({
        name: '',
        title_base: '',
        body: ''
    });
    const [infoOpen, setInfoOpen] = useState(false);

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post('/homologaciones', form, {
            onSuccess: () => {
                // Los campos se limpiarán automáticamente al redirigir
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Homologación" />

            <div className="flex justify-center w-full py-6">
                <div className="w-full max-w-3xl px-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Crear nueva homologación</h1>
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
                                    Aquí puedes crear homologaciones que luego se pueden reutilizar para generar títulos y cuerpos de manera automática.
                                </p>
                                <p className="mb-2">
                                    En <strong>Título</strong> y <strong>Mensaje</strong> puedes usar variables entre llaves <code>{'{variable}'}</code>, como <code>{'{equipo}'}</code> o <code>{'{ip}'}</code>.
                                </p>
                                <p>
                                    Luego de guardar la homologación, podrás verla en la tabla de homologaciones existentes y generar texto final con las variables reemplazadas.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                        <input
                            type="text"
                            placeholder="Nombre de la homologación"
                            value={form.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className="border rounded w-full px-3 py-2"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Título (puede contener {variables})"
                            value={form.title_base}
                            onChange={(e) => handleChange('title_base', e.target.value)}
                            className="border rounded w-full px-3 py-2"
                            required
                        />

                        <textarea
                            placeholder="Mensaje (puede contener {variables})"
                            value={form.body}
                            onChange={(e) => handleChange('body', e.target.value)}
                            className="border rounded w-full px-3 py-2"
                            rows={6}
                            required
                        />

                        <Button type="submit">Guardar homologación</Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
