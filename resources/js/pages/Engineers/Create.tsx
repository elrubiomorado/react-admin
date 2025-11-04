import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Engineers', href: '/engineers' },
    { title: 'Add', href: '/engineers/create' },
];

interface Props {
    job_titles: any[];
    places: any[];
}

export default function Create({ job_titles, places }: Props) {
    const [form, setForm] = useState({
        name: '',
        job_title_id: '',
        place_id: '',
        teams_user: '',
        email: '',
        phones: [''], // ahora es un array dinámico
    });

    const [infoOpen, setInfoOpen] = useState(false);

    const handleChange = (field: string, value: string | number) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // --- 📱 Manejo de teléfonos dinámicos ---
    const handlePhoneChange = (index: number, value: string) => {
        const updatedPhones = [...form.phones];
        updatedPhones[index] = value;
        setForm((prev) => ({ ...prev, phones: updatedPhones }));
    };

    const addPhone = () => {
        setForm((prev) => ({ ...prev, phones: [...prev.phones, ''] }));
    };

    const removePhone = (index: number) => {
        const updated = form.phones.filter((_, i) => i !== index);
        setForm((prev) => ({ ...prev, phones: updated }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post('/engineers', form, {
            onSuccess: () => {
                setForm({
                    name: '',
                    job_title_id: '',
                    place_id: '',
                    teams_user: '',
                    email: '',
                    phones: [''],
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Engineer" />

            <div className="flex w-full justify-center py-6">
                <div className="w-full max-w-3xl px-6">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Add New Engineer</h1>
                        <Link href="/engineers">
                            <Button>Volver</Button>
                        </Link>
                    </div>

                    {/* 🧭 Información del formulario */}
                    <div className="mb-6">
                        <button
                            type="button"
                            onClick={() => setInfoOpen(!infoOpen)}
                            className="flex w-full items-center justify-between rounded bg-gray-100 px-4 py-2 text-left hover:bg-gray-200"
                        >
                            <span className="font-semibold">
                                Cómo usar este formulario
                            </span>
                            <span>{infoOpen ? '▲' : '▼'}</span>
                        </button>

                        {infoOpen && (
                            <div className="mt-2 rounded border-l-4 border-blue-500 bg-gray-50 p-4 text-sm text-gray-700">
                                <p className="mb-2">
                                    Aquí puedes añadir nuevos ingenieros a la
                                    base de datos.
                                </p>
                                <p>
                                    Si un ingeniero tiene más de un teléfono,
                                    usa el botón “+”.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 🧾 Formulario principal */}
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 gap-4"
                    >
                        <input
                            type="text"
                            placeholder="Nombre del ingeniero"
                            value={form.name}
                            onChange={(e) =>
                                handleChange(
                                    'name',
                                    e.target.value.toUpperCase(),
                                )
                            }
                            className="w-full rounded border px-3 py-2"
                            required
                        />

                        {/* 📱 Teléfonos dinámicos */}
                        <div>
                            <label className="mb-1 block font-semibold">
                                Teléfonos
                            </label>

                            {form.phones.map((phone, index) => (
                                <div
                                    key={index}
                                    className="mb-2 flex items-center gap-2"
                                >
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        placeholder="Teléfono (máx. 10 dígitos)"
                                        value={phone}
                                        onChange={(e) => {
                                            const value = e.target.value
                                                .replace(/\D/g, '') // solo dígitos
                                                .slice(0, 10); // máximo 10
                                            handlePhoneChange(index, value);
                                        }}
                                        className="flex-1 rounded border px-3 py-2"
                                        required
                                    />
                                    {form.phones.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() => removePhone(index)}
                                        >
                                            ✕
                                        </Button>
                                    )}
                                </div>
                            ))}

                            <Button
                                type="button"
                                variant="secondary"
                                onClick={addPhone}
                                disabled={form.phones.length >= 3}
                            >
                                + Agregar teléfono
                            </Button>
                        </div>

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
                            <option value="">Select a position</option>
                            {job_titles.map((jt: any) => (
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
                            <option value="">Select a place</option>
                            {places.map((p: any) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>

                        <Button type="submit">Save Engineer</Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
