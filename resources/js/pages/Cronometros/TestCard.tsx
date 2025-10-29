//Eliminar todo lo del Test card solo es paa poner como quedaria el index de cronometros pero sin borrar el original



import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    PlayIcon,
    PauseIcon,
    StopIcon,
    PlusIcon,
    TrashIcon,
    ClockIcon,
    BellAlertIcon,
    UserCircleIcon,
} from '@heroicons/react/24/solid';
import { Head, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

interface Usuario {
    id: number;
    name: string;
    email: string;
}

interface Cronometro {
    id: number;
    titulo: string;
    hora_inicio: string;
    hora_final: string | null;
    tiempo_pausado: number;
    estado: 'activo' | 'pausado' | 'detenido';
    creado_por: number;
    created_at: string;
    updated_at: string;
    usuario: Usuario;
}

interface CronometroConTiempo extends Cronometro {
    tiempoTranscurrido: number;
    tiempoActivo: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Cronómetros', href: '/cronometros' },
];

const HORAS_ALERTA = [4, 6, 8];
const MENSAJE_ALERTA = '¡Hora de escalar!';
const MODO_PRUEBA = false;
const configuracionPrueba = {
    segundosAlerta: [5, 10, 15],
    mensajeAlerta: '[PRUEBA] ¡Hora de escalar!'
};

export default function Index({ cronometros: initialCronometros }: { cronometros: Cronometro[] }) {
    const [cronometros, setCronometros] = useState<CronometroConTiempo[]>([]);
    const [nuevoTitulo, setNuevoTitulo] = useState('');
    const [mostrarForm, setMostrarForm] = useState(false);
    const [permisoNotificaciones, setPermisoNotificaciones] = useState<string>('default');
    const [debugLog, setDebugLog] = useState<string[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const notificacionesMostradas = useRef<Set<number>>(new Set());

    const configuracionActual = MODO_PRUEBA ? {
        tipo: 'segundos',
        valores: configuracionPrueba.segundosAlerta,
        mensaje: configuracionPrueba.mensajeAlerta,
        unidad: 's'
    } : {
        tipo: 'horas',
        valores: HORAS_ALERTA,
        mensaje: MENSAJE_ALERTA,
        unidad: 'h'
    };

    const agregarDebug = (mensaje: string) => {
        if (MODO_PRUEBA) {
            console.log(`[DEBUG] ${mensaje}`);
            setDebugLog(prev => [...prev.slice(-9), `${new Date().toLocaleTimeString()}: ${mensaje}`]);
        }
    };

    useEffect(() => {
        if ('Notification' in window) {
            setPermisoNotificaciones(Notification.permission);
            agregarDebug(`Permiso inicial: ${Notification.permission}`);
        } else {
            agregarDebug('Notificaciones NO soportadas en este navegador');
        }
    }, []);

    useEffect(() => {
        const sincronizar = () => {
            setCronometros(prev => prev.map(cron => {
                if (cron.estado === 'activo') {
                    const ahora = new Date().getTime();
                    const inicio = new Date(cron.hora_inicio).getTime();
                    const tiempoTranscurrido = ahora - inicio - cron.tiempo_pausado;
                    return { ...cron, tiempoTranscurrido, tiempoActivo: tiempoTranscurrido - cron.tiempo_pausado };
                }
                return cron;
            }));
        };
        intervalRef.current = setInterval(sincronizar, 1000);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, []);

    useEffect(() => {
        const ahora = new Date().getTime();
        const cronometrosConTiempo = initialCronometros.map(cron => {
            if (cron.estado === 'activo' && cron.hora_inicio) {
                const inicio = new Date(cron.hora_inicio).getTime();
                const tiempoTranscurrido = ahora - inicio - cron.tiempo_pausado;
                return { ...cron, tiempoTranscurrido, tiempoActivo: tiempoTranscurrido - cron.tiempo_pausado };
            }
            return { ...cron, tiempoTranscurrido: 0, tiempoActivo: 0 };
        });
        setCronometros(cronometrosConTiempo);
        agregarDebug(`Cronómetros cargados: ${cronometrosConTiempo.length}`);
    }, [initialCronometros]);

    const formatearTiempo = (milisegundos: number) => {
        const segundos = Math.floor(milisegundos / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        return `${horas.toString().padStart(2,'0')}:${(minutos%60).toString().padStart(2,'0')}:${(segundos%60).toString().padStart(2,'0')}`;
    };

    const toggleEstado = (id: number) => {
        setCronometros(prev => prev.map(c => c.id === id
            ? { ...c, estado: c.estado === 'activo' ? 'pausado' : 'activo' }
            : c
        ));
    };

    const eliminarCronometro = (id: number) => {
        if (confirm('¿Estás seguro de eliminar este cronómetro?')) {
            router.delete(`/cronometros/${id}`, { onSuccess: () => router.reload() });
        }
    };

    const escalarCronometro = (id: number) => {
        alert(`Escalando cronómetro ${id}`);
        // Aquí puedes llamar a tu endpoint PUT para marcarlo como escalado
    };

    const getColorTarjeta = (cron: CronometroConTiempo) => {
        if (cron.estado === 'pausado') return 'bg-blue-200';
        const horas = cron.tiempoTranscurrido / (1000*60*60);
        if (horas < 3.75) return 'bg-green-200';
        if (horas < 4) return 'bg-orange-300';
        return 'bg-red-400';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cronómetros Tarjetas" />

            <div className="flex flex-col gap-6 p-6">
                {/* Header y botones */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Cronómetros</h1>
                    <Button onClick={() => setMostrarForm(!mostrarForm)}>Nuevo Cronómetro</Button>
                </div>

                {mostrarForm && (
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow">
                        <input
                            type="text"
                            placeholder="Título del cronómetro"
                            value={nuevoTitulo}
                            onChange={e => setNuevoTitulo(e.target.value)}
                            className="border rounded px-3 py-2 mr-2"
                        />
                        <Button onClick={() => router.post('/cronometros', { titulo: nuevoTitulo })}>Crear</Button>
                    </div>
                )}

                {/* Grid de tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cronometros.map(cron => (
                        <div key={cron.id} className={`rounded-2xl shadow-lg p-5 text-center text-gray-800 relative transition-all duration-500 ${getColorTarjeta(cron)}`}>
                            <div className="absolute top-2 right-2 flex gap-2">
                                <Button size="sm" onClick={() => eliminarCronometro(cron.id)} className="text-red-600"><TrashIcon className="h-4 w-4"/></Button>
                            </div>
                            <h2 className="text-xl font-bold">{cron.titulo}</h2>
                            <div className="flex justify-center gap-4 mt-2 text-sm text-gray-700">
                                <div className="flex items-center gap-1"><ClockIcon className="h-4 w-4"/> {formatearTiempo(cron.tiempoTranscurrido)}</div>
                                <div className="flex items-center gap-1"><UserCircleIcon className="h-4 w-4"/> {cron.usuario.name}</div>
                            </div>
                            <p className="mt-2 font-semibold uppercase">{cron.estado === 'activo' ? 'En proceso' : 'En espera'}</p>
                            <p className="text-xs mt-1 text-gray-700">Próxima escalación: 4h</p>

                            <div className="mt-4 flex flex-col gap-2 items-center">
                                <Button onClick={() => toggleEstado(cron.id)} className={`px-4 py-2 rounded-lg text-white font-semibold ${cron.estado==='activo' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
                                    {cron.estado==='activo' ? 'Poner en espera' : 'Poner en proceso'}
                                </Button>
                                <Button onClick={() => escalarCronometro(cron.id)} className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold">Escalar</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
