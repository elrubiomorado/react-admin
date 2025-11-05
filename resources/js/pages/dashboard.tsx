import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ClockIcon, ChartPieIcon} from '@heroicons/react/24/solid';
import { GoAlertFill } from "react-icons/go";



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ cronometrosActivos }: { cronometrosActivos: any[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">

                    <div className="shadow-lg relative flex flex-col items-center justify-center rounded-xl bg-neutral-100 text-slate-900 p-3 h-52 w-full max-w-xs">
                        <PlaceholderPattern className="absolute inset-0 w-full h-full stroke-white/20" />
                        <ChartPieIcon className="w-8 h-8 z-10 mb-1" />
                        <h2 className="text-lg font-bold z-10 text-center">Cronómetros creados</h2>
                        <p className="text-7xl font-extrabold mt-1 z-10">{cronometrosActivos.length}</p>
                    </div>

                    <div className="shadow-lg relative flex flex-col items-center justify-center rounded-xl bg-neutral-100 text-slate-900 p-3 h-52 w-full max-w-xs">
                        <PlaceholderPattern className="absolute inset-0 w-full h-full stroke-white/20" />
                        <ClockIcon className="w-8 h-8 z-10 mb-1" />
                        <h2 className="text-lg font-bold z-10 text-center">Cronómetros activos</h2>
                        <p className="text-7xl font-extrabold mt-1 z-10">14</p>
                    </div>

                    <div className="shadow-lg relative flex flex-col items-center justify-center rounded-xl bg-neutral-100 text-slate-900 p-3 h-52 w-full max-w-xs">
                        <PlaceholderPattern className="absolute inset-0 w-full h-full stroke-white/20" />
                        <GoAlertFill className="w-8 h-8 z-10 mb-1" />
                        <h2 className="text-lg font-bold z-10 text-center">Cronómetros vencidos</h2>
                        <p className="text-7xl font-extrabold mt-1 z-10">21</p>
                    </div>


                </div>

                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border-70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900-20 dark:stroke-neutral-100-20" />

<div
  className="d-flex align-items-center justify-content-between flex-wrap rounded shadow-sm"
  style={{
    backgroundColor: "#f1f1f1",
    borderRadius: "20px",
    margin: "8px 12px",
    padding: "3px 10px", 
    rowGap: "4px",
  }}
>
  <div
    className="d-flex align-items-center flex-wrap"
    style={{
      fontSize: "0.9rem",
      letterSpacing: "0.3px",
      lineHeight: "1.4",
      flex: "1 1 auto",
      minWidth: "250px",
      gap: "8px",
    }}
  >
    <span
      className="badge rounded-pill"
      style={{
        backgroundColor: "#F6C343",
        fontSize: "0.8rem",
        padding: "0.25rem 0.9rem",
        textAlign: "center",
        fontWeight: "600",
        borderRadius: "80px",
        color: "black",
        whiteSpace: "nowrap",
        marginRight: "6px",
        marginLeft: "0px", 
        display: "inline-flex",
        width: "110px",
        height: "23px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      En Espera
    </span>

    <span
      className="text-secondary me-2"
      style={{
        color: "#999999",
        marginRight: "10px",
        marginLeft: "2px",
      }}
    >
      #101556
    </span>

    <strong
      style={{
        fontSize: "0.9rem",
        marginRight: "10px",
        marginLeft: "2px",
        whiteSpace: "nowrap",
      }}
    >
      Prueba numero 1
    </strong>

    <span
      className="text-secondary d-flex flex-wrap"
      style={{
        color: "#999999",
        whiteSpace: "normal",
        lineHeight: "1.4",
        marginLeft: "4px",
      }}
    >
      Creado por{" "}
      <span style={{ margin: "0 8px" }}>Jhonatan Esquivel,</span>
      <span style={{ margin: "0 8px" }}>Prioridad 1,</span>
      <span style={{ margin: "0 8px" }}>Energía.</span>
    </span>
  </div>
</div>

<div
  className="d-flex align-items-center justify-content-between flex-wrap rounded shadow-sm"
  style={{
    backgroundColor: "#f1f1f1",
    borderRadius: "20px",
    margin: "8px 12px",
    padding: "3px 10px", 
    rowGap: "4px",
  }}
>
  <div
    className="d-flex align-items-center flex-wrap"
    style={{
      fontSize: "0.9rem",
      letterSpacing: "0.3px",
      lineHeight: "1.4",
      flex: "1 1 auto",
      minWidth: "250px",
      gap: "8px",
    }}
  >
    <span
      className="badge rounded-pill"
      style={{
        backgroundColor: "#4CAF50",
        fontSize: "0.8rem",
        padding: "0.25rem 0.9rem",
        textAlign: "center",
        fontWeight: "600",
        borderRadius: "80px",
        color: "black",
        whiteSpace: "nowrap",
        marginRight: "6px",
        marginLeft: "0px", 
        display: "inline-flex",
        width: "110px",
        height: "23px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      En Espera
    </span>

    <span
      className="text-secondary me-2"
      style={{
        color: "#999999",
        marginRight: "10px",
        marginLeft: "2px",
      }}
    >
      #101556
    </span>

    <strong
      style={{
        fontSize: "0.9rem",
        marginRight: "10px",
        marginLeft: "2px",
        whiteSpace: "nowrap",
      }}
    >
      Prueba numero 2
    </strong>

    <span
      className="text-secondary d-flex flex-wrap"
      style={{
        color: "#999999",
        whiteSpace: "normal",
        lineHeight: "1.4",
        marginLeft: "4px",
      }}
    >
      Creado por{" "}
      <span style={{ margin: "0 8px" }}>Jhonatan Esquivel,</span>
      <span style={{ margin: "0 8px" }}>Prioridad 1,</span>
      <span style={{ margin: "0 8px" }}>Energía.</span>
    </span>
  </div>
</div>

<div
  className="d-flex align-items-center justify-content-between flex-wrap rounded shadow-sm"
  style={{
    backgroundColor: "#f1f1f1",
    borderRadius: "20px",
    margin: "8px 12px",
    padding: "3px 10px", 
    rowGap: "4px",
  }}
>
  <div
    className="d-flex align-items-center flex-wrap"
    style={{
      fontSize: "0.9rem",
      letterSpacing: "0.3px",
      lineHeight: "1.4",
      flex: "1 1 auto",
      minWidth: "250px",
      gap: "8px",
    }}
  >
    <span
      className="badge rounded-pill"
      style={{
        backgroundColor: "#4CAF50",
        fontSize: "0.8rem",
        padding: "0.25rem 0.9rem",
        textAlign: "center",
        fontWeight: "600",
        borderRadius: "80px",
        color: "black",
        whiteSpace: "nowrap",
        marginRight: "6px",
        marginLeft: "0px",
        display: "inline-flex",
        width: "110px",
        height: "23px",
        alignItems: "center",
        justifyContent: "center", 
      }}
    >
      En Espera
    </span>

    <span
      className="text-secondary me-2"
      style={{
        color: "#999999",
        marginRight: "10px",
        marginLeft: "2px",
      }}
    >
      #101556
    </span>

    <strong
      style={{
        fontSize: "0.9rem",
        marginRight: "10px",
        marginLeft: "2px",
        whiteSpace: "nowrap",
      }}
    >
      Prueba numero 3
    </strong>

    <span
      className="text-secondary d-flex flex-wrap"
      style={{
        color: "#999999",
        whiteSpace: "normal",
        lineHeight: "1.4",
        marginLeft: "4px",
      }}
    >
      Creado por{" "}
      <span style={{ margin: "0 8px" }}>Jhonatan Esquivel,</span>
      <span style={{ margin: "0 8px" }}>Prioridad 1,</span>
      <span style={{ margin: "0 8px" }}>Energía.</span>
    </span>
  </div>
</div>

<div
  className="d-flex align-items-center justify-content-between flex-wrap rounded shadow-sm"
  style={{
    backgroundColor: "#f1f1f1",
    borderRadius: "20px",
    margin: "8px 12px",
    padding: "3px 10px", 
    rowGap: "4px",
  }}
>
  <div
    className="d-flex align-items-center flex-wrap"
    style={{
      fontSize: "0.9rem",
      letterSpacing: "0.3px",
      lineHeight: "1.4",
      flex: "1 1 auto",
      minWidth: "250px",
      gap: "8px",
    }}
  >
    <span
      className="badge rounded-pill"
      style={{
        backgroundColor: "#E68A00",
        fontSize: "0.8rem",
        padding: "0.25rem 0.9rem",
        textAlign: "center",
        fontWeight: "600",
        borderRadius: "80px",
        color: "black",
        whiteSpace: "nowrap",
        marginRight: "6px",
        marginLeft: "0px", 
        display: "inline-flex",
        width: "110px",
        height: "23px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      En Espera
    </span>

    <span
      className="text-secondary me-2"
      style={{
        color: "#999999",
        marginRight: "10px",
        marginLeft: "2px",
      }}
    >
      #101556
    </span>

    <strong
      style={{
        fontSize: "0.9rem",
        marginRight: "10px",
        marginLeft: "2px",
        whiteSpace: "nowrap",
      }}
    >
      Prueba numero 4
    </strong>

    <span
      className="text-secondary d-flex flex-wrap"
      style={{
        color: "#999999",
        whiteSpace: "normal",
        lineHeight: "1.4",
        marginLeft: "4px",
      }}
    >
      Creado por{" "}
      <span style={{ margin: "0 8px" }}>Jhonatan Esquivel,</span>
      <span style={{ margin: "0 8px" }}>Prioridad 1,</span>
      <span style={{ margin: "0 8px" }}>Energía.</span>
    </span>
  </div>
</div>

<div
  className="d-flex align-items-center justify-content-between flex-wrap rounded shadow-sm"
  style={{
    backgroundColor: "#f1f1f1",
    borderRadius: "20px",
    margin: "8px 12px",
    padding: "3px 10px", 
    rowGap: "4px",
  }}
>
  <div
    className="d-flex align-items-center flex-wrap"
    style={{
      fontSize: "0.9rem",
      letterSpacing: "0.3px",
      lineHeight: "1.4",
      flex: "1 1 auto",
      minWidth: "250px",
      gap: "8px",
    }}
  >
    <span
      className="badge rounded-pill"
      style={{
        backgroundColor: "#D64545",
        fontSize: "0.8rem",
        padding: "0.25rem 0.9rem",
        textAlign: "center",
        fontWeight: "600",
        borderRadius: "80px",
        color: "black",
        whiteSpace: "nowrap",
        marginRight: "6px",
        marginLeft: "0px", 
        display: "inline-flex",
        width: "110px",
        height: "23px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      En Espera
    </span>

    <span
      className="text-secondary me-2"
      style={{
        color: "#999999",
        marginRight: "10px",
        marginLeft: "2px",
      }}
    >
      #101556
    </span>

    <strong
      style={{
        fontSize: "0.9rem",
        marginRight: "10px",
        marginLeft: "2px",
        whiteSpace: "nowrap",
      }}
    >
      Prueba numero 5
    </strong>

    <span
      className="text-secondary d-flex flex-wrap"
      style={{
        color: "#999999",
        whiteSpace: "normal",
        lineHeight: "1.4",
        marginLeft: "4px",
      }}
    >
      Creado por{" "}
      <span style={{ margin: "0 8px" }}>Jhonatan Esquivel,</span>
      <span style={{ margin: "0 8px" }}>Prioridad 3,</span>
      <span style={{ margin: "0 8px" }}>Energia.</span>
    </span>
  </div>
</div>

<div
  className="d-flex align-items-center justify-content-between flex-wrap rounded shadow-sm"
  style={{
    backgroundColor: "#f1f1f1",
    borderRadius: "20px",
    margin: "8px 12px",
    padding: "3px 10px", 
    rowGap: "4px",
  }}
>
  <div
    className="d-flex align-items-center flex-wrap"
    style={{
      fontSize: "0.9rem",
      letterSpacing: "0.3px",
      lineHeight: "1.4",
      flex: "1 1 auto",
      minWidth: "250px",
      gap: "8px",
    }}
  >
    <span
      className="badge rounded-pill"
      style={{
        backgroundColor: "#4CAF50",
        fontSize: "0.8rem",
        padding: "0.25rem 0.9rem",
        textAlign: "center",
        fontWeight: "600",
        borderRadius: "80px",
        color: "black",
        whiteSpace: "nowrap",
        marginRight: "6px",
        marginLeft: "0px", 
        display: "inline-flex",
        width: "110px",
        height: "23px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      En Proceso
    </span>

    <span
      className="text-secondary me-2"
      style={{
        color: "#999999",
        marginRight: "10px",
        marginLeft: "2px",
      }}
    >
      #101556
    </span>

    <strong
      style={{
        fontSize: "0.9rem",
        marginRight: "10px",
        marginLeft: "2px",
        whiteSpace: "nowrap",
      }}
    >
      Prueba numero 6
    </strong>

    <span
      className="text-secondary d-flex flex-wrap"
      style={{
        color: "#999999",
        whiteSpace: "normal",
        lineHeight: "1.4",
        marginLeft: "4px",
      }}
    >
      Creado por{" "}
      <span style={{ margin: "0 8px" }}>Jhonatan Esquivel,</span>
      <span style={{ margin: "0 8px" }}>Prioridad 2,</span>
      <span style={{ margin: "0 8px" }}>Energía.</span>
    </span>
  </div>
</div>







                            <div className="p-4">

                        </div>
                </div> 
                
            </div>



        </AppLayout>
    );
}
