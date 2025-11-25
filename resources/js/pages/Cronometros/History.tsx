import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ArrowLeftIcon, DownloadIcon } from 'lucide-react';

interface HistoryProps {
    cronometros: any[];
}

export default function History({ cronometros }: HistoryProps) {
    const handleExportExcel = () => {
        window.open('/cronometros/export-history', '_blank');
    };

    const breadcrumbs: BreadcrumbItem[] = [
        // ← Usar el tipo correcto
        { title: 'Cronómetros', href: '/cronometros' },
        { title: 'Historial', href: '/cronometros/history' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Historial de Cronómetros" />

            {/* Header como parte del contenido */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.get('/cronometros')}
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                    </Button>
                    <h2 className="text-xl font-semibold">
                        Historial de Cronómetros Terminados
                    </h2>
                </div>
                <Button
                    onClick={handleExportExcel}
                    size="icon"
                    className="absolute top-4 right-6 h-10 w-10 rounded-full bg-blue-500 shadow-md transition-all duration-200 hover:bg-blue-600"
                    title="Exportar a Excel"
                >
                    <DownloadIcon className="h-4 w-4" />
                </Button>
            </div>

            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="p-6">
                    {cronometros.length > 0 ? (
                        <div className="space-y-4">
                            {cronometros.map((cron) => (
                                <div
                                    key={cron.id}
                                    className="rounded-lg border border-gray-200 p-4"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold">
                                                {cron.title}
                                            </h3>
                                            <p className="text-gray-600">
                                                Ticket: {cron.ticket}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Lugar: {cron.place?.name} -{' '}
                                                {cron.place?.state?.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Terminado:{' '}
                                                {new Date(
                                                    cron.end,
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="inline-block rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                                                Terminado
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-8 text-center text-gray-500">
                            No hay cronómetros terminados en el historial.
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
