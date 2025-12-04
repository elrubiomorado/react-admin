import { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

export default function Create() {
    const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [shiftPattern, setShiftPattern] = useState("day");
    const [note, setNote] = useState("");

    const generateDays = () => {
        const days = [];
        const start = dayjs(startDate);

        // 1 año completo
        const end = start.add(1, "year");

        let current = start;

        while (current.isBefore(end)) {
            days.push({
                date: current.format("YYYY-MM-DD"),
                shift_type: shiftPattern,
                color:
                    shiftPattern === "day"
                        ? "#FFE680" // amarillo suave
                        : shiftPattern === "night"
                        ? "#9FA8DA" // morado suave SINO CAMBIAR A 4626A0
                        : "#F1F1F1", // gris para "off"
                note: note || null,
            });

            current = current.add(1, "day");
        }

        return days;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const days = generateDays();

        router.post("/utilities/calendars", {
            days: days,
            start_date: startDate,
            shift_pattern: shiftPattern,
            note: note,
        });
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Crear Calendario</h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="font-semibold">Fecha de inicio</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>

                <div>
                    <label className="font-semibold">Tipo de turno</label>
                    <select
                        value={shiftPattern}
                        onChange={(e) => setShiftPattern(e.target.value)}
                        className="border p-2 rounded w-full"
                    >
                        <option value="day">Día</option>
                        <option value="night">Noche</option>
                        <option value="off">Descanso</option>
                    </select>
                </div>

                <div>
                    <label className="font-semibold">Nota opcional</label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="border p-2 rounded w-full"
                        rows={3}
                    />
                </div>

                <Button type="submit" className="text-white bg-black hover:bg-gray-900">
                    Generar Calendario
                </Button>
            </form>
        </div>
    );
}
