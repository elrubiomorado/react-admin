import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { ChartPieIcon, ClockIcon } from '@heroicons/react/24/solid';
import { Head } from '@inertiajs/react';
import { GoAlertFill } from 'react-icons/go';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inicio',
        href: dashboard().url,
    },
];

export default function Dashboard({
    cronometrosActivos,
}: {
    cronometrosActivos: any[];
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inicio" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="bg-neutral-00 relative flex aspect-video flex-col items-center justify-center rounded-xl p-6 text-slate-900 shadow-xl">
                        <PlaceholderPattern className="stroke-white-20 absolute inset-0 h-full w-full" />
                        <ChartPieIcon className="z-10 mb-2 h-12 w-12" />
                        <h2 className="z-10 text-center text-lg font-bold">
                            Cronómetros creados
                        </h2>
                        <p className="z-10 mt-2 text-9xl font-bold">
                            {cronometrosActivos.length}
                        </p>
                    </div>

                    <div className="bg-green-00 relative flex aspect-video flex-col items-center justify-center rounded-xl p-6 text-slate-900 shadow-xl">
                        <PlaceholderPattern className="stroke-white-20 absolute inset-0 h-full w-full" />
                        <ClockIcon className="z-10 mb-2 h-12 w-12" />
                        <h2 className="z-10 text-center text-lg font-semibold">
                            Cronómetros activos
                        </h2>
                        <p className="z-10 mt-2 text-9xl font-bold">14</p>
                    </div>

                    <div className="bg-red-00 relative flex aspect-video flex-col items-center justify-center rounded-xl p-6 text-slate-900 shadow-xl">
                        <PlaceholderPattern className="stroke-white-20 absolute inset-0 h-full w-full" />
                        <GoAlertFill className="z-10 mb-2 h-12 w-12" />
                        <h2 className="z-10 text-center text-lg font-semibold">
                            Cronómetros vencidos
                        </h2>
                        <p className="z-10 mt-2 text-9xl font-bold">21</p>
                    </div>
                </div>
                <div className="min-h-screen[100vh] border-sidebar-border-70 relative flex-1 overflow-hidden rounded-xl border md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="stroke-neutral-900-20 dark:stroke-neutral-100-20 absolute inset-0 size-full" />

                    <div
                        className="d-flex align-items-center justify-content-between rounded p-2 shadow-sm"
                        style={{
                            backgroundColor: '#f1f1f1',
                            borderRadius: '20px',
                            margin: '15px',
                            padding: '7px',
                        }}
                    >
                        <div className="d-flex align-items-center">
                            <span
                                className="badge rounded-pill"
                                style={{
                                    backgroundColor: '#FCFF87',
                                    fontSize: '0.9rem',
                                    padding: '0.3rem 1rem',
                                    width: '120px',
                                    textAlign: 'center',
                                    fontWeight: 'normal',
                                    borderRadius: '80px',
                                    color: 'black',
                                }}
                            >
                                {' '}
                                En Espera
                            </span>

                            <span
                                className="me-2 text-secondary"
                                style={{ color: '#999999' }}
                            >
                                {' '}
                                #101556{' '}
                            </span>
                            <strong> Prueba numero 1 </strong>
                            <span
                                className="text-secondary"
                                style={{ color: '#999999' }}
                            >
                                {' '}
                                Creado por Jhonatan Esquivel, Prioridad 1,
                                Energia.
                            </span>
                        </div>
                    </div>

                    <div
                        className="d-flex align-items-center justify-content-between rounded p-2 shadow-sm"
                        style={{
                            backgroundColor: '#f1f1f1',
                            borderRadius: '20px',
                            margin: '15px',
                            padding: '7px',
                        }}
                    >
                        <div className="d-flex align-items-center">
                            <span
                                className="badge rounded-pill"
                                style={{
                                    backgroundColor: '#F66',
                                    fontSize: '0.9rem',
                                    padding: '0.3rem 1rem',
                                    width: '120px',
                                    textAlign: 'center',
                                    fontWeight: 'normal',
                                    borderRadius: '80px',
                                    color: 'black',
                                }}
                            >
                                {' '}
                                En Proceso
                            </span>

                            <span
                                className="me-2 text-secondary"
                                style={{ color: '#999999' }}
                            >
                                {' '}
                                #103637{' '}
                            </span>
                            <strong> Limpieza de red </strong>
                            <span
                                className="text-secondary"
                                style={{ color: '#999999' }}
                            >
                                {' '}
                                Creado por Edgar Gonzalez, Prioridad 1, Energia.
                            </span>
                        </div>
                    </div>

                    <div
                        className="d-flex align-items-center justify-content-between rounded p-2 shadow-sm"
                        style={{
                            backgroundColor: '#f1f1f1',
                            borderRadius: '20px',
                            margin: '15px',
                            padding: '7px',
                        }}
                    >
                        <div className="d-flex align-items-center">
                            <span
                                className="badge rounded-pill"
                                style={{
                                    backgroundColor: '#6F6',
                                    fontSize: '0.9rem',
                                    padding: '0.3rem 1rem',
                                    width: '120px',
                                    textAlign: 'center',
                                    fontWeight: 'normal',
                                    borderRadius: '80px',
                                    color: 'black',
                                }}
                            >
                                {' '}
                                En Proceso
                            </span>

                            <span
                                className="me-2 text-secondary"
                                style={{ color: '#999999' }}
                            >
                                {' '}
                                #101874{' '}
                            </span>
                            <strong> Prueba 1 </strong>
                            <span
                                className="text-secondary"
                                style={{ color: '#999999' }}
                            >
                                {' '}
                                Creado por Jesus Toledo, Prioridad 1, Energia.
                            </span>
                        </div>
                    </div>

                    <div
                        className="d-flex align-items-center justify-content-between rounded p-2 shadow-sm"
                        style={{
                            backgroundColor: '#f1f1f1',
                            borderRadius: '20px',
                            margin: '15px',
                            padding: '7px',
                        }}
                    >
                        <div className="d-flex align-items-center">
                            <span
                                className="badge rounded-pill"
                                style={{
                                    backgroundColor: '#f5a62f',
                                    fontSize: '0.9rem',
                                    padding: '0.3rem 1rem',
                                    width: '120px',
                                    textAlign: 'center',
                                    fontWeight: 'normal',
                                    borderRadius: '80px',
                                    color: 'black',
                                }}
                            >
                                {' '}
                                En Proceso
                            </span>

                            <span
                                className="me-2 text-secondary"
                                style={{ color: '#999999' }}
                            >
                                {' '}
                                #144593{' '}
                            </span>
                            <strong> CFE </strong>
                            <span
                                className="text-secondary"
                                style={{ color: '#999999' }}
                            >
                                {' '}
                                Creado por Oswaldo Renteria, Prioridad 2,
                                Enlaces.
                            </span>
                        </div>
                    </div>

                    <div
                        className="d-flex align-items-center justify-content-between rounded p-2 shadow-sm"
                        style={{
                            backgroundColor: '#f1f1f1',
                            borderRadius: '20px',
                            margin: '15px',
                            padding: '7px',
                        }}
                    >
                        <div className="d-flex align-items-center">
                            <span
                                className="badge rounded-pill"
                                style={{
                                    backgroundColor: '#f66',
                                    fontSize: '0.9rem',
                                    padding: '0.3rem 1rem',
                                    width: '120px',
                                    textAlign: 'center',
                                    fontWeight: 'normal',
                                    borderRadius: '80px',
                                    color: 'black',
                                }}
                            >
                                {' '}
                                En Proceso
                            </span>

                            <span
                                className="me-2 text-secondary"
                                style={{ color: '#999999' }}
                            >
                                {' '}
                                #101857{' '}
                            </span>
                            <strong> Pruebitas </strong>
                            <span
                                className="text-secondary"
                                style={{ color: '#999999' }}
                            >
                                {' '}
                                Creado por Nataly Lopez, Prioridad 2, Energia.
                            </span>
                        </div>
                    </div>

                    <div className="p-4"></div>
                </div>
            </div>
        </AppLayout>
    );
}
