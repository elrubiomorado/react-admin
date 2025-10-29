import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ClockIcon, ChartPieIcon} from '@heroicons/react/24/solid';
import { GoAlertFill } from "react-icons/go";
import Migajerito from '/public/images/Megajerito.jpeg';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">

                    <div className="shadow-xl relative flex flex-col items-center justify-center aspect-video rounded-xl bg-neutral-00 text-slate-900 p-6">
                        <PlaceholderPattern className="absolute inset-0 w-full h-full stroke-white-20" />
                        <ChartPieIcon className="w-12 h-12 z-10 mb-2" />
                        <h2 className="text-lg font-bold z-10 text-center">Cronómetros creados</h2>
                        <p className="text-9xl font-bold mt-2 z-10">12</p>
                    </div>

                    <div className="shadow-xl relative flex flex-col items-center justify-center aspect-video rounded-xl bg-green-00 text-slate-900 p-6">
                        <PlaceholderPattern className="absolute inset-0 w-full h-full stroke-white-20" />
                        <ClockIcon className="w-12 h-12 z-10 mb-2" />
                        <h2 className="text-lg font-semibold z-10 text-center">Cronómetros activos</h2>
                        <p className="text-9xl font-bold mt-2 z-10">14</p>
                    </div>

                    <div className="shadow-xl relative flex flex-col items-center justify-center aspect-video rounded-xl bg-red-00 text-slate-900 p-6">
                        <PlaceholderPattern className="absolute inset-0 w-full h-full stroke-white-20" />
                        <GoAlertFill className="w-12 h-12 z-10 mb-2" />
                        <h2 className="text-lg font-semibold z-10 text-center">Cronómetros vencidos</h2>
                        <p className="text-9xl font-bold mt-2 z-10">21</p>
                    </div>


                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border-70 md:min-h-min dark:border-sidebar-border ">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900-20 dark:stroke-neutral-100-20" />


                                <div className="d-flex align-items-center justify-content-between p-2 rounded shadow-sm"
                                    style={{backgroundColor: "#f1f1f1", borderRadius: "20px", margin:"15px", padding:"7px"}}>

                                        <div className="d-flex align-items-center">
                                            <span className="badge rounded-pill"
                                                  style={{backgroundColor:"#FCFF87", fontSize:"0.9rem", padding:"0.3rem 1rem", width:"120px",
                                                        textAlign:"center", fontWeight:"normal", borderRadius:"80px",  color: "black" }}> En Espera
                                            </span>

                                            <span className='text-secondary me-2' style={{ color: "#999999" }}> #101556 </span>
                                            <strong> Prueba numero 1 </strong>
                                            <span className='text-secondary' style={{ color: "#999999" }} >  Creado por Jhonatan Esquivel,   Prioridad 1,  Energia.
                                            </span>

                                        </div>
                                </div>

                                <div className="d-flex align-items-center justify-content-between p-2 rounded shadow-sm"
                                    style={{backgroundColor: "#f1f1f1", borderRadius: "20px", margin:"15px", padding:"7px"}}>

                                        <div className="d-flex align-items-center">
                                            <span className="badge rounded-pill"
                                                  style={{backgroundColor:"#F66", fontSize:"0.9rem", padding:"0.3rem 1rem", width:"120px",
                                                        textAlign:"center", fontWeight:"normal", borderRadius:"80px",  color: "black" }}> En Proceso
                                            </span>

                                            <span className='text-secondary me-2' style={{ color: "#999999" }}> #103637 </span>
                                            <strong> gggg </strong>
                                            <span className='text-secondary' style={{ color: "#999999" }} >  Creado por Edgar Gonzalez,   Prioridad 1,  Energia.
                                            </span>

                                        </div>
                                </div>

                                <div className="d-flex align-items-center justify-content-between p-2 rounded shadow-sm"
                                    style={{backgroundColor: "#f1f1f1", borderRadius: "20px", margin:"15px", padding:"7px"}}>

                                        <div className="d-flex align-items-center">
                                            <span className="badge rounded-pill"
                                                  style={{backgroundColor:"#6F6", fontSize:"0.9rem", padding:"0.3rem 1rem", width:"120px",
                                                        textAlign:"center", fontWeight:"normal", borderRadius:"80px",  color: "black" }}> En Proceso
                                            </span>

                                            <span className='text-secondary me-2' style={{ color: "#999999" }}> #101874 </span>
                                            <strong> Prueba 1  </strong>
                                            <span className='text-secondary' style={{ color: "#999999" }} >  Creado por Jesus Toledo,   Prioridad 1,  Energia.
                                            </span>

                                        </div>
                                </div>

                                <div className="d-flex align-items-center justify-content-between p-2 rounded shadow-sm"
                                    style={{backgroundColor: "#f1f1f1", borderRadius: "20px",  margin:"15px", padding:"7px"}}>

                                        <div className="d-flex align-items-center">
                                            <span className="badge rounded-pill"
                                                  style={{backgroundColor:"#f5a62f", fontSize:"0.9rem", padding:"0.3rem 1rem", width:"120px",
                                                        textAlign:"center", fontWeight:"normal", borderRadius:"80px",  color: "black" }}> En Proceso
                                            </span>

                                            <span className='text-secondary me-2' style={{ color: "#999999" }}> #144593 </span>
                                            <strong> CFE </strong>
                                            <span className='text-secondary' style={{ color: "#999999" }} >  Creado por Oswaldo Renteria,   Prioridad 2,  Enlaces.
                                            </span>

                                        </div>
                                </div>

                                <div className="d-flex align-items-center justify-content-between p-2 rounded shadow-sm"
                                    style={{backgroundColor: "#f1f1f1", borderRadius: "20px", margin:"15px", padding:"7px"}}>

                                        <div className="d-flex align-items-center">
                                            <span className="badge rounded-pill"
                                                  style={{backgroundColor:"#f66", fontSize:"0.9rem", padding:"0.3rem 1rem", width:"120px",
                                                        textAlign:"center", fontWeight:"normal", borderRadius:"80px",  color: "black" }}> En Proceso
                                            </span>

                                            <span className='text-secondary me-2' style={{ color: "#999999" }}> #101857 </span>
                                            <strong> Pruebitas </strong>
                                            <span className='text-secondary' style={{ color: "#999999" }} >  Creado por Nataly Lopez,   Prioridad 2,  Energia.
                                            </span>

                                        </div>
                                </div>



                            <div className="p-4">

                        </div>
                </div>
            </div>

         <footer className="bg-black text-white py-3 mt-auto">
             <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                 <p className="text-center md:text-left mb-2 md:mb-0">
                     Created by <strong>Ingenieros en desarrollo</strong> Nataly, Edgar y Jesús.
                 </p>
              <img
                 src={Migajerito}
                 alt="Logo migajeros"
                 className="h-10 rounded-md"
                 />
            </div>
        </footer>

        </AppLayout>
    );
}





