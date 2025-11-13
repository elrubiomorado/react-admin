import { Button } from '@/components/ui/button';
import { PauseIcon, PlayIcon, TrashIcon } from '@heroicons/react/24/solid';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

interface CronometroCardProps {
    cron: {
        id: number;
        title: string;
        ticket: string;
        created_at: string;
        status_id?: number;
        user?: { name: string };
        alarm_type?: string;
        location?: string;
    };
    onDelete: (id: number) => void;
}

interface EscalationRecord {
    timestamp: string;
    date_formatted: string;
    time_formatted: string;
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

    const [isPaused, setIsPaused] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState<
        'top' | 'bottom' | 'center-right' | 'center-left'
    >('center-right');
    const [escalationHistory, setEscalationHistory] = useState<
        EscalationRecord[]
    >([]);
    const cardRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // 🎨 Función para determinar el estado basado en el tiempo
    const getStatusId = (seconds: number): number => {
        if (seconds < 30) return 1;
        if (seconds < 45) return 2;
        return 3;
    };

    const [currentStatusId, setCurrentStatusId] = useState<number>(
        getStatusId(elapsedTime),
    );

    // use estate para el destello de la card
    const [isFlashing, setIsFlashing] = useState(false);
    const [previousStatusId, setPreviousStatusId] = useState<number>(
        cron.status_id || 1,
    );

    // Agrega este efecto después de tu efecto del cronómetro
    useEffect(() => {
        const statusChanged =
            (previousStatusId === 1 && currentStatusId === 2) || // Verde → Amarillo
            (previousStatusId === 2 && currentStatusId === 3); // Amarillo → Rojo

        if (statusChanged) {
            setIsFlashing(true);

            const timer = setTimeout(() => {
                setIsFlashing(false);
            }, 1000);

            setPreviousStatusId(currentStatusId);

            return () => clearTimeout(timer);
        }
    }, [currentStatusId]);

    // 🕒 Actualizar tiempo cada segundo (si no está pausado)
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setElapsedTime((prevTime) => {
                const newTime = prevTime + 1;
                const newStatusId = getStatusId(newTime);

                if (newStatusId !== currentStatusId) {
                    setCurrentStatusId(newStatusId);
                    router.patch(
                        `/cronometros/${cron.id}`,
                        { status_id: newStatusId },
                        {
                            preserveScroll: true,
                            preserveState: true,
                            replace: true,
                        },
                    );
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [cron.id, currentStatusId, isPaused]);

    // 🎯 Calcular posición inteligente del modal
    const calculateModalPosition = () => {
        if (!cardRef.current) return 'center-right';

        const cardRect = cardRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const modalWidth = 380;
        const modalHeight = 320;

        const viewportCenterX = viewportWidth / 2;
        const viewportCenterY = viewportHeight / 2;

        const cardCenterX = cardRect.left + cardRect.width / 2;

        if (cardCenterX < viewportCenterX) {
            if (cardRect.right + modalWidth <= viewportWidth - 20) {
                return 'center-right';
            } else {
                return cardRect.top > viewportCenterY ? 'top' : 'bottom';
            }
        } else {
            if (cardRect.left - modalWidth >= 20) {
                return 'center-left';
            } else {
                return cardRect.top > viewportCenterY ? 'top' : 'bottom';
            }
        }
    };

    // 🎯 Función para manejar el click en la card
    const handleCardClick = () => {
        const position = calculateModalPosition();
        setModalPosition(position);
        setIsModalOpen(true);
    };

    // ⏸️ Función para pausar/reanudar
    const handlePause = () => {
        setIsPaused(!isPaused);
    };

    // 🚨 Función para manejar el botón Escalar
    const handleEscalar = () => {
        const now = new Date();
        const newEscalation: EscalationRecord = {
            timestamp: now.toISOString(),
            date_formatted: now.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            time_formatted: now.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }),
        };

        setEscalationHistory((prev) => [...prev, newEscalation]);

        console.log('Escalación registrada:', newEscalation);

        if (currentStatusId !== 3) {
            setCurrentStatusId(3);
            router.patch(
                `/cronometros/${cron.id}`,
                { status_id: 3 },
                { preserveScroll: true, preserveState: true, replace: true },
            );
        }
    };

    // 🗑️ Función para manejar la eliminación desde el modal
    const handleDeleteFromModal = () => {
        onDelete(cron.id);
        setIsModalOpen(false);
    };

