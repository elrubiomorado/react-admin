import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { TrashIcon, UserCircleIcon, TicketIcon, BellIcon } from '@heroicons/react/24/solid';
import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

interface Usuario {
  id: number;
  name: string;
}

interface Cronometro {
  id: number;
  titulo: string;
  ticketId: string;
  tipoAlarma: string;
  prioridad: string;
  estado: 'activo' | 'en_espera';
  creado_por: number;
  created_at: string;
  updated_at: string;
  usuario: Usuario;
  notificado: boolean;
}

interface CronometroConTiempo extends Cronometro {
  tiempoTranscurrido: number;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Cronómetros', href: '/cronometros/testcard' },
];

const MODO_PRUEBA = false;
const ALERTAS = MODO_PRUEBA ? [10, 20, 30] : [4, 6, 8];

export default function Index({ cronometros: initialCronometros }: { cronometros: Cronometro[] }) {
  const [cronometros, setCronometros] = useState<CronometroConTiempo[]>([]);
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [ticketId, setTicketId] = useState('');
  const [tipoAlarma, setTipoAlarma] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [mostrarPrioridad, setMostrarPrioridad] = useState(false);
  const [notificacionesPermitidas, setNotificacionesPermitidas] = useState(false);
  const [openTipo, setOpenTipo] = useState(false);
  const [openPrioridad, setOpenPrioridad] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const alertasMostradasRef = useRef<{ [key: number]: number[] }>({});

  const MS_PER_SEC = 1000;
  const MS_PER_HOUR = 1000 * 60 * 60;
  const msPerUnit = MODO_PRUEBA ? MS_PER_SEC : MS_PER_HOUR;
  const msToUnits = (ms: number) => ms / msPerUnit;

  // 🔔 FUNCIÓN DE NOTIFICACIÓN
  const mostrarAlarma = () => {
    toast("🔔 ¡Tienes una nueva alarma!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const pedirPermisoNotificacion = async () => {
    if (!('Notification' in window)) {
      alert('Este navegador no soporta notificaciones.');
      return;
    }
    const permiso = await Notification.requestPermission();
    if (permiso === 'granted') {
      setNotificacionesPermitidas(true);
      new Notification('✅ Notificaciones activadas correctamente.');
    } else {
      alert('Permiso de notificaciones denegado.');
    }
  };

  useEffect(() => {
    const ahora = Date.now();
    const cronConTiempo = initialCronometros.map(cron => ({
      ...cron,
      tiempoTranscurrido: cron.estado === 'activo' ? ahora - new Date(cron.created_at).getTime() : 0,
    }));
    setCronometros(cronConTiempo);
    alertasMostradasRef.current = {};
    cronConTiempo.forEach(cron => {
      alertasMostradasRef.current[cron.id] = [];
    });
  }, [initialCronometros]);

  const mostrarAlertaEmergente = (cron: CronometroConTiempo, marca: number) => {
    const unidad = MODO_PRUEBA ? 'segundos' : 'horas';
    toast.info(`⚠️ Escala el Ticket #${cron.ticketId} alcanzó ${marca} ${unidad}.`, {
      position: "bottom-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setCronometros(prev =>
        prev.map(cron => {
          if (cron.estado !== 'activo') return cron;

          const nuevoTiempo = cron.tiempoTranscurrido + 1000;
          const unidades = msToUnits(nuevoTiempo);

          ALERTAS.forEach(marca => {
            if (Math.abs(unidades - marca) < 0.1) {
              if (!alertasMostradasRef.current[cron.id]?.includes(marca)) {
                mostrarAlertaEmergente(cron, marca);
                if (notificacionesPermitidas) {
                  new Notification(`⚠️ Escala el Ticket #${cron.ticketId} alcanzó la marca de ${marca}${MODO_PRUEBA ? ' segundos' : ' horas'}.`);
                }
                if (!alertasMostradasRef.current[cron.id]) {
                  alertasMostradasRef.current[cron.id] = [];
                }
                alertasMostradasRef.current[cron.id].push(marca);
              }
            }
          });

          return { ...cron, tiempoTranscurrido: nuevoTiempo };
        })
      );
    }, 1000);

    return () => intervalRef.current && window.clearInterval(intervalRef.current);
  }, [notificacionesPermitidas]);

  const handleTipoChange = (val: string) => {
    setTipoAlarma(val);
    setOpenTipo(false);
    if (val === 'Enlaces') {
      setPrioridad('1');
      setMostrarPrioridad(false);
    } else {
      setMostrarPrioridad(true);
    }
  };

  const handlePrioridadChange = (val: string) => {
    setPrioridad(val);
    setOpenPrioridad(false);
  };

  // 🔔 Muestra una notificación al crear un cronómetro
  const crearCronometro = () => {
    if (!nuevoTitulo.trim() || !ticketId.trim() || !tipoAlarma) return;
    const ahora = new Date();
    const nuevoId = Date.now();
    const nuevo: CronometroConTiempo = {
      id: nuevoId,
      titulo: nuevoTitulo,
      ticketId,
      tipoAlarma,
      prioridad: tipoAlarma === 'Enlaces' ? '1' : prioridad || '1',
      estado: 'activo',
      creado_por: 1,
      created_at: ahora.toISOString(),
      updated_at: ahora.toISOString(),
      usuario: { id: 1, name: 'Nataly Lopez' },
      tiempoTranscurrido: 0,
      notificado: false,
    };
    alertasMostradasRef.current[nuevoId] = [];
    setCronometros(prev => [nuevo, ...prev]);
    setNuevoTitulo('');
    setTicketId('');
    setTipoAlarma('');
    setPrioridad('');
    setMostrarPrioridad(false);

    toast.success('🕒 Cronómetro creado correctamente.');
    mostrarAlarma(); // 🔔 Alerta automática al crear
  };

  const formatearTiempo = (ms: number) => {
    const seg = Math.floor(ms / 1000);
    const min = Math.floor(seg / 60);
    const hr = Math.floor(min / 60);
    return `${hr.toString().padStart(2, '0')}:${(min % 60).toString().padStart(2, '0')}:${(seg % 60).toString().padStart(2, '0')}`;
  };

  const toggleEstado = (id: number) => {
    setCronometros(prev => prev.map(cron => (cron.id === id ? { ...cron, estado: cron.estado === 'activo' ? 'en_espera' : 'activo' } : cron)));
  };

  const eliminarCronometro = (id: number) => {
    if (confirm('¿Deseas eliminar este cronómetro?')) {
      setCronometros(prev => prev.filter(c => c.id !== id));
      delete alertasMostradasRef.current[id];
    }
  };

  const escalarCronometro = (id: number) => {
    setCronometros(prev => prev.map(cron => (cron.id === id ? { ...cron, notificado: true } : cron)));
  };

  const getColorTarjeta = (ms: number, notificado: boolean) => {
    const unidades = msToUnits(ms);
    if (notificado) return 'bg-emerald-500';
    if (unidades < ALERTAS[0] - 0.25) return 'bg-gray-100';
    if (unidades < ALERTAS[0]) return 'bg-orange-500';
    if (unidades >= ALERTAS[0] && unidades < ALERTAS[1] - 0.25) return 'bg-red-500';
    if (unidades >= ALERTAS[1] && unidades < ALERTAS[2] - 0.25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Cronómetros" />
      <div className="p-6 flex flex-col gap-6">

        {/* 🔔 Botón para activar notificaciones */}
        <div className="flex items-center gap-3 mb-2">
          <Button onClick={pedirPermisoNotificacion} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
            <BellIcon className="h-4 w-4" /> Activar Notificaciones
          </Button>
          <Button onClick={mostrarAlarma} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded">
            Activar Alarma
          </Button>
          {notificacionesPermitidas && <span className="text-green-600 font-semibold">✅ Activadas</span>}
        </div>

        <div className="bg-yellow-100 border border-yellow-400 rounded p-3 mb-4">
          <p className="text-yellow-800 font-semibold">
            {MODO_PRUEBA ? '🔧 Modo Prueba: Alertas a los 10, 20 y 30 segundos' : '⏰ Modo Producción: Alertas a las 4, 6 y 8 horas'}
          </p>
        </div>



        {/* Formulario */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input type="text" placeholder="Título" value={nuevoTitulo} onChange={e => setNuevoTitulo(e.target.value)} className="border rounded px-3 py-2" />
          <input type="text" placeholder="ID Ticket" value={ticketId} onChange={e => setTicketId(e.target.value)} className="border rounded px-3 py-2" />

          {/* Dropdown personalizado */}
          <div className="relative w-full">
            <button
              onClick={() => setOpenTipo(!openTipo)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
            >
              {tipoAlarma || 'Tipo de Alarma'}
            </button>
            {openTipo && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow">
                {['Enlaces', 'Energía'].map(opcion => (
                  <div
                    key={opcion}
                    onClick={() => handleTipoChange(opcion)}
                    className="px-3 py-2 hover:bg-blue-500 hover:text-white cursor-pointer transition"
                  >
                    {opcion}
                  </div>
                ))}
              </div>
            )}
          </div>

          {mostrarPrioridad && (
            <div className="relative w-full">
              <button
                onClick={() => setOpenPrioridad(!openPrioridad)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
              >
                {prioridad || 'Prioridad'}
              </button>
              {openPrioridad && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow">
                  {['1', '2'].map(opcion => (
                    <div
                      key={opcion}
                      onClick={() => handlePrioridadChange(opcion)}
                      className="px-3 py-2 hover:bg-blue-500 hover:text-white cursor-pointer transition"
                    >
                      {opcion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <Button onClick={crearCronometro} className="bg-blue-600 hover:bg-blue-700 text-white mt-2">
          Crear Cronómetro
        </Button>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cronometros.map(cron => (
            <div key={cron.id} className={`rounded-lg border p-4 shadow ${getColorTarjeta(cron.tiempoTranscurrido, cron.notificado)} text-black`}>
              <div className="flex justify-between mb-2 text-black">
                <div>
                  <div className="flex items-center text-sm gap-1 font-bold text-xl">
                    <TicketIcon className="h-4 w-4" /> {cron.ticketId} - {cron.titulo}
                  </div>
                  <div className="flex items-center text-sm gap-1 mt-1">
                    <UserCircleIcon className="h-4 w-4" /> {cron.usuario.name}
                  </div>
                  <div className="text-sm mt-1 font-semibold">Prioridad: {cron.prioridad}</div>
                  <div className="text-xs mt-1">Iniciado: {new Date(cron.created_at).toLocaleString()}</div>
                </div>
                <Button onClick={() => eliminarCronometro(cron.id)} size="sm" className="text-gray-950 bg-transparent hover:text-black-300">
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-center mb-2">
                <div className="text-3xl font-mono font-bold">{formatearTiempo(cron.tiempoTranscurrido)}</div>
                <div className="text-sm">{cron.estado === 'activo' ? 'En proceso' : 'En espera'}</div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col md:flex-row gap-2 items-center"
              >
                <Button
                  onClick={() => escalarCronometro(cron.id)}
                  className={`w-full md:flex-1 ${cron.notificado ? 'bg-green-700' : 'bg-blue-900 hover:bg-blue-950'} text-white`}
                >
                  Escalar
                </Button>

                <Button
                  onClick={() => toggleEstado(cron.id)}
                  className={`w-full md:flex-1 ${cron.estado === 'activo' ? 'bg-gray-500' : 'bg-gray-500 hover:bg-sky-600'} text-white`}
                >
                  {cron.estado === 'activo' ? 'Poner en espera' : 'Poner en proceso'}
                </Button>
              </motion.div>

              {/* Barra de progreso */}
              <div className="mt-3">
                <div className="text-xs text-black mb-1">Próxima escalación ({MODO_PRUEBA ? 'seg' : 'hrs'}):</div>
                <div className="flex h-3 rounded overflow-hidden bg-gray-300">
                  {ALERTAS.map((h, idx) => {
                    const progress = Math.min(1, cron.tiempoTranscurrido / (msPerUnit * h));
                    return <div key={idx} className={`${progress >= 1 ? 'bg-gray-100' : 'bg-gray-900'} flex-1 mr-1 last:mr-0`} />;
                  })}
                </div>
                <div className="flex justify-between text-xs text-black mt-1">
                  {ALERTAS.map(h => (
                    <span key={h}>{h}{MODO_PRUEBA ? 's' : 'h'}</span>
                  ))}
                </div>
                <div className={`text-xs mt-2 font-semibold ${cron.notificado ? 'text-green-300' : 'text-yellow-200'}`}>
                  {cron.notificado ? '✅ Notificado' : '⚠️ No notificado'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

             <ToastContainer />

    </AppLayout>
  );
}
