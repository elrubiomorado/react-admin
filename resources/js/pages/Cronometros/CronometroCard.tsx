import { Button } from '@/components/ui/button';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

interface CronometroCardProps {
    cron: any;
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

    useEffect(() => {
        const interval = setInterval(() => setElapsedTime((t) => t + 1), 1000);
        return () => clearInterval(interval);
    }, []);

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
        <div className="flex w-44 flex-col justify-between rounded-md border bg-gray-100 p-3 text-gray-900 shadow-sm">
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
    );
}
