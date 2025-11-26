import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { ChevronDown, ChevronUp, TrashIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CronometroCardProps {
    user: {
        name: string;
    }
    engineers: Array<{
        id: number;
        name: string;
        job_title: {
            id: number;
            title: string;
        };

        place: Array<
            {
                id: number;
                name: string;
                state_id: number;
                state: {
                    id: number;
                    name: string;
                    zone_id: number;
                    zone: { id: number; name: string };
                };
            }[]
        >;
        //TODO hacer bien la interface
        phones: any[];

        teams_user?: string;
    }>;
    contactMethods: { id: number; name: string }[];
    cron: {
        id: number;
        title: string;
        ticket: string;
        created_at: string;
        status_id: number;
        user: { id: number; name: string };
        type_id: number;
        start: string;
        end: Date;
        place: {
            id: number;
            name: string;
            state_id: number;
            state: {
                id: number;
                name: string;
                zone_id: number;
                zone: { id: number; name: string };
            };
        };
        journals?: {
            id: number;
            cronometro_id: number;
            engineer_id: number;
            notified_at: string | null;
            note: string | null;
            escalation_stage_id: number | null;
            journalContactMethods?: {
                id: number;
                responded: number;
                journal_id: number;
                contact_method_id: number;
                comment: string | null;
            }[];
        }[];
    };
    onComplete: (id: number) => void;
    onDelete: (id: number) => void;
}

interface EngineerFormState {
    engineerId: number;
    note: string;
    responses: { [contactMethodId: number]: boolean };
    open: boolean;
}

export default function CronometroCard({
    cron,
    onDelete,
    onComplete,
    engineers,
    contactMethods,
    user
}: CronometroCardProps) {
    //seleccionar inge
    const [selectedEngineer, setSelectedEngineer] = useState<number | ''>('');
    //varios inges
    const [engineerForms, setEngineerForms] = useState<EngineerFormState[]>([]);
    //tiempo transcurrido
    const [elapsedTime, setElapsedTime] = useState(() => {
        const start = new Date(cron.created_at).getTime();
        return Math.floor((Date.now() - start) / 1000);
    });
    //Modal esta o no esta
    const [openModal, setOpenModal] = useState(false);

    /** FORMATEAR TIEMPO */
    const formatTime = (sec: number) => {
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        const s = sec % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    /** FORMATEAR FECHA/HORA */
    const formatDateTime = (dateStr: string | null) => {
        if (!dateStr) return '-';
        const d = new Date(dateStr);
        const h = String(d.getHours()).padStart(2, '0');
        const m = String(d.getMinutes()).padStart(2, '0');
        const s = String(d.getSeconds()).padStart(2, '0');
        return `${d.toLocaleDateString()} ${h}:${m}:${s}`;
    };

    /** AGREGAR INGENIERO */
    const handleAddEngineer = () => {
        if (!selectedEngineer) return;

        if (
            engineerForms.some(
                (f) =>
                    f.note.trim() === '' &&
                    Object.keys(f.responses).length === 0,
            )
        ) {
            return alert(
                'Completa el ingeniero anterior antes de agregar uno nuevo',
            );
        }
        if (engineerForms.some((e) => e.engineerId === selectedEngineer))
            return;
        setEngineerForms([
            ...engineerForms.map((f) => ({ ...f, open: false })),
            {
                engineerId: selectedEngineer,
                note: '',
                responses: {},
                open: true,
            },
        ]);
        setSelectedEngineer('');
    };

    //eliminar ingeniero del formulario de llenado de inges para la escala
    const handleRemoveEngineer = (id: number) =>
        setEngineerForms(engineerForms.filter((e) => e.engineerId !== id));
    const toggleOpenEngineer = (id: number) =>
        setEngineerForms(
            engineerForms.map((e) =>
                e.engineerId === id ? { ...e, open: !e.open } : e,
            ),
        );
    const handleNoteChange = (id: number, value: string) =>
        setEngineerForms(
            engineerForms.map((e) =>
                e.engineerId === id ? { ...e, note: value } : e,
            ),
        );
    const handleResponseChange = (
        engineerId: number,
        methodId: number,
        value: boolean,
    ) =>
        setEngineerForms(
            engineerForms.map((e) =>
                e.engineerId === engineerId
                    ? { ...e, responses: { ...e.responses, [methodId]: value } }
                    : e,
            ),
        );

    /** ENVIAR FORMULARIO */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (engineerForms.length === 0)
            return alert('Selecciona al menos un ingeniero');
        const lastStage = cron.journals?.length
            ? Math.max(...cron.journals.map((j) => j.escalation_stage_id || 0))
            : 0;
        const nextStage = lastStage >= 3 ? 3 : lastStage + 1;
        engineerForms.forEach((form) => {
            router.post(
                '/journals',
                {
                    cronometro_id: cron.id,
                    engineer_id: form.engineerId,
                    escalation_stage_id: nextStage,
                    note: form.note,
                    contact_methods: Object.keys(form.responses).map((id) =>
                        Number(id),
                    ),
                    responses: form.responses,
                },
                {
                    onSuccess: () => {
                        setEngineerForms([]);
                        router.reload();
                    },
                    onError: (err) => {
                        console.error(err);
                        alert('Error al crear la escalación');
                    },
                },
            );
        });
    };

    /** ACTUALIZAR STATUS en DB*/
    const updateStatus = (id: number, newStatus: number) => {
        router.post(
            `/cronometros/${id}/status`,
            { status_id: newStatus },
            {
                onSuccess: () => router.reload(),
                onError: () =>
                    alert('Hubo un problema al actualizar el estado'),
            },
        );
    };

    /** INTERVALO TIEMPO */
    useEffect(() => {
        const interval = setInterval(() => setElapsedTime((t) => t + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    const [stage, setStage] = useState(0);

    useEffect(() => {
        const latestJournal = cron.journals?.[cron.journals.length - 1];
        setStage(latestJournal?.escalation_stage_id || 0);
    }, [cron]);
    /** LÓGICA ESCALACION / QUEMADO */

    //TODO: Ajustar bien tiempos y cantidad de escalas
    useEffect(() => {
        if (!cron) return;
        if (stage === 0) {
            if (elapsedTime >= 30 && cron.status_id === 1)
                updateStatus(cron.id, 2);

            if (elapsedTime >= 45 && cron.status_id === 2)
                updateStatus(cron.id, 3);
        } else if (stage === 1) {
            if (elapsedTime >= 120 && cron.status_id === 1)
                updateStatus(cron.id, 2);

            if (elapsedTime >= 145 && cron.status_id === 2)
                updateStatus(cron.id, 3);
        } else if (stage === 2) {
            if (elapsedTime >= 220 && cron.status_id === 1)
                updateStatus(cron.id, 2);

            if (elapsedTime >= 245 && cron.status_id === 2)
                updateStatus(cron.id, 3);
        } else if (stage === 3) {
            if (
                elapsedTime >= 345 &&
                (cron.status_id === 1 || cron.status_id === 2)
            ) {
                updateStatus(cron.id, 4);
            }
        }
    }, [elapsedTime, stage, cron]);

    /** AGRUPAR JOURNALS POR STAGE */
    const journalsByStage =
        cron.journals?.reduce(
            (acc: Record<number, typeof cron.journals>, journal) => {
                const stage = journal.escalation_stage_id || 0;
                if (!acc[stage]) acc[stage] = [];
                acc[stage].push(journal);
                return acc;
            },
            {} as Record<number, typeof cron.journals>,
        ) || {};



    const buildWhatsappText = (
        engineer: any,
        cron: any,
        stage: number,
        user_name: string
        ) => {
            const saludo = new Date().getHours() >= 6 && new Date().getHours() < 19 ? 'Buenos días' : 'Buenas noches';

            const escalacionText = stage === 0 ? "Primer escalación"
                : stage === 1 ? "Segunda escalación"
                : stage === 2 ? "Tercer escalación"
                : "Actualizacion del ticket vencido";


            const now = new Date();
            const startDate = new Date(cron.start);
            const diffInMilliseconds = now.getTime() - startDate.getTime();

            // Calcular días, horas y minutos
            const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)); // Convertir a días
            const hours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Convertir a horas
            const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)); // Convertir a minutos

            // Asegurar que horas y minutos siempre tengan dos dígitos
            const formattedHours = String(hours).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');

            // Formatear el texto final
            const formattedText = `*Asunto:* *${escalacionText} - ${cron.place.name}*
Hola ${saludo}, *Ing. ${engineer.name}*.

Reportamos la *${escalacionText}* en *${cron.place.name}*.
• Fecha y hora (Inicio Aproximado): *${cron.start}*
• Id incidente: *${cron.ticket}*
• Prioridad: *${cron.type_id}*
• Tiempo transcurrido (aproximado): *${days > 0 ? `${days} días, ` : ''}${formattedHours}:${formattedMinutes} horas*.

Quedo atento a sus indicaciones.
Saludos,
Atentamente: *${user_name}*`;

        return formattedText;
    };


    return (
        <div
            className={`${cron.status_id === 1 ? 'hidden' : 'relative mx-2 my-2'}`}
        >
            <div
                className={`flex w-44 cursor-pointer flex-col justify-between rounded-md border p-3 shadow-sm ${cron.status_id === 2 ? 'border-yellow-400 bg-yellow-200' : ''} ${cron.status_id === 3 ? 'border-red-500 bg-red-300' : ''} ${cron.status_id === 4 ? 'border-gray-900 bg-gray-700 text-white' : ''} `}
                onClick={() => setOpenModal(true)}
            >
                <div className="mb-2 flex items-start justify-between">
                    <div className="rounded-full bg-black px-2 py-1 text-xs font-bold text-white">
                        {cron.status_id === 1
                            ? 'En progreso'
                            : cron.status_id === 2
                              ? 'Por escalar'
                              : cron.status_id === 3 && stage === 0
                                ? 'Primer Escala'
                                : cron.status_id === 3 && stage === 1
                                  ? 'Segunda Escala'
                                  : cron.status_id === 3 && stage === 2
                                    ? 'Tercera Escala'
                                    : cron.status_id === 4
                                      ? 'Quemado'
                                      : 'Cerrado'}
                    </div>

                    <Button
                        //BOTON NECESARIO PARA ELIMINAR CRONOMETROS INCORRECTOS O DE PRUEBA, NO LLENAR DE DATOS INUTILES LA DB
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(cron.id);
                        }}
                        className="h-6 w-6 text-gray-500 hover:bg-green-50 hover:text-green-600"
                        title="Eliminar cronómetro"
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
                    <div className="font-mono text-2xl font-bold">
                        {formatTime(elapsedTime)}
                    </div>
                    <div
                        className="truncate text-xs opacity-75"
                        title={cron.ticket}
                    >
                        Ticket: {cron.ticket}
                    </div>
                    <div className="truncate text-xs opacity-75">
                        {' '}
                        Prioridad: {cron.type_id}
                    </div>
                    <div className="text-[11px] opacity-60">
                        {cron.user.name ?? 'Sin asignar'}
                    </div>
                    {/* Perros chidos
                    {cron.status_id === 2 ? (
                        <div>
                            <img
                                src="https://i.pinimg.com/originals/b1/8b/a1/b18ba1d6b1e6c63ec666165f5456484f.gif"
                                alt="Perro con una sirena bien perra"
                            />
                        </div>
                    ) : cron.status_id === 3 && cron.user.id === 2 ? (
                        <div>
                            <img
                                src="https://assets-v2.lottiefiles.com/a/0ecadb48-20b4-11f0-a13b-03f717b3da73/oRKyynvI6g.gif"
                                alt="Perro con una sirena bien perra"
                            />
                        </div>
                    ) : cron.status_id === 3 ? (
                        <div>
                            <img
                                src="https://media.tenor.com/J3sih0hnKLwAAAAM/borzoi-siren.gif"
                                alt="Perro con una sirena bien perra"
                            />
                        </div>
                    ) : cron.status_id === 4 && cron.user.id === 1 ? (
                        <div>
                            <img
                                src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGY1eGlxeHA1cXZteXV2ZzB0NjEwbjU5YXVvZjVzdXR3eGIwc240aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nrXif9YExO9EI/giphy.gif"
                                alt="Perro con una sirena bien perra"
                            />
                        </div>
                    ) : cron.status_id === 4 && cron.user.id === 2 ? (
                        <div>
                            <img
                                src="https://cdn-icons-mp4.flaticon.com/512/7920/7920938.mp4"
                                alt="Perro con una sirena bien perra"
                            />
                        </div>
                    ) : (
                        'hola'
                    )} */}
                </div>
            </div>

            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="max-h-[85vh] w-[650px] overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-2xl font-bold">
                                Detalles del Cronómetro
                            </h2>
                            <button onClick={() => setOpenModal(false)}>
                                <X className="h-6 w-6 text-gray-700 hover:text-black" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-6">
                            {/* Información general */}
                            <section className="rounded-lg border bg-gray-50 p-4">
                                <h3 className="mb-3 text-lg font-semibold text-gray-700">
                                    Información general
                                </h3>

                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <p>
                                        <strong>Título:</strong> {cron.title}
                                    </p>
                                    <p>
                                        <strong>Ticket:</strong> {cron.ticket}
                                    </p>

                                    <p>
                                        <strong>Prioridad:</strong>{' '}
                                        {cron.type_id}
                                    </p>
                                    <p>
                                        <strong>Estado:</strong>{' '}
                                        {cron.status_id === 1
                                            ? 'En progreso'
                                            : cron.status_id === 2
                                              ? 'Por escalar'
                                              : cron.status_id === 3
                                                ? 'Pendiente de escalar'
                                                : cron.status_id === 4
                                                  ? 'Quemado'
                                                  : 'Cerrado'}
                                    </p>

                                    <p>
                                        <strong>Plaza:</strong>{' '}
                                        {cron.place?.name}
                                    </p>
                                    <p>
                                        <strong>Zona:</strong>{' '}
                                        {cron.place?.state?.zone?.name}
                                    </p>

                                    <p className="col-span-2 text-xl font-bold">
                                        <strong>Tiempo transcurrido:</strong>{' '}
                                        {formatTime(elapsedTime)}
                                    </p>
                                </div>
                            </section>

                            {/* Formulario escalación */}
                            <section className="rounded-lg border bg-gray-50 p-4">
                                <h3 className="mb-3 text-lg font-semibold text-gray-700">
                                    {
                                        stage === 0
                                            ? 'Crear primer escala'
                                            : stage === 2
                                              ? 'Crear segunda escala'
                                              : stage === 3
                                                ? 'Crear tercer escala'
                                                : stage === 4
                                                  ? 'Avance quemado'
                                                  : '' // valor por defecto si no coincide ningún stage
                                    }{' '}
                                </h3>
                                <form
                                    className="flex flex-col gap-4"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="flex gap-2">
                                        <select
                                            value={selectedEngineer}
                                            onChange={(e) =>
                                                setSelectedEngineer(
                                                    Number(e.target.value),
                                                )
                                            }
                                            className="rounded border p-2 text-sm"
                                        >
                                            <option value="">
                                                Selecciona ingeniero
                                            </option>
                                            {engineers
                                                .filter(
                                                    (e: any) =>
                                                        e.place?.name ===
                                                        cron.place?.name,
                                                )
                                                .map((e: any) => (
                                                    <option
                                                        key={e.id}
                                                        value={e.id}
                                                    >
                                                        {e.name} -{' '}
                                                        {e.job_title?.title}
                                                    </option>
                                                ))}
                                        </select>
                                        <Button
                                            type="button"
                                            onClick={handleAddEngineer}
                                        >
                                            Añadir ingeniero
                                        </Button>
                                    </div>

                                    {engineerForms.map((form) => (
                                        <div
                                            key={form.engineerId}
                                            className="rounded border bg-gray-100"
                                        >
                                            <div
                                                className="flex cursor-pointer items-center justify-between p-2"
                                                onClick={() =>
                                                    toggleOpenEngineer(
                                                        form.engineerId,
                                                    )
                                                }
                                            >
                                                <span className="font-semibold">
                                                    {
                                                        engineers.find(
                                                            (e) =>
                                                                e.id ===
                                                                form.engineerId,
                                                        )?.name
                                                    }
                                                    {' - '}
                                                    {
                                                        engineers.find(
                                                            (e) =>
                                                                e.id ===
                                                                form.engineerId,
                                                        )?.job_title.title
                                                    }{' '}
                                                </span>
                                                {form.open ? (
                                                    <ChevronUp />
                                                ) : (
                                                    <ChevronDown />
                                                )}
                                            </div>

                                            {form.open && (
                                                <div className="space-y-2 p-3">
                                                    {contactMethods.map(
                                                        (method) => (
                                                            <div
                                                                key={method.id}
                                                                className="mb-2 ml-2"
                                                            >
                                                                <label className="flex items-center gap-2">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={
                                                                            form
                                                                                .responses[
                                                                                method
                                                                                    .id
                                                                            ] !==
                                                                            undefined
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            handleResponseChange(
                                                                                form.engineerId,
                                                                                method.id,
                                                                                e
                                                                                    .target
                                                                                    .checked
                                                                                    ? false
                                                                                    : (undefined as any),
                                                                            )
                                                                        }
                                                                    />
                                                                    {
                                                                        method.name
                                                                    }
                                                                </label>

                                                                {form.responses[
                                                                    method.id
                                                                ] !==
                                                                    undefined && (
                                                                    <div className="mt-1 ml-6 space-y-4">

                                                                        {method.id === 1 ? (
                                                                            <div className="space-y-4">
                                                                                {engineers.find((e) => e.id === form.engineerId)
                                                                                    ?.phones?.map((p) => (
                                                                                        <div
                                                                                            key={p.id}
                                                                                            className="p-4 border rounded-lg bg-gray-50 shadow-sm space-y-2"
                                                                                        >
                                                                                            <p key={p.id} className="font-bold text-lg">
                                                                                                {p.phone}
                                                                                            </p>

                                                                                            <hr className="border-gray-300" />

                                                                                            <div className="text-sm leading-relaxed">
                                                                                                {buildWhatsappText(engineers.find((e)=>e.id === form.engineerId), cron, stage, user.name)}
                                                                                           </div>

                                                                                            <div className="flex gap-2 pt-1">
                                                                                                <Button
                                                                                                    size="sm"
                                                                                                    variant="secondary"
                                                                                                    className="mt-2"
                                                                                                    onClick={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    navigator.clipboard.writeText(
                                                                                                        buildWhatsappText(
                                                                                                            engineers.find((x) => x.id === form.engineerId),
                                                                                                            cron,
                                                                                                            stage,
                                                                                                            user.name
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                                >
                                                                                                    Copiar
                                                                                                </Button>

                                                                                                <a
                                                                                                    // href={`https://wa.me/${p.phone}?text=${encodeURIComponent(
                                                                                                    //     buildWhatsappText(
                                                                                                    //         engineers.find((e) => e.id === form.engineerId),
                                                                                                    //         cron,
                                                                                                    //         stage,
                                                                                                    //         user.name
                                                                                                    //     )
                                                                                                    // )}`}
                                                                                                    // href={`https://web.whatsapp.com/send/?phone=${p.phone}&text=${encodeURIComponent(buildWhatsappText(engineers.find((e) => e.id === form.engineerId),cron,stage,user.name))}&type=phone_number&app_absent=0`}
                                                                                                    href={`whatsapp://send?phone=${p.phone}&text=${encodeURIComponent(buildWhatsappText(engineers.find((e) => e.id === form.engineerId),cron,stage,user.name))}`}

                                                                                                    //https://web.whatsapp.com/send/?phone=3751226303&text=Hola+Buenos+d%C3%ADas%2C+Ing.+Edgar+Avila+Gonzalez+reportamos+el+ticket%3A+1234++la+primera+escalacion+en+GUADALAJARA+con+hora+y+fecha+de+inicio+aproximada%3A+2025-11-26+13%3A33%3A19.&type=phone_number&app_absent=0
                                                                                                    target="_blank"
                                                                                                    rel="noreferrer"
                                                                                                    onClick={(e) => e.stopPropagation()} // evita submit o eventos padres
                                                                                                >
                                                                                                    <Button
                                                                                                        type="button" // IMPORTANTE para evitar submit
                                                                                                        className="bg-green-600 text-white"
                                                                                                    >
                                                                                                        Enviar WhatsApp
                                                                                                    </Button>
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                    )) || "No tiene teléfonos"}
                                                                            </div>

                                                                        ) : method.id === 2 ? (
                                                                            <div className="p-2 bg-gray-50 rounded-lg border">
                                                                                {engineers.find((e) => e.id === form.engineerId)
                                                                                    ?.phones?.map((p) => (
                                                                                        <p className="font-bold">
                                                                                            {p.phone}
                                                                                        </p>
                                                                                    )) || "No tiene teléfonos"}
                                                                            </div>

                                                                        ) : method.id === 3 ? (
                                                                            <div className="p-2 bg-gray-50 rounded-lg border">
                                                                                <p className="font-semibold">
                                                                                    {engineers.find((e) => e.id === form.engineerId)?.teams_user ||
                                                                                        "No tiene teams"}
                                                                                </p>
                                                                            </div>

                                                                        ) : (
                                                                            "Desconocido"
                                                                        )}

                                                                        <div className="flex items-center gap-4 pt-1 mb-2">
                                                                            <span className="text-sm font-medium">
                                                                                ¿Hubo respuesta?
                                                                            </span>

                                                                            <label className="flex items-center gap-1">
                                                                                <input
                                                                                    type="radio"
                                                                                    name={`respuesta_${form.engineerId}_${method.id}`}
                                                                                    checked={form.responses[method.id] === true}
                                                                                    onChange={() =>
                                                                                        handleResponseChange(form.engineerId, method.id, true)
                                                                                    }
                                                                                />
                                                                                Sí
                                                                            </label>

                                                                            <label className="flex items-center gap-1">
                                                                                <input
                                                                                    type="radio"
                                                                                    name={`respuesta_${form.engineerId}_${method.id}`}
                                                                                    checked={form.responses[method.id] === false}
                                                                                    onChange={() =>
                                                                                        handleResponseChange(form.engineerId, method.id, false)
                                                                                    }
                                                                                />
                                                                                No
                                                                            </label>
                                                                        </div>


                                                                    </div>

                                                                )}
                                                            </div>
                                                        ),
                                                    )}

                                                    <textarea
                                                        className="w-full rounded border p-2 text-sm"
                                                        placeholder="Notas del ingeniero"
                                                        value={form.note}
                                                        onChange={(e) =>
                                                            handleNoteChange(
                                                                form.engineerId,
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="mt-2"
                                                        onClick={() =>
                                                            handleRemoveEngineer(
                                                                form.engineerId,
                                                            )
                                                        }
                                                    >
                                                        Eliminar ingeniero
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    <Button
                                        className="mt-2 w-full"
                                        type="submit"
                                    >
                                        Crear Escalación
                                    </Button>
                                </form>
                            </section>
                            {/* Historial agrupado por stage */}
                            <section className="rounded-lg border bg-gray-50 p-4">
                                <h3 className="mb-3 text-lg font-semibold text-gray-700">
                                    Historial de escalación
                                </h3>
                                <div className="max-h-48 overflow-y-auto rounded border bg-white p-3 text-sm">
                                    {Object.entries(journalsByStage).length ? (
                                        Object.entries(journalsByStage).map(
                                            ([stage, journals]) => (
                                                <div
                                                    key={stage}
                                                    className="mb-3"
                                                >
                                                    <h4 className="mb-1 text-sm font-bold">
                                                        Escala {stage}
                                                    </h4>
                                                    {journals.map((j) => (
                                                        <div
                                                            key={j.id}
                                                            className="mb-1 border-b pb-1 text-sm"
                                                        >
                                                            <p>
                                                                <strong>
                                                                    Ingeniero:
                                                                </strong>{' '}
                                                                {engineers.find(
                                                                    (e) =>
                                                                        e.id ===
                                                                        j.engineer_id,
                                                                )?.name ||
                                                                    'N/A'}
                                                            </p>
                                                            <p>
                                                                <strong>
                                                                    Hora
                                                                    notificación:
                                                                </strong>{' '}
                                                                {formatDateTime(
                                                                    j.notified_at,
                                                                )}
                                                            </p>
                                                            <p>
                                                                <strong>
                                                                    Notas:
                                                                </strong>{' '}
                                                                {j.note || '-'}
                                                            </p>
                                                            <p>
                                                                <strong>
                                                                    Métodos:
                                                                </strong>{' '}
                                                                {j.journalContactMethods
                                                                    ?.map(
                                                                        (m) => {
                                                                            const methodName =
                                                                                contactMethods.find(
                                                                                    (
                                                                                        c,
                                                                                    ) =>
                                                                                        c.id ===
                                                                                        m.contact_method_id,
                                                                                )
                                                                                    ?.name ||
                                                                                '';
                                                                            const responded =
                                                                                m.responded
                                                                                    ? 'Sí'
                                                                                    : 'No';
                                                                            const comment =
                                                                                m.comment
                                                                                    ? ` (${m.comment})`
                                                                                    : '';
                                                                            return `${methodName}: ${responded}${comment}`;
                                                                        },
                                                                    )
                                                                    .join(
                                                                        ', ',
                                                                    ) || '-'}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            ),
                                        )
                                    ) : (
                                        <p className="text-gray-500">
                                            No hay escalaciones registradas.
                                        </p>
                                    )}
                                </div>
                            </section>
                            {/* AQUI SI ES NECESARIO EL DE ONCOMPLETE PARA INDICAR EXPLICITAMENTE QUE LO MARCARA COMO COMPLETADO */}
                            <Button
                                variant="default"
                                className="flex w-full items-center gap-2"
                                onClick={() => {
                                    onComplete(cron.id);
                                    setOpenModal(false);
                                }}
                                title="Marcar como completado"
                            >
                                Marcar como completado
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
