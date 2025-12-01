import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import CronometroCard from '@/Pages/Cronometros/CronometroCard';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import {
    ChevronDown,
    ChevronUp,
    Maximize2,
    Minimize2,
    ReceiptText,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Cronómetros', href: '/cronometros' },
];

interface Props {
    cronometros?: any[];
    types?: any[];
    places?: any[];
    engineers: any[];
    contactMethods: any[];
    user: {
        name: string;
    };
}

export default function Index({
    cronometros = [],
    types = [],
    places = [],
    engineers = [],
    contactMethods = [],
    user,
}: Props) {
    const [selectedType, setSelectedType] = useState('');
    const [availablePriorities, setAvailablePriorities] = useState<any[]>([]);
    const [zonasSeleccionadas, setZonasSeleccionadas] = useState<number[]>([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(true);
    const [fullscreen, setFullscreen] = useState(false);
    const [mostrarTodos, setMostrarTodos] = useState(true);

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

    // ✅ CORREGIDO: recibe solo el ID, no un evento
    const handleTypeChange = (typeId: string) => {
        setSelectedType(typeId);

        setForm((prev) => ({
            ...prev,
            type_id: typeId,
            priority_id: '',
        }));

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
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de eliminar este cronómetro?')) {
            router.delete(`/cronometros/${id}`, {
                onSuccess: () => {
                    router.reload();
                },
                onError: (errors) => {
                    console.error('Error al eliminar el cronómetro:', errors);
                    alert('Error al eliminar el cronómetro');
                },
            });
        }
    };

    const handleComplete = (id: number) => {
        if (confirm('¿Estás seguro de terminar este cronómetro?')) {
            router.post(
                `/cronometros/${id}/complete`,
                {},
                {
                    onSuccess: () => router.reload(),
                    onError: (errors) => {
                        console.error(
                            'Error al terminar el cronómetro:',
                            errors,
                        );
                        alert('Error al terminar el cronómetro');
                    },
                },
            );
        }
    };

    // Recarga cada 5s
    useEffect(() => {
        const intervalo = setInterval(() => {
            router.reload({ only: ['cronometros'] });
        }, 5000);
        return () => clearInterval(intervalo);
    }, []);

    const cronometrosFiltrados = cronometros.filter((c) => {
        const zoneId =
            c.place?.state?.zone?.id ??
            c.place?.state?.zone_id ??
            c.place?.zone_id ??
            c.zone_id;
        return zonasSeleccionadas.includes(zoneId);
    });

    return (
        <>
            {fullscreen ? (
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex justify-end">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setFullscreen(false)}
                            className="flex items-center gap-1"
                        >
                            <Minimize2 className="h-4 w-4" /> Salir de pantalla
                            completa
                        </Button>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                        {zonas.map((zona) => (
                            <Button
                                key={zona.id}
                                size="sm"
                                onClick={() => toggleZona(zona.id)}
                                className={
                                    zonasSeleccionadas.includes(zona.id)
                                        ? 'bg-slate-800 text-xs text-white hover:bg-slate-700'
                                        : 'border border-gray-300 bg-white text-xs text-gray-500 hover:bg-gray-50'
                                }
                            >
                                {zona.name}
                            </Button>
                        ))}

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setMostrarTodos(!mostrarTodos)}
                            className={
                                !mostrarTodos
                                    ? 'ml-auto flex bg-slate-800 text-xs text-white hover:bg-slate-700'
                                    : 'ml-auto flex border border-gray-300 bg-white text-xs text-gray-500 hover:bg-gray-50'
                            }
                        >
                            {!mostrarTodos
                                ? 'MOSTRAR EN PROCESO'
                                : 'OCULTAR EN PROCESO'}
                        </Button>
                    </div>

                    <div className="mt-4 grid auto-rows-[1fr] grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-4">
                        {cronometrosFiltrados.length > 0 ? (
                            cronometrosFiltrados.map((cron) => (
                                <CronometroCard
                                    key={cron.id}
                                    cron={cron}
                                    engineers={engineers}
                                    contactMethods={contactMethods}
                                    onDelete={handleDelete}
                                    onComplete={handleComplete}
                                    user={user}
                                    mostrarTodos={mostrarTodos}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500">
                                No hay cronómetros activos.
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <AppLayout breadcrumbs={breadcrumbs}>
                    <Head title="Cronómetros" />
                    <div className="flex flex-col gap-4 p-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-foreground">
                                Cronómetros
                            </h1>

                            <div className="ml-4 flex items-center gap-2">
                                <Button
                                    size="sm"
                                    onClick={() =>
                                        router.get('/cronometros/history')
                                    }
                                    title="Ver Historial"
                                    className="flex min-w-[120px] items-center gap-1 bg-blue-500 hover:bg-blue-600 sm:min-w-auto"
                                >
                                    <ReceiptText className="h-4 w-4 text-white" />
                                    Ver historial
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        setMostrarFormulario(!mostrarFormulario)
                                    }
                                    className="flex items-center gap-1"
                                >
                                    {mostrarFormulario ? (
                                        <>
                                            <ChevronUp className="h-4 w-4" />{' '}
                                            Ocultar formulario
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown className="h-4 w-4" />{' '}
                                            Mostrar formulario
                                        </>
                                    )}
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setFullscreen(true)}
                                    className="flex items-center gap-1"
                                >
                                    <Maximize2 className="h-4 w-4" /> Pantalla
                                    completa
                                </Button>
                            </div>
                        </div>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${
                                mostrarFormulario
                                    ? 'max-h-[1000px] opacity-100'
                                    : 'max-h-0 opacity-0'
                            }`}
                        >
                            <Card className="mt-2">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Crear Cronómetro
                                    </CardTitle>
                                    <CardDescription>
                                        Llena los campos para crear un nuevo
                                        registro.
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-4"
                                    >
                                        <div className="space-y-2">
                                            <Label htmlFor="title">
                                                Título
                                            </Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                value={form.title}
                                                onChange={handleChange}
                                                placeholder="Ingresa un título"
                                                required
                                                className="bg-white"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="ticket">
                                                Ticket
                                            </Label>
                                            <Input
                                                id="ticket"
                                                type="number"
                                                name="ticket"
                                                value={form.ticket}
                                                onChange={handleChange}
                                                placeholder="Número de ticket"
                                                required
                                                className="bg-white"
                                            />
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-3">
                                            {/* TIPO */}
                                            <div className="space-y-2">
                                                <Label>Tipo</Label>
                                                <Select
                                                    value={form.type_id}
                                                    onValueChange={
                                                        handleTypeChange
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona un tipo" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {types.map((t) => (
                                                            <SelectItem
                                                                key={t.id}
                                                                value={String(
                                                                    t.id,
                                                                )}
                                                            >
                                                                {t.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* PRIORIDAD */}
                                            <div className="space-y-2">
                                                <Label>Prioridad</Label>
                                                <Select
                                                    value={form.priority_id}
                                                    onValueChange={(val) =>
                                                        setForm((prev) => ({
                                                            ...prev,
                                                            priority_id: val,
                                                        }))
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder={
                                                                selectedType
                                                                    ? 'Selecciona prioridad'
                                                                    : 'Primero selecciona un tipo'
                                                            }
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {availablePriorities.length >
                                                        0 ? (
                                                            availablePriorities.map(
                                                                (p) => (
                                                                    <SelectItem
                                                                        key={
                                                                            p.id
                                                                        }
                                                                        value={String(
                                                                            p.id,
                                                                        )}
                                                                    >
                                                                        {
                                                                            p.level
                                                                        }
                                                                    </SelectItem>
                                                                ),
                                                            )
                                                        ) : (
                                                            <SelectItem
                                                                value="0"
                                                                disabled
                                                            >
                                                                No hay
                                                                prioridades
                                                                disponibles
                                                            </SelectItem>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* PLAZA */}
                                            <div className="space-y-2">
                                                <Label>Plaza</Label>
                                                <Select
                                                    value={form.place_id}
                                                    onValueChange={(val) =>
                                                        setForm((prev) => ({
                                                            ...prev,
                                                            place_id: val,
                                                        }))
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona una plaza" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {places.map((place) => (
                                                            <SelectItem
                                                                key={place.id}
                                                                value={String(
                                                                    place.id,
                                                                )}
                                                            >
                                                                {place.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white hover:bg-blue-700"
                                        >
                                            Crear cronómetro
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                            {zonas.map((zona) => (
                                <Button
                                    key={zona.id}
                                    size="sm"
                                    onClick={() => toggleZona(zona.id)}
                                    className={
                                        zonasSeleccionadas.includes(zona.id)
                                            ? 'bg-slate-800 text-xs text-white hover:bg-slate-700'
                                            : 'border border-gray-300 bg-white text-xs text-gray-500 hover:bg-gray-50'
                                    }
                                >
                                    {zona.name}
                                </Button>
                            ))}

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setMostrarTodos(!mostrarTodos)}
                                className={
                                    !mostrarTodos
                                        ? 'ml-auto flex bg-slate-800 text-xs text-white hover:bg-slate-700'
                                        : 'ml-auto flex border border-gray-300 bg-white text-xs text-gray-500 hover:bg-gray-50'
                                }
                            >
                                {!mostrarTodos
                                    ? 'MOSTRAR EN PROCESO'
                                    : 'OCULTAR EN PROCESO'}
                            </Button>
                        </div>

                        <div className="mt-4 grid auto-rows-[1fr] grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-4">
                            {cronometrosFiltrados.length > 0 ? (
                                cronometrosFiltrados.map((cron) => (
                                    <CronometroCard
                                        key={cron.id}
                                        cron={cron}
                                        engineers={engineers}
                                        contactMethods={contactMethods}
                                        onDelete={handleDelete}
                                        onComplete={handleComplete}
                                        user={user}
                                        mostrarTodos={mostrarTodos}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full text-center text-gray-500">
                                    No hay cronómetros activos.
                                </div>
                            )}
                        </div>
                    </div>
                </AppLayout>
            )}
        </>
    );
}
