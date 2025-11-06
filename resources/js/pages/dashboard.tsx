import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { ChartPieIcon, ClockIcon } from '@heroicons/react/24/solid';
import { Head } from '@inertiajs/react';
import { GoAlertFill } from 'react-icons/go';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
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
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative flex h-52 w-full max-w-xs flex-col items-center justify-center rounded-xl bg-neutral-100 p-3 text-slate-900 shadow-lg">
                        <PlaceholderPattern className="absolute inset-0 h-full w-full stroke-white/20" />
                        <ChartPieIcon className="z-10 mb-1 h-8 w-8" />
                        <h2 className="z-10 text-center text-lg font-bold">
                            Cronómetros creados
                        </h2>
                        <p className="z-10 mt-1 text-7xl font-extrabold">
                            {cronometrosActivos.length}
                        </p>
                    </div>

                    <div className="relative flex h-52 w-full max-w-xs flex-col items-center justify-center rounded-xl bg-neutral-100 p-3 text-slate-900 shadow-lg">
                        <PlaceholderPattern className="absolute inset-0 h-full w-full stroke-white/20" />
                        <ClockIcon className="z-10 mb-1 h-8 w-8" />
                        <h2 className="z-10 text-center text-lg font-bold">
                            Cronómetros activos
                        </h2>
                        <p className="z-10 mt-1 text-7xl font-extrabold">14</p>
                    </div>

                    <div className="relative flex h-52 w-full max-w-xs flex-col items-center justify-center rounded-xl bg-neutral-100 p-3 text-slate-900 shadow-lg">
                        <PlaceholderPattern className="absolute inset-0 h-full w-full stroke-white/20" />
                        <GoAlertFill className="z-10 mb-1 h-8 w-8" />
                        <h2 className="z-10 text-center text-lg font-bold">
                            Cronómetros vencidos
                        </h2>
                        <p className="z-10 mt-1 text-7xl font-extrabold">21</p>
                    </div>
                </div>

                <div className="border-sidebar-border-70 relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="stroke-neutral-900-20 dark:stroke-neutral-100-20 absolute inset-0 size-full" />

                    <div
                        className="d-flex align-items-center justify-content-between flex-wrap rounded shadow-sm"
                        style={{
                            backgroundColor: '#f1f1f1',
                            borderRadius: '20px',
                            margin: '8px 12px',
                            padding: '3px 10px',
                            rowGap: '4px',
                        }}
                    >
                        <div
                            className="d-flex align-items-center flex-wrap"
                            style={{
                                fontSize: '0.9rem',
                                letterSpacing: '0.3px',
                                lineHeight: '1.4',
                                flex: '1 1 auto',
                                minWidth: '250px',
                                gap: '8px',
                            }}
                        >
                            <span
                                className="badge rounded-pill"
                                style={{
                                    backgroundColor: '#F6C343',
                                    fontSize: '0.8rem',
                                    padding: '0.25rem 0.9rem',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    borderRadius: '80px',
                                    color: 'black',
                                    whiteSpace: 'nowrap',
                                    marginRight: '6px',
                                    marginLeft: '0px',
                                    display: 'inline-flex',
                                    width: '110px',
                                    height: '23px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                En Espera
                            </span>

                            <span
                                className="me-2 text-secondary"
                                style={{
                                    color: '#999999',
                                    marginRight: '10px',
                                    marginLeft: '2px',
                                }}
                            >
                                #101556
                            </span>

                            <strong
                                style={{
                                    fontSize: '0.9rem',
                                    marginRight: '10px',
                                    marginLeft: '2px',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Prueba numero 1
                            </strong>

                            <span
                                className="d-flex flex-wrap text-secondary"
                                style={{
                                    color: '#999999',
                                    whiteSpace: 'normal',
                                    lineHeight: '1.4',
                                    marginLeft: '4px',
                                }}
                            >
                                Creado por{' '}
                                <span style={{ margin: '0 8px' }}>
                                    Jhonatan Esquivel,
                                </span>
                                <span style={{ margin: '0 8px' }}>
                                    Prioridad 1,
                                </span>
                                <span style={{ margin: '0 8px' }}>
                                    Energía.
                                </span>
                            </span>
                        </div>
                    </div>

                    <div
                        className="d-flex align-items-center justify-content-between flex-wrap rounded shadow-sm"
                        style={{
                            backgroundColor: '#f1f1f1',
                            borderRadius: '20px',
                            margin: '8px 12px',
                            padding: '3px 10px',
                            rowGap: '4px',
                        }}
                    >
                        <div
                            className="d-flex align-items-center flex-wrap"
                            style={{
                                fontSize: '0.9rem',
                                letterSpacing: '0.3px',
                                lineHeight: '1.4',
                                flex: '1 1 auto',
                                minWidth: '250px',
                                gap: '8px',
                            }}
                        >
                            <span
                                className="badge rounded-pill"
                                style={{
                                    backgroundColor: '#4CAF50',
                                    fontSize: '0.8rem',
                                    padding: '0.25rem 0.9rem',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    borderRadius: '80px',
                                    color: 'black',
                                    whiteSpace: 'nowrap',
                                    marginRight: '6px',
                                    marginLeft: '0px',
                                    display: 'inline-flex',
                                    width: '110px',
                                    height: '23px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                En Espera
                            </span>

                            <span
                                className="me-2 text-secondary"
                                style={{
                                    color: '#999999',
                                    marginRight: '10px',
                                    marginLeft: '2px',
                                }}
                            >
                                #101556
                            </span>

                            <strong
                                style={{
                                    fontSize: '0.9rem',
                                    marginRight: '10px',
                                    marginLeft: '2px',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Prueba numero 2
                            </strong>

                            <span
                                className="d-flex flex-wrap text-secondary"
                                style={{
                                    color: '#999999',
                                    whiteSpace: 'normal',
                                    lineHeight: '1.4',
                                    marginLeft: '4px',
                                }}
                            >
                                Creado por{' '}
                                <span style={{ margin: '0 8px' }}>
                                    Jhonatan Esquivel,
                                </span>
                                <span style={{ margin: '0 8px' }}>
                                    Prioridad 1,
                                </span>
                                <span style={{ margin: '0 8px' }}>
                                    Energía.
                                </span>
                            </span>
                        </div>
                    </div>

                    <div
                        className="d-flex align-items-center justify-content-between flex-wrap rounded shadow-sm"
                        style={{
                            backgroundColor: '#f1f1f1',
                            borderRadius: '20px',
                            margin: '8px 12px',
                            padding: '3px 10px',
                            rowGap: '4px',
                        }}
                    >
                        <div
                            className="d-flex align-items-center flex-wrap"
                            style={{
                                fontSize: '0.9rem',
                                letterSpacing: '0.3px',
                                lineHeight: '1.4',
                                flex: '1 1 auto',
                                minWidth: '250px',
                                gap: '8px',
                            }}
                        >
                            <span
                                className="badge rounded-pill"
                                style={{
                                    backgroundColor: '#4CAF50',
                                    fontSize: '0.8rem',
                                    padding: '0.25rem 0.9rem',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    borderRadius: '80px',
                                    color: 'black',
                                    whiteSpace: 'nowrap',
                                    marginRight: '6px',
                                    marginLeft: '0px',
                                    display: 'inline-flex',
                                    width: '110px',
                                    height: '23px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                En Espera
                            </span>

                            <span
                                className="me-2 text-secondary"
                                style={{
                                    color: '#999999',
                                    marginRight: '10px',
                                    marginLeft: '2px',
                                }}
                            >
                                #101556
                            </span>

                            <strong
                                style={{
                                    fontSize: '0.9rem',
                                    marginRight: '10px',
                                    marginLeft: '2px',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Prueba numero 3
                            </strong>

                            <span
                                className="d-flex flex-wrap text-secondary"
                                style={{
                                    color: '#999999',
                                    whiteSpace: 'normal',
                                    lineHeight: '1.4',
                                    marginLeft: '4px',
                                }}
                            >
                                Creado por{' '}
                                <span style={{ margin: '0 8px' }}>
                                    Jhonatan Esquivel,
                                </span>
                                <span style={{ margin: '0 8px' }}>
                                    Prioridad 1,
                                </span>
                                <span style={{ margin: '0 8px' }}>
                                    Energía.
                                </span>
                            </span>
                        </div>
                    </div>

                    <div
                        className="d-flex align-items-center justify-content-between flex-wrap rounded shadow-sm"
                        style={{
                            backgroundColor: '#f1f1f1',
                            borderRadius: '20px',
                            margin: '8px 12px',
                            padding: '3px 10px',
                            rowGap: '4px',
                        }}
                    >
                        <div
                            className="d-flex align-items-center flex-wrap"
                            style={{
                                fontSize: '0.9rem',
                                letterSpacing: '0.3px',
                                lineHeight: '1.4',
                                flex: '1 1 auto',
                                minWidth: '250px',
                                gap: '8px',
                            }}
                        >
                            <span
                                className="badge rounded-pill"
                                style={{
                                    backgroundColor: '#E68A00',
                                    fontSize: '0.8rem',
                                    padding: '0.25rem 0.9rem',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    borderRadius: '80px',
                                    color: 'black',
                                    whiteSpace: 'nowrap',
                                    marginRight: '6px',
                                    marginLeft: '0px',
                                    display: 'inline-flex',
                                    width: '110px',
                                    height: '23px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                En Espera
                            </span>

                            <span
                                className="me-2 text-secondary"
                                style={{
                                    color: '#999999',
                                    marginRight: '10px',
                                    marginLeft: '2px',
                                }}
                            >
                                #101556
                            </span>

                            <strong
                                style={{
                                    fontSize: '0.9rem',
                                    marginRight: '10px',
                                    marginLeft: '2px',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Prueba numero 4
                            </strong>

                            <span
                                className="d-flex flex-wrap text-secondary"
                                style={{
                                    color: '#999999',
                                    whiteSpace: 'normal',
                                    lineHeight: '1.4',
                                    marginLeft: '4px',
                                }}
                            >
                                Creado por{' '}
                                <span style={{ margin: '0 8px' }}>
                                    Jhonatan Esquivel,
                                </span>
                                <span style={{ margin: '0 8px' }}>
                                    Prioridad 1,
                                </span>
                                <span style={{ margin: '0 8px' }}>
                                    Energía.
                                </span>
                            </span>
                        </div>
                    </div>

                    <div
                        className="d-flex align-items-center justify-content-between flex-wrap rounded shadow-sm"
                        style={{
                            backgroundColor: '#f1f1f1',
                            borderRadius: '20px',
                            margin: '8px 12px',
                            padding: '3px 10px',
                            rowGap: '4px',
                        }}
                    >
                        <div
                            className="d-flex align-items-center flex-wrap"
                            style={{
                                fontSize: '0.9rem',
                                letterSpacing: '0.3px',
                                lineHeight: '1.4',
                                flex: '1 1 auto',
                                minWidth: '250px',
                                gap: '8px',
                            }}
                        >
                            <span
                                className="badge rounded-pill"
                                style={{
                                    backgroundColor: '#D64545',
                                    fontSize: '0.8rem',
                                    padding: '0.25rem 0.9rem',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    borderRadius: '80px',
                                    color: 'black',
                                    whiteSpace: 'nowrap',
                                    marginRight: '6px',
                                    marginLeft: '0px',
                                    display: 'inline-flex',
                                    width: '110px',
                                    height: '23px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                En Espera
                            </span>

                            <span
                                className="me-2 text-secondary"
                                style={{
                                    color: '#999999',
                                    marginRight: '10px',
                                    marginLeft: '2px',
                                }}
                            >
                                #101556
                            </span>

                            <strong
                                style={{
                                    fontSize: '0.9rem',
                                    marginRight: '10px',
                                    marginLeft: '2px',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Prueba numero 5
                            </strong>

                            <span
                                className="d-flex flex-wrap text-secondary"
                                style={{
                                    color: '#999999',
                                    whiteSpace: 'normal',
                                    lineHeight: '1.4',
                                    marginLeft: '4px',
                                }}
                            >
                                Creado por{' '}
                                <span style={{ margin: '0 8px' }}>
                                    Jhonatan Esquivel,
                                </span>
                                <span style={{ margin: '0 8px' }}>
                                    Prioridad 3,
                                </span>
                                <span style={{ margin: '0 8px' }}>
                                    Energia.
                                </span>
                            </span>
                        </div>
                    </div>

                    <div
                        className="d-flex align-items-center justify-content-between flex-wrap rounded shadow-sm"
                        style={{
                            backgroundColor: '#f1f1f1',
                            borderRadius: '20px',
                            margin: '8px 12px',
                            padding: '3px 10px',
                            rowGap: '4px',
                        }}
                    >
                        <div
                            className="d-flex align-items-center flex-wrap"
                            style={{
                                fontSize: '0.9rem',
                                letterSpacing: '0.3px',
                                lineHeight: '1.4',
                                flex: '1 1 auto',
                                minWidth: '250px',
                                gap: '8px',
                            }}
                        >
                            <span
                                className="badge rounded-pill"
                                style={{
                                    backgroundColor: '#4CAF50',
                                    fontSize: '0.8rem',
                                    padding: '0.25rem 0.9rem',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    borderRadius: '80px',
                                    color: 'black',
                                    whiteSpace: 'nowrap',
                                    marginRight: '6px',
                                    marginLeft: '0px',
                                    display: 'inline-flex',
                                    width: '110px',
                                    height: '23px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                En Proceso
                            </span>

                            <span
                                className="me-2 text-secondary"
                                style={{
                                    color: '#999999',
                                    marginRight: '10px',
                                    marginLeft: '2px',
                                }}
                            >
                                #101556
                            </span>

                            <strong
                                style={{
                                    fontSize: '0.9rem',
                                    marginRight: '10px',
                                    marginLeft: '2px',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Prueba numero 6
                            </strong>

                            <span
                                className="d-flex flex-wrap text-secondary"
                                style={{
                                    color: '#999999',
                                    whiteSpace: 'normal',
                                    lineHeight: '1.4',
                                    marginLeft: '4px',
                                }}
                            >
                                Creado por{' '}
                                <span style={{ margin: '0 8px' }}>
                                    Jhonatan Esquivel,
                                </span>
                                <span style={{ margin: '0 8px' }}>
                                    Prioridad 2,
                                </span>
                                <span style={{ margin: '0 8px' }}>
                                    Energía.
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className="p-4"></div>
                </div>
            </div>
        </AppLayout>
    );
}
