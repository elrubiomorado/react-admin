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

// CONFIGURACIÓN NORMAL (PARA PRODUCCIÓN)
const HORAS_ALERTA = [4, 6, 8];
const MENSAJE_ALERTA = '¡Hora de escalar!';

// CONFIGURACIÓN DE PRUEBA (CAMBIAR A false PARA PRODUCCIÓN)
const MODO_PRUEBA = false;

const configuracionPrueba = {
    segundosAlerta: [5, 10, 15],
    mensajeAlerta: '[PRUEBA] ¡Hora de escalar!'
};

export default function Index({
    cronometros: initialCronometros,
}: {
    cronometros: Cronometro[];
}) {
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
            console.log([DEBUG] ${mensaje});
            setDebugLog(prev => [...prev.slice(-9), ${new Date().toLocaleTimeString()}: ${mensaje}]);
        }
    };

    useEffect(() => {
        if ('Notification' in window) {
            setPermisoNotificaciones(Notification.permission);
            agregarDebug(Permiso inicial: ${Notification.permission});
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

                    return {
                        ...cron,
                        tiempoTranscurrido,
                        tiempoActivo: tiempoTranscurrido - cron.tiempo_pausado
                    };
                }
                return cron;
            }));
        };

        intervalRef.current = setInterval(sincronizar, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const verificarNotificaciones = () => {
            cronometros.forEach(cron => {
                if (cron.estado === 'activo') {
                    let tiempoActual: number;
                    let key: number;

                    if (MODO_PRUEBA) {
                        tiempoActual = Math.floor(cron.tiempoTranscurrido / 1000);
                        key = cron.id * 100 + tiempoActual;
                    } else {
                        tiempoActual = Math.floor(cron.tiempoTranscurrido / (1000 * 60 * 60));
                        key = cron.id * 100 + tiempoActual;
                    }

                    if (configuracionActual.valores.includes(tiempoActual) && !notificacionesMostradas.current.has(key)) {
                        const unidad = MODO_PRUEBA ? 'segundos' : 'horas';
                        agregarDebug(⏰ Alerta disparada: ${cron.titulo} a ${tiempoActual} ${unidad});

                        mostrarNotificacion(
                            MODO_PRUEBA ? [PRUEBA] Cronómetro: ${cron.titulo} : Cronómetro: ${cron.titulo},
                            Ha alcanzado ${tiempoActual} ${configuracionActual.unidad} - ${configuracionActual.mensaje}
                        );
                        notificacionesMostradas.current.add(key);
                    }

                    if (MODO_PRUEBA && tiempoActual % 5 === 0 && !notificacionesMostradas.current.has(tiempoActual + 1000)) {
                        agregarDebug(Tiempo actual: ${cron.titulo} - ${tiempoActual}s);
                        notificacionesMostradas.current.add(tiempoActual + 1000);
                    }
                }
            });
        };

        const notificacionInterval = setInterval(verificarNotificaciones, 1000);

        return () => {
            clearInterval(notificacionInterval);
        };
    }, [cronometros, MODO_PRUEBA]);

    useEffect(() => {
        const ahora = new Date().getTime();

        const cronometrosConTiempo = initialCronometros.map(cron => {
            if (cron.estado === 'activo' && cron.hora_inicio) {
                const inicio = new Date(cron.hora_inicio).getTime();
                const tiempoTranscurrido = ahora - inicio - cron.tiempo_pausado;

                return {
                    ...cron,
                    tiempoTranscurrido,
                    tiempoActivo: tiempoTranscurrido - cron.tiempo_pausado
                };
            }

            return {
                ...cron,
                tiempoTranscurrido: 0,
                tiempoActivo: 0
            };
        });

        setCronometros(cronometrosConTiempo);
        agregarDebug(Cronómetros cargados: ${cronometrosConTiempo.length});
    }, [initialCronometros]);

    const mostrarNotificacion = (titulo: string, mensaje: string) => {
        agregarDebug(Intentando mostrar: ${titulo});

        if ('Notification' in window && Notification.permission === 'granted') {
            agregarDebug('Creando notificación del navegador');
            const notificacion = new Notification(titulo, {
                body: mensaje,
                icon: '/favicon.ico',
                badge: '/favicon.ico',
                tag: 'cronometro-alerta',
                requireInteraction: true
            });

            notificacion.onclick = () => {
                window.focus();
                notificacion.close();
            };

            setTimeout(() => {
                notificacion.close();
            }, 10000);

        } else if ('Notification' in window && Notification.permission !== 'granted') {
            agregarDebug('Usando alert() como fallback');
            alert(🔔 ${titulo}\n${mensaje});
        } else {
            agregarDebug('Usando alert() - Notificaciones no soportadas');
            alert(🔔 ${titulo}\n${mensaje});
        }

        mostrarAlertaEnPagina(titulo, mensaje);
    };

    const mostrarAlertaEnPagina = (titulo: string, mensaje: string) => {
        const alerta = document.createElement('div');
        alerta.className = 'fixed top-4 right-4 bg-yellow-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm';
        alerta.innerHTML = `
            <div class="flex items-center gap-2">
                <BellAlertIcon class="h-6 w-6" />
                <strong>${titulo}</strong>
            </div>
            <div class="mt-2">${mensaje}</div>
            <button onclick="this.parentElement.remove()" class="absolute top-2 right-2 text-white">×</button>
        `;

        document.body.appendChild(alerta);

        setTimeout(() => {
            if (alerta.parentElement) {
                alerta.remove();
            }
        }, 5000);
    };

    const solicitarPermisoNotificaciones = async () => {
        if (!('Notification' in window)) {
            alert('Tu navegador no soporta notificaciones');
            return;
        }

        try {
            const permiso = await Notification.requestPermission();
            setPermisoNotificaciones(permiso);
            agregarDebug(Permiso actualizado: ${permiso});

            if (permiso === 'granted') {
                alert('✅ Notificaciones permitidas. Recibirás alertas visuales y de sonido.');
                mostrarNotificacion(
                    'Prueba de Notificaciones',
                    '¡Las notificaciones están funcionando correctamente!'
                );
            } else if (permiso === 'denied') {
                alert('❌ Notificaciones bloqueadas. Usa alertas de navegador.');
            }
        } catch (error) {
            agregarDebug(Error al solicitar permiso: ${error});
        }
    };

    const crearCronometro = () => {
        if (!nuevoTitulo.trim()) return;

        router.post('/cronometros', {
            titulo: nuevoTitulo
        }, {
            onSuccess: () => {
                setNuevoTitulo('');
                setMostrarForm(false);
                router.reload();
            }
        });
    };

    const iniciarCronometro = (id: number) => {
        agregarDebug(Iniciando cronómetro ${id});
        router.put(/cronometros/${id}/iniciar, {}, {
            onSuccess: () => router.reload()
        });
    };

    const pausarCronometro = (id: number) => {
        router.put(/cronometros/${id}/pausar, {}, {
            onSuccess: () => router.reload()
        });
    };

    const detenerCronometro = (id: number) => {
        router.put(/cronometros/${id}/detener, {}, {
            onSuccess: () => router.reload()
        });
    };

    const eliminarCronometro = (id: number) => {
        if (confirm('¿Estás seguro de eliminar este cronómetro?')) {
            router.delete(/cronometros/${id}, {
                onSuccess: () => router.reload()
            });
        }
    };

    const formatearTiempo = (milisegundos: number) => {
        const segundos = Math.floor(milisegundos / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);

        return ${horas.toString().padStart(2, '0')}:${(minutos % 60).toString().padStart(2, '0')}:${(segundos % 60).toString().padStart(2, '0')};
    };

    const probarNotificacionManual = () => {
        mostrarNotificacion(
            'Prueba de Notificación',
            'Esta es una notificación de prueba para verificar el funcionamiento.'
        );
    };

    const getTextoConfiguracion = () => {
        if (MODO_PRUEBA) {
            return Alertas de prueba a los: ${configuracionPrueba.segundosAlerta.join(', ')} segundos;
        } else {
            return Alertas configuradas a las: ${HORAS_ALERTA.join(', ')} horas;
        }
    };

    // Función para obtener las iniciales del usuario
    const getInicialesUsuario = (nombre: string) => {
        return nombre
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cronómetros Sincronizados" />

            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Cronómetros Sincronizados
                            {MODO_PRUEBA && <span className="ml-2 text-sm bg-yellow-500 text-white px-2 py-1 rounded">MODO PRUEBA</span>}
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                            {getTextoConfiguracion()}
                        </p>
                        <p className="text-xs text-gray-500">
                            Permiso de notificaciones:
                            <span className={`ml-1 ${
                                permisoNotificaciones === 'granted' ? 'text-green-600' :
                                permisoNotificaciones === 'denied' ? 'text-red-600' : 'text-yellow-600'
                            }`}>
                                {permisoNotificaciones === 'granted' ? '✅ Permitido' :
                                 permisoNotificaciones === 'denied' ? '❌ Bloqueado' : '⏳ Pendiente'}
                            </span>
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={solicitarPermisoNotificaciones}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <BellAlertIcon className="h-4 w-4" />
                            {permisoNotificaciones === 'granted' ? 'Permitido' : 'Permitir Notificaciones'}
                        </Button>
                        <Button
                            onClick={probarNotificacionManual}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <BellAlertIcon className="h-4 w-4" />
                            Probar Notificación
                        </Button>
                        <Button
                            onClick={() => setMostrarForm(!mostrarForm)}
                            className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
                        >
                            <PlusIcon className="h-5 w-5" />
                            Nuevo Cronómetro
                        </Button>
                    </div>
                </div>

                {/* Debug Panel (solo en modo prueba) */}
                {MODO_PRUEBA && (
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-yellow-800">Debug Console (Modo Prueba)</h3>
                            <Button
                                onClick={() => setDebugLog([])}
                                size="sm"
                                variant="outline"
                            >
                                Limpiar
                            </Button>
                        </div>
                        <div className="bg-black text-green-400 p-3 rounded text-xs font-mono h-32 overflow-y-auto">
                            {debugLog.length === 0 ? (
                                <div>Esperando eventos... Crea un cronómetro y inícialo para ver el debug.</div>
                            ) : (
                                debugLog.map((log, index) => (
                                    <div key={index}>{log}</div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* Formulario para nuevo cronómetro */}
                {mostrarForm && (
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow">
                        <h3 className="text-lg font-semibold mb-3">
                            {MODO_PRUEBA ? 'Crear Cronómetro de Prueba' : 'Crear Nuevo Cronómetro'}
                        </h3>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Título del cronómetro"
                                value={nuevoTitulo}
                                onChange={(e) => setNuevoTitulo(e.target.value)}
                                className="flex-1 border rounded px-3 py-2"
                                onKeyPress={(e) => e.key === 'Enter' && crearCronometro()}
                            />
                            <Button
                                onClick={crearCronometro}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                Crear
                            </Button>
                            <Button
                                onClick={() => setMostrarForm(false)}
                                variant="outline"
                            >
                                Cancelar
                            </Button>
                        </div>
                        {MODO_PRUEBA ? (
                            <p className="text-sm text-yellow-600 mt-2">
                                💡 Las alertas se activarán a los {configuracionPrueba.segundosAlerta.join(', ')} segundos
                            </p>
                        ) : (
                            <p className="text-sm text-blue-600 mt-2">
                                💡 Las alertas se activarán a las {HORAS_ALERTA.join(', ')} horas
                            </p>
                        )}
                    </div>
                )}

                {/* Grid de cronómetros */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cronometros.map((cronometro) => (
                        <div
                            key={cronometro.id}
                            className="bg-white rounded-lg border border-gray-200 shadow p-4"
                        >
                            {/* Header con título y usuario */}
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                        {cronometro.titulo}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <UserCircleIcon className="h-4 w-4" />
                                        <span>Creado por: {cronometro.usuario.name}</span>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => eliminarCronometro(cronometro.id)}
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-800 flex-shrink-0"
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Display del tiempo */}
                            <div className="text-center mb-4">
                                <div className="text-3xl font-mono font-bold text-gray-900">
                                    {formatearTiempo(cronometro.tiempoTranscurrido)}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                    {MODO_PRUEBA && (
                                        <div>Segundos: {Math.floor(cronometro.tiempoTranscurrido / 1000)}</div>
                                    )}
                                    {cronometro.estado === 'activo' && '⏵ En ejecución'}
                                    {cronometro.estado === 'pausado' && '⏸ Pausado'}
                                    {cronometro.estado === 'detenido' && '⏹ Detenido'}
                                </div>
                            </div>

                            {/* Controles */}
                            <div className="flex justify-center gap-2">
                                {cronometro.estado !== 'activo' && (
                                    <Button
                                        onClick={() => iniciarCronometro(cronometro.id)}
                                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                                        size="sm"
                                    >
                                        <PlayIcon className="h-4 w-4" />
                                        Iniciar
                                    </Button>
                                )}

                                {cronometro.estado === 'activo' && (
                                    <Button
                                        onClick={() => pausarCronometro(cronometro.id)}
                                        className="flex items-center gap-1 bg-yellow-600 hover:bg-yellow-700"
                                        size="sm"
                                    >
                                        <PauseIcon className="h-4 w-4" />
                                        Pausar
                                    </Button>
                                )}

                                {cronometro.estado !== 'detenido' && (
                                    <Button
                                        onClick={() => detenerCronometro(cronometro.id)}
                                        className="flex items-center gap-1 bg-red-600 hover:bg-red-700"
                                        size="sm"
                                    >
                                        <StopIcon className="h-4 w-4" />
                                        Detener
                                    </Button>
                                )}
                            </div>

                            {/* Información adicional */}
                            <div className="mt-3 text-xs text-gray-500 space-y-1">
                                <div className="flex justify-between">
                                    <span>Creado:</span>
                                    <span>{new Date(cronometro.created_at).toLocaleDateString()}</span>
                                </div>
                                {cronometro.hora_inicio && (
                                    <div className="flex justify-between">
                                        <span>Iniciado:</span>
                                        <span>{new Date(cronometro.hora_inicio).toLocaleString()}</span>
                                    </div>
                                )}
                                {cronometro.hora_final && (
                                    <div className="flex justify-between">
                                        <span>Finalizado:</span>
                                        <span>{new Date(cronometro.hora_final).toLocaleString()}</span>
                                    </div>
                                )}
                            </div>

                            {/* Indicadores de alertas */}
                            {cronometro.estado === 'activo' && (
                                <div className="mt-3">
                                    <p className="text-xs text-gray-500 mb-2">Próximas alertas:</p>
                                    <div className="flex justify-between text-xs">
                                        {configuracionActual.valores.map((valor) => {
                                            const tiempoActual = MODO_PRUEBA
                                                ? Math.floor(cronometro.tiempoTranscurrido / 1000)
                                                : Math.floor(cronometro.tiempoTranscurrido / (1000 * 60 * 60));
                                            const alcanzado = tiempoActual >= valor;

                                            return (
                                                <div
                                                    key={valor}
                                                    className={`px-2 py-1 rounded ${
                                                        alcanzado
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-600'
                                                    }`}
                                                >
                                                    {valor}{configuracionActual.unidad}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {cronometros.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <ClockIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg">No hay cronómetros activos</p>
                        <p className="text-sm">
                            {MODO_PRUEBA
                                ? 'Crea un cronómetro de prueba para ver las alertas en acción'
                                : 'Crea tu primer cronómetro para comenzar'
                            }
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
