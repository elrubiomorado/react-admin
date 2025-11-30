import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState } from 'react';

interface Props {
    engineer: {
        id: number;
        name: string;
        email?: string;
        teams_user?: string;
        job_title_id?: number;
        place_id?: number;
        phones?: { phone: string }[];
    };
    job_titles: { id: number; title: string }[];
    places: { id: number; name: string }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/dashboard' },
    { title: 'Ingenieros', href: '/engineers' },
    { title: 'Editar', href: '#' },
];

export default function EditEngineer({ engineer, job_titles, places }: Props) {
    const [form, setForm] = useState({
        name: engineer.name || '',
        email: engineer.email || '',
        teams_user: engineer.teams_user || '',
        job_title_id: engineer.job_title_id || 0,
        place_id: engineer.place_id || 0,
        phones: engineer.phones?.map((p) => p.phone) || [''],
    });

    const handleChange = (field: string, value: string | number | string[]) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handlePhoneChange = (index: number, value: string) => {
        const newPhones = [...form.phones];
        newPhones[index] = value;
        setForm((prev) => ({ ...prev, phones: newPhones }));
    };

    const addPhone = () => {
        setForm((prev) => ({ ...prev, phones: [...prev.phones, ''] }));
    };

    const removePhone = (index: number) => {
        const newPhones = form.phones.filter((_, i) => i !== index);
        setForm((prev) => ({ ...prev, phones: newPhones }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.put(`/engineers/${engineer.id}`, {
            ...form,
            job_title_id: form.job_title_id || null,
            place_id: form.place_id || null,
            engineer_phones: form.phones.filter((p) => p.trim() !== ''),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Ingeniero: ${engineer.name}`} />

            <div className="flex w-full justify-center py-6">
                <div className="w-full max-w-3xl px-6">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Editar Ingeniero</h1>
                        <Link href="/engineers">
                            <Button>Volver</Button>
                        </Link>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 gap-4"
                    >
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={form.name}
                            onChange={(e) =>
                                handleChange('name', e.target.value)
                            }
                            className="w-full rounded border px-3 py-2"
                            required
                        />

                        <input
                            type="email"
                            placeholder="Correo"
                            value={form.email}
                            onChange={(e) =>
                                handleChange('email', e.target.value)
                            }
                            className="w-full rounded border px-3 py-2"
                        />

                        <input
                            type="text"
                            placeholder="Usuario Teams"
                            value={form.teams_user}
                            onChange={(e) =>
                                handleChange('teams_user', e.target.value)
                            }
                            className="w-full rounded border px-3 py-2"
                        />

                        <select
                            value={form.job_title_id}
                            onChange={(e) =>
                                handleChange(
                                    'job_title_id',
                                    Number(e.target.value),
                                )
                            }
                            className="w-full rounded border px-3 py-2"
                        >
                            <option value={0}>Selecciona un puesto</option>
                            {job_titles.map((jt) => (
                                <option key={jt.id} value={jt.id}>
                                    {jt.title}
                                </option>
                            ))}
                        </select>

                        <select
                            value={form.place_id}
                            onChange={(e) =>
                                handleChange('place_id', Number(e.target.value))
                            }
                            className="w-full rounded border px-3 py-2"
                        >
                            <option value={0}>Selecciona una plaza</option>
                            {places.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>

                        <div className="grid gap-2">
                            {form.phones.map((phone, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Teléfono"
                                        value={phone}
                                        onChange={(e) =>
                                            handlePhoneChange(
                                                idx,
                                                e.target.value,
                                            )
                                        }
                                        className="flex-1 rounded border px-3 py-2"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removePhone(idx)}
                                        className="rounded bg-red-500 px-3 text-white hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addPhone}
                                className="rounded bg-blue-500 px-3 text-white hover:bg-blue-600"
                            >
                                Agregar teléfono
                            </button>
                        </div>

                        <Button type="submit">Guardar cambios</Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
