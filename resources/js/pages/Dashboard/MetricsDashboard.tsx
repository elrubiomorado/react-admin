import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    AlertTriangle,
    CheckCircle,
    Clock,
    PlusCircle,
    TrendingDown,
    TrendingUp,
    User,
} from 'lucide-react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
];

interface MetricsDashboardProps {
    metrics: {
        ticketsActivos: number;
        ticketsCreadosHoy: number;
        ticketsResueltosHoy: number;
        tiempoPromedioResolucion: number;
        tendenciaTickets: number;
        tendenciaTiempo: number;
        ticketsPorUsuario: Array<{
            nombre: string;
            tickets: number;
            avatar?: string;
        }>;
        topZonas: Array<{
            nombre: string;
            tickets: number;
            tendencia: number;
        }>;
    };
}

export default function MetricsDashboard({ metrics }: MetricsDashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard de Métricas" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Dashboard de Métricas
                    </h1>
                    <div className="text-sm text-gray-500">
                        Semana: {new Date().toLocaleDateString()}
                    </div>
                </div>

                {/* Métricas Principales */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <MetricCard
                        title="Tickets Activos"
                        value={metrics.ticketsActivos}
                        icon={
                            <AlertTriangle className="h-6 w-6 text-orange-500" />
                        }
                        trend={metrics.tendenciaTickets}
                        trendLabel="vs ayer"
                    />

                    {/* NUEVO: Tickets Creados Hoy */}
                    <MetricCard
                        title="Creados Hoy"
                        value={metrics.ticketsCreadosHoy}
                        icon={<PlusCircle className="h-6 w-6 text-blue-500" />}
                        trend={8}
                        trendLabel="vs ayer"
                    />

                    <MetricCard
                        title="Resueltos Hoy"
                        value={metrics.ticketsResueltosHoy}
                        icon={
                            <CheckCircle className="h-6 w-6 text-green-500" />
                        }
                        trend={5}
                        trendLabel="vs ayer"
                    />

                    <MetricCard
                        title="Tiempo Promedio"
                        value={`${metrics.tiempoPromedioResolucion}h`}
                        icon={<Clock className="h-6 w-6 text-purple-500" />}
                        trend={metrics.tendenciaTiempo}
                        trendLabel="vs semana pasada"
                    />
                </div>

                {/* Segunda Fila: Tickets por Usuario y Top Zonas */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* NUEVO: Tickets por Usuario (Semanal) */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Tickets por Usuario (Esta Semana)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {metrics.ticketsPorUsuario.map(
                                    (usuario, index) => (
                                        <UsuarioItem
                                            key={usuario.nombre}
                                            nombre={usuario.nombre}
                                            tickets={usuario.tickets}
                                            rank={index + 1}
                                        />
                                    ),
                                )}
                                {metrics.ticketsPorUsuario.length === 0 && (
                                    <div className="py-4 text-center text-gray-500">
                                        No hay tickets esta semana
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Zonas Problemáticas */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Zonas con Más Incidentes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {metrics.topZonas.map((zona, index) => (
                                    <ZonaItem
                                        key={zona.nombre}
                                        nombre={zona.nombre}
                                        tickets={zona.tickets}
                                        tendencia={zona.tendencia}
                                        rank={index + 1}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

// Componente para cada métrica individual (se mantiene igual)
function MetricCard({
    title,
    value,
    icon,
    trend,
    trendLabel,
}: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend: number;
    trendLabel: string;
}) {
    const isPositive = trend >= 0;

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">
                            {title}
                        </p>
                        <p className="mt-1 text-2xl font-bold">{value}</p>
                        <div
                            className={`mt-1 flex items-center text-sm ${
                                isPositive ? 'text-green-600' : 'text-red-600'
                            }`}
                        >
                            {isPositive ? (
                                <TrendingUp className="mr-1 h-4 w-4" />
                            ) : (
                                <TrendingDown className="mr-1 h-4 w-4" />
                            )}
                            {Math.abs(trend)}% {trendLabel}
                        </div>
                    </div>
                    {icon}
                </div>
            </CardContent>
        </Card>
    );
}

// NUEVO: Componente para items de usuario
function UsuarioItem({
    nombre,
    tickets,
    rank,
}: {
    nombre: string;
    tickets: number;
    rank: number;
}) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-sm font-bold">
                    {rank}
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                        <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium">{nombre}</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className="font-bold">{tickets}</span>
                <span className="text-xs text-gray-500">tickets</span>
            </div>
        </div>
    );
}

function ZonaItem({
    nombre,
    tickets,
    tendencia,
    rank,
}: {
    nombre: string;
    tickets: number;
    tendencia: number;
    rank: number;
}) {
    const isPositive = tendencia >= 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-sm font-bold">
                    {rank}
                </div>
                <span className="font-medium">{nombre}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="font-bold">{tickets}</span>
                <div
                    className={`text-xs ${
                        isPositive ? 'text-red-600' : 'text-green-600'
                    }`}
                >
                    {isPositive ? '+' : ''}
                    {tendencia}%
                </div>
            </div>
        </div>
    );
}
