import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Utilidades", href: "/utilities" },
    { title: "Calendarios", href: "/utilities/calendars" },
];

interface CalendarItem {
    id: number;
    date: string;
    note: string | null;
    shift_type: string | null;
    color: string | null;
}

interface Props {
    calendars: CalendarItem[];
}

export default function Index({ calendars }: Props) {

    // ------- 1. OBTENER DATOS DEL MES -------
    const firstDate = calendars.length > 0 ? dayjs(calendars[0].date) : dayjs();
    const year = firstDate.year();
    const month = firstDate.month();
    const monthName = firstDate.format("MMMM");

    // Días del mes
    const daysInMonth = firstDate.daysInMonth();

    // Día de la semana en que inicia (0 = domingo)
    const startWeekDay = firstDate.startOf("month").day();

    // ------- 2. AGREGAR ESPACIOS VACÍOS AL INICIO -------
    const calendarCells: any[] = [];

    for (let i = 0; i < startWeekDay; i++) {
        calendarCells.push({ empty: true });
    }

    // ------- 3. AGREGAR LOS DÍAS reales -------
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = dayjs(`${year}-${month + 1}-${day}`).format("YYYY-MM-DD");

        const data = calendars.find((c) => c.date === dateStr);

        calendarCells.push({
            date: dateStr,
            day,
            color: data?.color ?? "#FFFFFF",
            shift_type: data?.shift_type ?? null,
            note: data?.note ?? null,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Calendario" />

            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold capitalize">
                        Calendario — {monthName} {year}
                    </h1>

                    <Link href="/utilities/calendars/create">
                        <Button className="text-white shadow-md hover:bg-gray-900">
                            Crear nuevo horario
                        </Button>
                    </Link>
                </div>

                {/* ------- GRID DEL CALENDARIO ------- */}
                <div className="grid grid-cols-7 text-center font-semibold bg-gray-100 py-2 rounded-lg">
                    <div>Dom</div>
                    <div>Lun</div>
                    <div>Mar</div>
                    <div>Mié</div>
                    <div>Jue</div>
                    <div>Vie</div>
                    <div>Sáb</div>
                </div>

                <div className="grid grid-cols-7 gap-2 mt-2">
                    {calendarCells.map((cell, index) => (
                        <div
                            key={index}
                            className={`min-h-[90px] border rounded-lg p-2 text-sm relative ${
                                cell.empty ? "bg-transparent border-none" : ""
                            }`}
                            style={{ backgroundColor: cell.color }}
                        >
                            {!cell.empty && (
                                <>
                                    {/* Número del día */}
                                    <div className="font-bold">{cell.day}</div>

                                    {/* Icono según el tipo */}
                                    {cell.shift_type === "day" && (
                                        <div className="text-yellow-600 text-xl">☀️</div>
                                    )}
                                    {cell.shift_type === "night" && (
                                        <div className="text-indigo-700 text-xl">🌙</div>
                                    )}
                                    {cell.shift_type === "off" && (
                                        <div className="text-gray-500 text-lg">⛱️</div>
                                    )}

                                    {/* Nota */}
                                    {cell.note && (
                                        <div className="text-xs mt-1 text-gray-700">
                                            {cell.note}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </AppLayout>
    );
}
