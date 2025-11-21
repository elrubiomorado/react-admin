import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';


const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Utilidades', href: '/utilities' },
    { title: 'Calendarios', href: '/utilities/calendars' },
    { title: 'Editar', href: '#' },
];

export default function Edit({ calendar }: { calendar: any }) {
    const { data, setData, put, processing, errors } = useForm({
        note: calendar.note,
        date: calendar.date ?? '',
    });

    const submit = (e: any) => {
        e.preventDefault();
        put(route('utilities.calendars.update', calendar.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Calendario" />

            <div className="p-6 space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">Editar evento del Calendario</h1>

                <form onSubmit={submit} className="space-y-6 bg-white p-6 rounded-xl shadow">
                    {/* Note */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nota</label>
                        <input
                            type="text"
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                        />
                        {errors.note && (
                            <p className="text-red-600 text-sm">{errors.note}</p>
                        )}
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fecha</label>
                        <input
                            type="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-between pt-4">
                        <Link href="/utilities/calendars">
                            <Button variant="secondary" className="text-gray-700 border border-gray-300 hover:bg-gray-100">
                                Cancelar
                            </Button>
                        </Link>

                        <Button
                            type="submit"
                            disabled={processing}
                            className="text-white shadow-md hover:bg-gray-900"
                        >
                            Actualizar
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
