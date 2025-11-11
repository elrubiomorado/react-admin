import { Button } from '@/components/ui/button'; // Componente de botón reutilizable
import AppLayout from '@/layouts/app-layout'; // Layout general de la app (con navegación, etc.)
import { type BreadcrumbItem } from '@/types'; // Tipo para las migas de pan
import { Head, Link, router } from '@inertiajs/react'; // Head para título, Link y router para navegación y acciones
import React, { useState } from 'react'; // useState para manejar el estado del formulario

// Definición de las migas de pan para esta página
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Utilidades', href: '/utilities/' },
    { title: 'Equipos', href: '/utilities/teams' },       // Página de listado
    { title: 'Crear', href: '/utilities/teams/create' } // Página actual (crear)
];

// Componente principal para crear una plaza
export default function Create() {
    // --- Estado del formulario ---
    // "form" contiene todos los campos que se van a enviar al backend
    const [form, setForm] = useState({
        name: '',     // Nombre de la plaza

    });

    // Estado para mostrar/ocultar la sección de información explicativa
    const [infoOpen, setInfoOpen] = useState(false);

    // --- Función para actualizar campos del formulario ---
    const handleChange = (field: string, value: string) => {
        // Actualiza solo el campo que cambió, manteniendo los demás intactos
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // --- Función para manejar el envío del formulario ---
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Evita que la página se recargue al hacer submit

        // router.post envía los datos al backend usando Inertia
        router.post('/utilities/teams', form, {
            onSuccess: () => {
                // Opcional: acciones después de enviar con éxito,
                // como limpiar el formulario o mostrar mensaje
                // Aquí se puede redirigir o resetear campos
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* Título de la pestaña del navegador */}
            <Head title="Añadir Equipo" />

            {/* Contenedor centrado */}
            <div className="flex w-full justify-center py-6">
                <div className="w-full max-w-3xl px-6">
                    {/* Cabecera del formulario */}
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Añadir Nuevo Equipo de Trabajo</h1>

                        {/* Botón para volver al listado */}
                        <Link href="/utilities/teams">
                            <Button>Volver</Button>
                        </Link>
                    </div>

                    {/* Explicación desplegable */}
                    <div className="mb-6">
                        <button
                            type="button"
                            onClick={() => setInfoOpen(!infoOpen)} // Alterna visibilidad
                            className="flex w-full items-center justify-between rounded bg-gray-100 px-4 py-2 text-left hover:bg-gray-200"
                        >
                            <span className="font-semibold">
                                Cómo usar este formulario
                            </span>
                            <span>{infoOpen ? '▲' : '▼'}</span>
                        </button>

                        {/* Texto explicativo solo visible si infoOpen es true */}
                        {infoOpen && (
                            <div className="mt-2 rounded border-l-4 border-blue-500 bg-gray-50 p-4 text-sm text-gray-700">
                                <p className="mb-2">
                                    Aquí puedes añadir nuevos equipos de trabajo a la base
                                    de datos
                                </p>
                            </div>
                        )}
                    </div>

                    {/* --- Formulario --- */}
                    <form
                        onSubmit={handleSubmit} // Se llama al enviar
                        className="grid grid-cols-1 gap-4"
                    >
                        {/* Input para el nombre de la plaza */}
                        <input
                            type="text"
                            placeholder="Nombre del team"
                            value={form.name} // Valor controlado desde el estado
                            onChange={(e) =>
                                handleChange('name', e.target.value.toUpperCase()) // Actualiza estado
                            }
                            className="w-full rounded border px-3 py-2"
                            required
                        />
                        <Button type="submit">Guardar Equipo</Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
