import {
    AlertTriangle,
    BarChart3,
    Calendar,
    Download,
    FileText,
    Filter,
    MapPin,
    Users,
} from 'lucide-react';
import { useState } from 'react';

// Interfaces
interface CustomReportProps {
    zones: Array<{ id: number; name: string }>;
    types: Array<{ id: number; name: string }>;
    priorities: Array<{ id: number; level: string }>;
    users: Array<{ id: number; name: string }>;
}

interface ReportData {
    totalTickets: number;
    activeTickets: number;
    resolvedTickets: number;
    averageResolutionTime: number;
    ticketsByPriority: { [key: string]: number };
    ticketsByZone: { [key: string]: number };
    ticketsByType: { [key: string]: number };
    detailedData: Array<{
        id: number;
        title: string;
        ticket: string;
        status: string;
        zone: string;
        type: string;
        priority: string;
        user: string;
        created_at: string;
        completed_at: string;
        resolution_time: string;
    }>;
}

interface Filters {
    startDate: string;
    endDate: string;
    zoneId: string;
    typeId: string;
    priorityId: string;
    userId: string;
}

// Componente principal
export default function CustomReport({
    zones,
    types,
    priorities,
    users,
}: CustomReportProps) {
    const [filters, setFilters] = useState<Filters>({
        startDate: '',
        endDate: '',
        zoneId: '',
        typeId: '',
        priorityId: '',
        userId: '',
    });

    const [reportData, setReportData] = useState<ReportData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFilterChange = (key: keyof Filters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const generateReport = async () => {
        setIsLoading(true);
        try {
            // Simulación de datos para prueba
            setTimeout(() => {
                const mockData: ReportData = {
                    totalTickets: 150,
                    activeTickets: 45,
                    resolvedTickets: 105,
                    averageResolutionTime: 24.5,
                    ticketsByPriority: {
                        Alta: 30,
                        Media: 75,
                        Baja: 45,
                    },
                    ticketsByZone: {
                        'Zona Norte': 50,
                        'Zona Sur': 40,
                        'Zona Este': 35,
                        'Zona Oeste': 25,
                    },
                    ticketsByType: {
                        Soporte: 60,
                        Mantenimiento: 45,
                        Incidente: 30,
                        Requerimiento: 15,
                    },
                    detailedData: [
                        {
                            id: 1,
                            title: 'Error en sistema',
                            ticket: 'TICK-001',
                            status: 'Activo',
                            zone: 'Zona Norte',
                            type: 'Incidente',
                            priority: 'Alta',
                            user: 'Juan Pérez',
                            created_at: '2024-01-15',
                            completed_at: '',
                            resolution_time: '0h',
                        },
                        {
                            id: 2,
                            title: 'Solicitud de mantenimiento',
                            ticket: 'TICK-002',
                            status: 'Resuelto',
                            zone: 'Zona Sur',
                            type: 'Mantenimiento',
                            priority: 'Media',
                            user: 'María García',
                            created_at: '2024-01-10',
                            completed_at: '2024-01-12',
                            resolution_time: '48h',
                        },
                    ],
                };
                setReportData(mockData);
                setIsLoading(false);
            }, 2000);
        } catch (error) {
            console.error('Error generando reporte:', error);
            setIsLoading(false);
        }
    };

    const exportReport = () => {
        alert(
            'Funcionalidad de exportación - Aquí iría la lógica para exportar',
        );
    };

    const clearFilters = () => {
        setFilters({
            startDate: '',
            endDate: '',
            zoneId: '',
            typeId: '',
            priorityId: '',
            userId: '',
        });
        setReportData(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <title>Reporte Personalizado</title>

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Reporte Personalizado
                    </h1>
                </div>

                {/* Filtros */}
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 p-6">
                        <h3 className="flex items-center gap-2 text-lg font-semibold">
                            <Filter className="h-5 w-5" />
                            Filtros del Reporte
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {/* Fecha Inicio */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Fecha Inicio
                                </label>
                                <input
                                    type="date"
                                    value={filters.startDate}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'startDate',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Fecha Fin */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Fecha Fin
                                </label>
                                <input
                                    type="date"
                                    value={filters.endDate}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'endDate',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Zona */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Zona
                                </label>
                                <select
                                    value={filters.zoneId}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'zoneId',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="">Todas las zonas</option>
                                    {zones.map((zone) => (
                                        <option
                                            key={zone.id}
                                            value={zone.id.toString()}
                                        >
                                            {zone.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Tipo */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Tipo
                                </label>
                                <select
                                    value={filters.typeId}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'typeId',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="">Todos los tipos</option>
                                    {types.map((type) => (
                                        <option
                                            key={type.id}
                                            value={type.id.toString()}
                                        >
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Prioridad */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Prioridad
                                </label>
                                <select
                                    value={filters.priorityId}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'priorityId',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="">
                                        Todas las prioridades
                                    </option>
                                    {priorities.map((priority) => (
                                        <option
                                            key={priority.id}
                                            value={priority.id.toString()}
                                        >
                                            {priority.level}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Usuario */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Usuario
                                </label>
                                <select
                                    value={filters.userId}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'userId',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="">Todos los usuarios</option>
                                    {users.map((user) => (
                                        <option
                                            key={user.id}
                                            value={user.id.toString()}
                                        >
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Botones de Acción */}
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={generateReport}
                                disabled={isLoading}
                                className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <BarChart3 className="h-4 w-4" />
                                {isLoading ? 'Generando...' : 'Generar Reporte'}
                            </button>
                            <button
                                onClick={exportReport}
                                className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={!reportData}
                            >
                                <Download className="h-4 w-4" />
                                Exportar a CSV
                            </button>
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
                            >
                                <Filter className="h-4 w-4" />
                                Limpiar Filtros
                            </button>
                        </div>
                    </div>
                </div>

                {/* Resultados del Reporte */}
                {reportData && (
                    <>
                        {/* Métricas Principales */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <MetricCard
                                title="Total Tickets"
                                value={reportData.totalTickets}
                                icon={
                                    <FileText className="h-6 w-6 text-blue-500" />
                                }
                            />
                            <MetricCard
                                title="Tickets Activos"
                                value={reportData.activeTickets}
                                icon={
                                    <AlertTriangle className="h-6 w-6 text-orange-500" />
                                }
                            />
                            <MetricCard
                                title="Tickets Resueltos"
                                value={reportData.resolvedTickets}
                                icon={
                                    <Users className="h-6 w-6 text-green-500" />
                                }
                            />
                            <MetricCard
                                title="Tiempo Promedio"
                                value={`${reportData.averageResolutionTime}h`}
                                icon={
                                    <Calendar className="h-6 w-6 text-purple-500" />
                                }
                            />
                        </div>

                        {/* Distribuciones */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <DistributionCard
                                title="Por Prioridad"
                                data={reportData.ticketsByPriority}
                                icon={<AlertTriangle className="h-5 w-5" />}
                            />
                            <DistributionCard
                                title="Por Zona"
                                data={reportData.ticketsByZone}
                                icon={<MapPin className="h-5 w-5" />}
                            />
                            <DistributionCard
                                title="Por Tipo"
                                data={reportData.ticketsByType}
                                icon={<FileText className="h-5 w-5" />}
                            />
                        </div>

                        {/* Tabla Detallada */}
                        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-200 p-6">
                                <h3 className="text-lg font-semibold">
                                    Detalle de Tickets
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="p-2 text-left">
                                                    Ticket
                                                </th>
                                                <th className="p-2 text-left">
                                                    Título
                                                </th>
                                                <th className="p-2 text-left">
                                                    Estado
                                                </th>
                                                <th className="p-2 text-left">
                                                    Zona
                                                </th>
                                                <th className="p-2 text-left">
                                                    Prioridad
                                                </th>
                                                <th className="p-2 text-left">
                                                    Usuario
                                                </th>
                                                <th className="p-2 text-left">
                                                    Tiempo
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportData.detailedData.map(
                                                (ticket) => (
                                                    <tr
                                                        key={ticket.id}
                                                        className="border-b hover:bg-gray-50"
                                                    >
                                                        <td className="p-2">
                                                            {ticket.ticket}
                                                        </td>
                                                        <td className="p-2">
                                                            {ticket.title}
                                                        </td>
                                                        <td className="p-2">
                                                            <span
                                                                className={`rounded px-2 py-1 text-xs ${
                                                                    ticket.status ===
                                                                    'Activo'
                                                                        ? 'bg-orange-100 text-orange-800'
                                                                        : 'bg-green-100 text-green-800'
                                                                }`}
                                                            >
                                                                {ticket.status}
                                                            </span>
                                                        </td>
                                                        <td className="p-2">
                                                            {ticket.zone}
                                                        </td>
                                                        <td className="p-2">
                                                            {ticket.priority}
                                                        </td>
                                                        <td className="p-2">
                                                            {ticket.user}
                                                        </td>
                                                        <td className="p-2">
                                                            {
                                                                ticket.resolution_time
                                                            }
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// Componente para métricas
function MetricCard({
    title,
    value,
    icon,
}: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
}) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">
                            {title}
                        </p>
                        <p className="mt-1 text-2xl font-bold">{value}</p>
                    </div>
                    {icon}
                </div>
            </div>
        </div>
    );
}

// Componente para distribuciones
function DistributionCard({
    title,
    data,
    icon,
}: {
    title: string;
    data: { [key: string]: number };
    icon: React.ReactNode;
}) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                    {icon}
                    {title}
                </h3>
            </div>
            <div className="p-6">
                <div className="space-y-2">
                    {Object.entries(data).map(([key, value]) => (
                        <div
                            key={key}
                            className="flex items-center justify-between"
                        >
                            <span className="text-sm">{key}</span>
                            <span className="font-bold">{value}</span>
                        </div>
                    ))}
                    {Object.keys(data).length === 0 && (
                        <div className="py-2 text-center text-gray-500">
                            No hay datos
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
