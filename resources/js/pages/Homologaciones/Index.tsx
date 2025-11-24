import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    ClipboardIcon,
    PencilIcon,
    TrashIcon,
} from '@heroicons/react/24/solid';
import { Head, Link, router } from '@inertiajs/react';
import { Fragment, useState } from 'react';
import FormularioHomologacion, {
    type Homologacion,
} from './FormularioHomologacion';

// Breadcrumbs para la navegación (migas de pan)
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Homologaciones', href: '/homologaciones' },
];

// Componente principal que muestra la lista de homologaciones
export default function Index({
    homologaciones,
}: {
    homologaciones: Homologacion[];
}) {
    // Estado para controlar qué homologación está expandida
    const [openId, setOpenId] = useState<number | null>(null);

    // Estado para almacenar los valores de las variables ingresadas por el usuario
    const [valores, setValores] = useState<Record<string, string>>({});

    // Maneja cambios en los inputs de variables
    const handleChange = (key: string, value: string) => {
        setValores((prev) => ({ ...prev, [key]: value }));
    };

    // Reemplaza variables {variable} en el texto con los valores actuales
    const renderTexto = (texto: string) => {
        let resultado = texto;
        Object.keys(valores).forEach((key) => {
            resultado = resultado.replaceAll(`{${key}}`, valores[key] || '');
        });
        return resultado;
    };

    // Extrae todas las variables únicas de un texto
    const getVariables = (texto: string) => {
        const matches = texto.match(/{(.*?)}/g);
        return matches ? matches.map((v) => v.replace(/[{}]/g, '')) : [];
    };

    // Elimina una homologación con confirmación
    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de eliminar esta homologación?')) {
            router.delete(`/homologaciones/${id}`, {
                onSuccess: () => {
                    router.reload(); // Recarga la página para actualizar la lista
                },
                onError: (errors) => {
                    console.error('Error al eliminar:', errors);
                    alert('Error al eliminar la homologación');
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Homologaciones" />
            <div className="flex flex-col gap-4 p-4">
                {/* Botón para crear nueva homologación */}
                <Link href="/homologaciones/create">
                    <Button className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600">
                        Crear Homologación
                    </Button>
                </Link>

                {/* Tabla principal de homologaciones */}
                <table className="w-full border-collapse overflow-hidden rounded-lg border border-gray-200 shadow">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-gray-700">
                                <div className="ml-2">Nombre</div>
                            </th>
                            <th className="px-3 py-4 text-center text-gray-700">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {/* Si hay homologaciones, las muestra */}
                        {homologaciones.length > 0 ? (
                            homologaciones.map((h) => (
                                <Fragment key={h.id}>
                                    {/* Fila principal de cada homologación */}
                                    <tr className="transition hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">
                                            {h.name}
                                        </td>
                                        <td className="flex justify-center gap-3 px-3 py-4">
                                            {/* Botón para expandir/contraer el formulario */}
                                            <button
                                                onClick={() =>
                                                    setOpenId(
                                                        openId === h.id
                                                            ? null
                                                            : h.id,
                                                    )
                                                }
                                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                                title={
                                                    openId === h.id
                                                        ? 'Cerrar formulario'
                                                        : 'Usar homologación'
                                                }
                                            >
                                                <ClipboardIcon className="h-5 w-5" />
                                                {openId === h.id
                                                    ? 'Cerrar'
                                                    : 'Usar'}
                                            </button>

                                            {/* Enlace para editar la homologación */}
                                            <Link
                                                href={`/homologaciones/${h.id}/edit`}
                                                className="flex items-center gap-1 text-green-600 hover:text-green-800"
                                                title="Editar"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                                Editar
                                            </Link>

                                            {/* Botón para eliminar la homologación */}
                                            <button
                                                onClick={() =>
                                                    handleDelete(h.id)
                                                }
                                                className="flex items-center gap-1 text-red-600 hover:text-red-800"
                                                title="Eliminar"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Fila expandible con el formulario de variables */}
                                    {openId === h.id && (
                                        <tr>
                                            <td
                                                colSpan={2}
                                                className="bg-gray-50 p-6"
                                            >
                                                <FormularioHomologacion
                                                    homologacion={h}
                                                    valores={valores}
                                                    onChange={handleChange}
                                                    getVariables={getVariables}
                                                    renderTexto={renderTexto}
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))
                        ) : (
                            // Mensaje cuando no hay homologaciones
                            <tr>
                                <td
                                    colSpan={2}
                                    className="px-6 py-6 text-center text-gray-500"
                                >
                                    No hay homologaciones
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
