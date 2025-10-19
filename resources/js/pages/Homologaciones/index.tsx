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

interface Homologacion {
    id: number;
    name: string;
    title_base: string;
    body: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Homologaciones', href: '/homologaciones' },
];

export default function Index({
    homologaciones,
}: {
    homologaciones: Homologacion[];
}) {
    const [openId, setOpenId] = useState<number | null>(null);
    const [valores, setValores] = useState<Record<string, string>>({});

    const handleChange = (key: string, value: string) => {
        setValores((prev) => ({ ...prev, [key]: value }));
    };

    const renderTexto = (texto: string) => {
        let resultado = texto;
        Object.keys(valores).forEach((key) => {
            resultado = resultado.replaceAll(`{${key}}`, valores[key] || '');
        });
        return resultado;
    };

    const getVariables = (texto: string) => {
        const matches = texto.match(/{(.*?)}/g);
        return matches ? matches.map((v) => v.replace(/[{}]/g, '')) : [];
    };

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de eliminar esta homologación?')) {
            router.delete(`/homologaciones/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Homologaciones" />
            <div className="flex flex-col gap-4 p-4">
                <Link href="/homologaciones/create">
                    <Button className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700">
                        Crear Homologación
                    </Button>
                </Link>

                <table className="w-full border-collapse overflow-hidden rounded-lg border border-gray-200 shadow">
                    <thead className="bg-gray-50">
                        <tr>
                            {/* Nombre con un pequeño margen izquierdo */}
                            <th className="px-6 py-4 text-left text-gray-700">
                                <div className="ml-2">Nombre</div>
                            </th>
                            {/* Acciones con menos padding horizontal, centrado */}
                            <th className="px-3 py-4 text-center text-gray-700">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {homologaciones.length > 0 ? (
                            homologaciones.map((h, index) => (
                                <Fragment key={h.id}>
                                    <tr className="transition hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">
                                            {h.name}
                                        </td>
                                        <td className="flex justify-center gap-3 px-3 py-4">
                                            <button
                                                onClick={() =>
                                                    setOpenId(
                                                        openId === index
                                                            ? null
                                                            : index,
                                                    )
                                                }
                                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                                title={
                                                    openId === index
                                                        ? 'Cerrar formulario'
                                                        : 'Usar homologación'
                                                }
                                            >
                                                <ClipboardIcon className="h-5 w-5" />
                                                {openId === index
                                                    ? 'Cerrar'
                                                    : 'Usar'}
                                            </button>
                                            <Link
                                                href={`/homologaciones/${h.id}/edit`}
                                                className="flex items-center gap-1 text-green-600 hover:text-green-800"
                                                title="Editar"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                                Editar
                                            </Link>
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

                                    {openId === index && (
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

interface FormularioHomologacionProps {
    homologacion: Homologacion;
    valores: Record<string, string>;
    onChange: (key: string, value: string) => void;
    renderTexto: (texto: string) => string;
    getVariables: (texto: string) => string[];
}

function FormularioHomologacion({
    homologacion,
    valores,
    onChange,
    renderTexto,
    getVariables,
}: FormularioHomologacionProps) {
    const variables = Array.from(
        new Set([
            ...getVariables(homologacion.title_base || ''),
            ...getVariables(homologacion.body || ''),
        ]),
    );

    const tituloFinal = renderTexto(homologacion.title_base || '');
    const cuerpoFinal = renderTexto(homologacion.body || '');

    return (
        <div className="space-y-4">
            <p className="font-semibold text-gray-700">
                Completa los campos de la homologación:
            </p>
            <div className="grid grid-cols-2 gap-4">
                {variables.map((v) => (
                    <div key={v}>
                        <label className="mb-1 block text-sm text-gray-600">
                            {v}
                        </label>
                        <input
                            type="text"
                            className="w-full rounded border px-3 py-2 focus:ring-1 focus:ring-blue-400 focus:outline-none"
                            value={valores[v] || ''}
                            onChange={(e) => onChange(v, e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <div className="space-y-2">
                <p className="font-semibold text-gray-700">Título generado:</p>
                <div className="flex gap-2">
                    <input
                        readOnly
                        className="w-full rounded border bg-gray-100 p-2"
                        value={tituloFinal}
                    />
                    <button
                        onClick={() =>
                            navigator.clipboard.writeText(tituloFinal)
                        }
                        className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-white"
                    >
                        <ClipboardIcon className="h-5 w-5" /> Copiar
                    </button>
                </div>

                <p className="font-semibold text-gray-700">Cuerpo generado:</p>
                <div className="flex gap-2">
                    <textarea
                        readOnly
                        className="w-full rounded border bg-gray-100 p-2"
                        rows={5}
                        value={cuerpoFinal}
                    />
                    <button
                        onClick={() =>
                            navigator.clipboard.writeText(cuerpoFinal)
                        }
                        className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-white"
                    >
                        <ClipboardIcon className="h-5 w-5" /> Copiar
                    </button>
                </div>
            </div>
        </div>
    );
}