    // 🎨 Colores según estado actual
    const getColorClass = (statusId: number) => {
        switch (statusId) {
            case 1:
                return 'bg-green-100 border-green-400 text-green-900';
            case 2:
                return 'bg-yellow-100 border-yellow-400 text-yellow-900';
            case 3:
                return 'bg-red-100 border-red-400 text-red-900';
            default:
                return 'bg-gray-100 border-gray-400 text-gray-900';
        }
    };

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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusText = (statusId: number) => {
        switch (statusId) {
            case 1:
                return 'En Progreso';
            case 2:
                return 'Casi Listo';
            case 3:
                return 'Necesita Escalar';
            default:
                return 'Desconocido';
        }
    };

    // 🎯 Cerrar modal al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                cardRef.current &&
                !cardRef.current.contains(event.target as Node) &&
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                setIsModalOpen(false);
            }
        };

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
                document.removeEventListener('keydown', handleEscapeKey);
            };
        }
    }, [isModalOpen]);

    // 🎯 Clases de posición para el modal
    const getModalPositionClass = () => {
        switch (modalPosition) {
            case 'center-right':
                return 'left-full top-0 ml-4';
            case 'center-left':
                return 'right-full top-0 mr-4';
            case 'bottom':
                return 'top-full left-1/2 -translate-x-1/2 mt-4';
            case 'top':
                return 'bottom-full left-1/2 -translate-x-1/2 mb-4';
            default:
                return 'left-full top-0 ml-4';
        }
    };

    return (
        <div ref={cardRef} className="relative mx-2 my-2">
            {/*--------- Card Principal - ----- */}

            <div
                onClick={handleCardClick}
                className={`flex w-44 cursor-pointer flex-col justify-between rounded-md border-2 p-3 shadow-sm transition-all duration-300 hover:shadow-md ${getColorClass(currentStatusId)} ${
                    isFlashing ? 'ring-opacity-70 animate-pulse ring-2' : ''
                } ${
                    currentStatusId === 1
                        ? 'ring-green-400'
                        : currentStatusId === 2
                          ? 'ring-yellow-400'
                          : 'ring-red-400'
                }`}
            >
                <div className="mb-2 flex items-start justify-between">
                    <div
                        className={`rounded-full px-2 py-1 text-xs font-bold ${
                            currentStatusId === 1
                                ? 'bg-green-200'
                                : currentStatusId === 2
                                  ? 'bg-yellow-200'
                                  : 'bg-red-200'
                        }`}
                    >
                        {getStatusText(currentStatusId)}
                    </div>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(cron.id);
                        }}
                        className="h-6 w-6 text-gray-500 hover:bg-red-50 hover:text-red-600"
                    >
                        <TrashIcon className="h-3 w-3" />
                    </Button>
                </div>

                <div className="space-y-2 text-center">
                    <div
                        className="truncate text-sm font-semibold"
                        title={cron.title}
                    >
                        {cron.title}
                    </div>
                    <div className="font-mono text-xl leading-tight font-bold">
                        {formatTime(elapsedTime)}
                    </div>
                    <div
                        className="truncate text-xs opacity-75"
                        title={cron.ticket}
                    >
                        Ticket: {cron.ticket}
                    </div>
                    <div className="text-[11px] opacity-60">
                        {cron.user?.name || 'Sin asignar'}
                    </div>
                </div>
            </div>
            {/* -------------------------------Aquí inicial el código del Modal - ----------------------------------*/}
            {isModalOpen && (
                <div
                    ref={modalRef}
                    className="absolute top-1/2 z-50 ml-4 w-80 -translate-y-1/2 rounded-lg border border-gray-200 bg-white shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        left: '100%',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                    }}
                >
                    {/* ----- Header del Modal ----*/}
                    <div
                        className={`flex items-center justify-between rounded-t-lg p-4 ${
                            currentStatusId === 1
                                ? 'bg-green-100'
                                : currentStatusId === 2
                                  ? 'bg-yellow-100'
                                  : 'bg-red-100'
                        }`}
                    >
                        <h2
                            className={`text-lg font-bold ${
                                currentStatusId === 1
                                    ? 'text-green-900'
                                    : currentStatusId === 2
                                      ? 'text-yellow-900'
                                      : 'text-red-900'
                            }`}
                        >
                            {cron.title}
                        </h2>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setIsModalOpen(false)}
                            className={`h-6 w-6 ${
                                currentStatusId === 1
                                    ? 'text-green-700 hover:bg-green-200 hover:text-green-900'
                                    : currentStatusId === 2
                                      ? 'text-yellow-700 hover:bg-yellow-200 hover:text-yellow-900'
                                      : 'text-red-700 hover:bg-red-200 hover:text-red-900'
                            }`}
                        >
                            ✕
                        </Button>
                    </div>

                    {/* ----- Cuerpo del Modal ------ */}
                    <div
                        className={`rounded-b-lg p-4 ${
                            currentStatusId === 1
                                ? 'bg-green-50'
                                : currentStatusId === 2
                                  ? 'bg-yellow-50'
                                  : 'bg-red-50'
                        }`}
                    >
                        {/* Información de la alarma */}
                        <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <span className="font-medium text-gray-700">
                                    Ticket:
                                </span>
                                <span className="ml-1 block font-mono text-gray-800">
                                    {cron.ticket}
                                </span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">
                                    Tipo de alarma:
                                </span>
                                <span className="ml-1 block text-gray-800">
                                    {cron.alarm_type || 'No asignado'}
                                </span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">
                                    Lugar:
                                </span>
                                <span className="ml-1 block text-gray-800">
                                    {cron.location || 'No asignado'}
                                </span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">
                                    Usuario:
                                </span>
                                <span className="ml-1 block text-gray-800">
                                    {cron.user?.name}
                                </span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">
                                    Inicio:
                                </span>
                                <span className="ml-1 block text-gray-800">
                                    {formatDate(cron.created_at)}
                                </span>
                            </div>
                        </div>
                        {/* Línea divisoria  */}
                        <div
                            className={`mb-4 border-t ${
                                currentStatusId === 1
                                    ? 'border-green-200'
                                    : currentStatusId === 2
                                      ? 'border-yellow-200'
                                      : 'border-red-200'
                            }`}
                        ></div>
                        {/* Tiempo transcurrido */}
                        <div className="mb-6 text-center">
                            <div className="mb-1 text-sm font-medium text-gray-700">
                                Tiempo Transcurrido
                            </div>
                            <div className="font-mono text-2xl font-bold text-gray-800">
                                {formatTime(elapsedTime)}
                            </div>
                        </div>
                        {/* Línea divisoria sutil */}
                        <div
                            className={`mb-4 border-t ${
                                currentStatusId === 1
                                    ? 'border-green-200'
                                    : currentStatusId === 2
                                      ? 'border-yellow-200'
                                      : 'border-red-200'
                            }`}
                        ></div>
                        {/* ----- Historial de Escalaciones ----*/}
                        <div className="mb-4">
                            <h3 className="mb-2 text-sm font-medium text-gray-700">
                                Historial de Escalaciones
                            </h3>
                            {escalationHistory.length > 0 ? (
                                <div className="max-h-32 space-y-2 overflow-y-auto">
                                    {escalationHistory.map((record, index) => (
                                        <div
                                            key={index}
                                            className={`rounded px-3 py-2 text-xs ${
                                                currentStatusId === 1
                                                    ? 'border border-green-300 bg-green-100'
                                                    : currentStatusId === 2
                                                      ? 'border border-yellow-300 bg-yellow-100'
                                                      : 'border border-red-300 bg-red-100'
                                            }`}
                                        >
                                            <div className="font-medium text-gray-800">
                                                Escalación #{index + 1}
                                            </div>
                                            <div className="text-gray-600">
                                                {record.date_formatted} -{' '}
                                                {record.time_formatted}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-4 text-center text-sm text-gray-500">
                                    No hay escalaciones registradas
                                </div>
                            )}
                        </div>
                        {/* ----- Footer con botones - ------ */}
                        <div className="flex items-center justify-between gap-2">
                            {/* Botón Escalar - Izquierda */}
                            <Button
                                onClick={handleEscalar}
                                className="bg-blue-500 px-3 py-1 text-xs font-medium text-white transition-transform hover:scale-105 hover:bg-blue-400"
                                size="sm"
                            >
                                ⚠️ Escalar
                            </Button>

                            {/* Botones circulares - Derecha */}
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={handlePause}
                                    className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-500 p-0 text-white transition-transform hover:scale-105 hover:bg-gray-400"
                                    size="sm"
                                >
                                    {isPaused ? (
                                        <PlayIcon className="h-3 w-3" />
                                    ) : (
                                        <PauseIcon className="h-3 w-3" />
                                    )}
                                </Button>

                                <Button
                                    variant="destructive"
                                    onClick={handleDeleteFromModal}
                                    className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-500 p-0 transition-transform hover:scale-105"
                                    size="sm"
                                >
                                    <TrashIcon className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                        {/**----aqui termina el codigo de los botones---*/}
                    </div>
                </div>
            )}
            {/** -------------Aquí termina el código de la tarjeta modal---------------------*/}
        </div>
    );
}
