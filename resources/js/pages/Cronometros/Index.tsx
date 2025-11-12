import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import CronometroCard from '@/pages/Cronometros/CronometroCard';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Cronómetros', href: '/cronometros' },
];

interface Props {
    cronometros?: any[];
    types?: any[];
    places?: any[];
}

export default function Index({
    cronometros = [],
    types = [],
    places = [],
}: Props) {
    const [selectedType, setSelectedType] = useState('');
    const [availablePriorities, setAvailablePriorities] = useState<any[]>([]);
    const [zonasSeleccionadas, setZonasSeleccionadas] = useState<number[]>([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(true);
    const [fullscreen, setFullscreen] = useState(false);

    const zonas = Array.from(
        new Map(
            places
                .filter((p) => p.state?.zone)
                .map((p) => [p.state.zone.id, p.state.zone]),
        ).values(),
    );

    useEffect(() => {
        if (zonasSeleccionadas.length === 0 && zonas.length > 0) {
            setZonasSeleccionadas(zonas.map((z) => z.id));
        }
    }, [zonas]);

    const toggleZona = (id: number) => {
        setZonasSeleccionadas((prev) =>
            prev.includes(id) ? prev.filter((z) => z !== id) : [...prev, id],
        );
    };

    const [form, setForm] = useState({
        title: '',
        ticket: '',
        type_id: '',
        place_id: '',
        priority_id: '',
    });

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const typeId = e.target.value;
        setSelectedType(typeId);
        setForm({ ...form, type_id: typeId, priority_id: '' });

        const type = types.find((t) => t.id.toString() === typeId);
        setAvailablePriorities(type?.priorities || []);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/cronometros', form, {
            onSuccess: () => {
                setForm({
                    title: '',
                    ticket: '',
                    type_id: '',
                    priority_id: '',
                    place_id: '',
                });
                setSelectedType('');
                setAvailablePriorities([]);
            },
            onError: (errors) => {
                console.error('Errores:', errors);
                alert('Ocurrió un error al crear el cronómetro');
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de eliminar este cronómetro?')) {
            router.delete(`/cronometros/${id}`, {
                onSuccess: () => router.reload(),
                onError: (errors) => {
                    console.error('Error al eliminar:', errors);
                    alert('Error al eliminar el cronómetro');
                },
            });
        }
    };

    // 🔄 Recarga automática cada 5 segundos
    useEffect(() => {
        const intervalo = setInterval(() => {
            router.reload({ only: ['cronometros'] });
        }, 5000);
        return () => clearInterval(intervalo);
    }, []);

    // 🔍 Agrupar cronómetros por zona, filtrando solo estado_id 2 o 3
    const cronPorZona = zonas.reduce((acc: any, zona) => {
        acc[zona.id] = cronometros.filter((c) => {
            const zoneId =
                c.place?.state?.zone?.id ??
                c.place?.state?.zone_id ??
                c.place?.zone_id ??
                c.zone_id;
            return zoneId === zona.id;
        });
        return acc;
    }, {});

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cronómetros" />
            <div className="flex flex-col gap-4 p-4">
                {/* Header */}
                {!fullscreen && (
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Cronómetros
                        </h1>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setMostrarFormulario(!mostrarFormulario)}
                                className="flex items-center gap-1"
                            >
                                {mostrarFormulario ? (
                                    <>
                                        <ChevronUp className="w-4 h-4" /> Ocultar formulario
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="w-4 h-4" /> Mostrar formulario
                                    </>
                                )}
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setFullscreen(true)}
                                className="flex items-center gap-1"
                            >
                                <Maximize2 className="w-4 h-4" /> Pantalla completa
                            </Button>
                        </div>
                    </div>
                )}

                {/* Formulario */}
                {!fullscreen && (
                    <div
                        className={`transition-all duration-300 overflow-hidden ${
                            mostrarFormulario
                                ? 'max-h-[1000px] opacity-100'
                                : 'max-h-0 opacity-0'
                        }`}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="mt-2 flex flex-col gap-4 rounded-lg border bg-gray-100 p-4 shadow"
                        >
                            <div className="flex flex-col gap-4 md:flex-row">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Título"
                                    value={form.title}
                                    onChange={handleChange}
                                    className="flex-1 rounded border p-2 text-black"
                                    required
                                />
                                <input
                                    type="number"
                                    name="ticket"
                                    placeholder="Ticket"
                                    value={form.ticket}
                                    onChange={handleChange}
                                    className="flex-1 rounded border p-2 text-black"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-4 md:flex-row">
                                <select
                                    name="type_id"
                                    value={form.type_id}
                                    onChange={handleTypeChange}
                                    className="flex-1 rounded border bg-white p-2 text-black dark:bg-gray-800 dark:text-white"
                                    required
                                >
                                    <option value="">Selecciona tipo</option>
                                    {types.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.name}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    name="priority_id"
                                    value={form.priority_id}
                                    onChange={handleChange}
                                    className={`flex-1 rounded border bg-white p-2 text-black dark:bg-gray-800 dark:text-white ${
                                        !selectedType ? 'opacity-70' : ''
                                    }`}
                                    required
                                    disabled={!selectedType}
                                >
                                    {!selectedType ? (
                                        <option>Primero selecciona un tipo</option>
                                    ) : availablePriorities.length > 0 ? (
                                        availablePriorities.map((p) => (
                                            <option key={p.id} value={p.id}>
                                                {p.level}
                                            </option>
                                        ))
                                    ) : (
                                        <option>No hay prioridades disponibles</option>
                                    )}
                                </select>

                                <select
                                    name="place_id"
                                    value={form.place_id}
                                    onChange={handleChange}
                                    className="flex-1 rounded border bg-white p-2 text-black dark:bg-gray-800 dark:text-white"
                                    required
                                >
                                    <option value="">Selecciona una plaza</option>
                                    {places.map((place) => (
                                        <option key={place.id} value={place.id}>
                                            {place.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-blue-500 text-white md:w-auto"
                            >
                                Crear cronómetro
                            </Button>
                        </form>
                    </div>
                )}

                {/* Filtro de zonas */}
                <div className="flex flex-wrap gap-2 items-center">
                    {zonas.map((zona) => (
                        <Button
                            key={zona.id}
                            size="sm"
                            variant={
                                zonasSeleccionadas.includes(zona.id)
                                    ? 'default'
                                    : 'outline'
                            }
                            onClick={() => toggleZona(zona.id)}
                            className="text-xs"
                        >
                            {zona.name}
                        </Button>
                    ))}

                    {fullscreen && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setFullscreen(false)}
                            className="flex items-center gap-1 ml-auto"
                        >
                            <Minimize2 className="w-4 h-4" /> Salir de pantalla completa
                        </Button>
                    )}
                </div>

                {/* Cronómetros agrupados por zona */}
                {zonas
                    .filter((z) => zonasSeleccionadas.includes(z.id))
                    .map((zona) => (
                        <div key={zona.id}>
                            <h2 className="mt-4 mb-2 text-sm font-semibold text-gray-700">
                                {zona.name}
                            </h2>

                            <div className="grid auto-rows-[1fr] grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-4">
                                {cronPorZona[zona.id]?.length > 0 ? (
                                    cronPorZona[zona.id].map((cron: any) => (
                                        <CronometroCard
                                            key={cron.id}
                                            cron={cron}
                                            onDelete={handleDelete}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full text-center text-gray-500">
                                        No hay cronómetros activos en esta zona.
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </AppLayout>
    );
}
