import { Button } from '@/components/ui/button';
import { TrashIcon } from '@heroicons/react/24/solid';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface CronometroCardProps {
    cron: {
        id: number;
        title: string;
        ticket: string;
        created_at: string;
        status_id?: number;
        user?: { name: string };
    };
    onDelete: (id: number) => void;
}

export default function CronometroCard({
    cron,
    onDelete,
}: CronometroCardProps) {
    const [elapsedTime, setElapsedTime] = useState(() => {
        const start = new Date(cron.created_at).getTime();
        const now = Date.now();
        return Math.floor((now - start) / 1000);
    });

    const [statusId, setStatusId] = useState<number>(cron.status_id || 1);

    useEffect(() => {
        const interval = setInterval(() => setElapsedTime((t) => t + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let nuevoStatusId = statusId;

        // Transiciones en función del tiempo transcurrido
        if (elapsedTime < 30) {
            nuevoStatusId = 1; // in_progress
        } else if (elapsedTime < 45) {
            nuevoStatusId = 2; // almost
        } else if (elapsedTime < 90) {
            nuevoStatusId = 3; // escale1
        } else if (elapsedTime < 105) {
            nuevoStatusId = 4; // almost2
        } else if (elapsedTime < 120) {
            nuevoStatusId = 5; // escale2
        }

        // Permitir volver a in_progress desde cualquier estado escalado
        if (nuevoStatusId === 3 || nuevoStatusId === 5) {
            // Si está en escalado, y el usuario decide volver a in_progress
            if (statusId === 1) {
                nuevoStatusId = 1; // in_progress
            }
        }

        // Actualizar el estado si ha cambiado
        if (nuevoStatusId !== statusId) {
            setStatusId(nuevoStatusId);

            router.patch(
                `/cronometros/${cron.id}`,
                { status_id: nuevoStatusId },
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                },
            );
        }
    }, [elapsedTime, statusId]); // Dependiendo de `elapsedTime` y `statusId`

    const colorClass =
        statusId === 1
            ? 'bg-green-100 border-green-400'
            : statusId === 2
              ? 'bg-yellow-100 border-yellow-400'
              : 'bg-red-100 border-red-400';

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600)
            .toString()
            .padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60)
            .toString()
            .padStart(2, '0');
        const s = Math.floor(seconds % 60)
            .toString()
            .padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    return (
        <>
            {statusId !== 1 && (
                <div
                    className={`flex w-44 flex-col justify-between rounded-md border p-3 text-gray-900 shadow-sm transition-colors duration-500 ${colorClass}`}
                >
                    <div className="flex justify-end">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => onDelete(cron.id)}
                            className="h-5 w-5 text-gray-500 hover:text-red-600"
                        >
                            <TrashIcon className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="space-y-0.5 text-center">
                        <div className="truncate text-sm font-semibold">
                            {cron.title}
                        </div>
                        <div className="font-mono text-xl leading-tight font-bold">
                            {formatTime(elapsedTime)}
                        </div>
                        <div className="truncate text-xs text-gray-700">
                            {cron.ticket}
                        </div>
                        <div className="text-[11px] text-gray-500">
                            {cron.user?.name || 'N/A'}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
