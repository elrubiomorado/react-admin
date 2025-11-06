import { login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import megalogo from '/public/images/megalogo.png';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [darkMode, setDarkMode] = useState(true);

    return (
        <>
            <Head title="Bienvenido">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div
                className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden transition-colors duration-500 ${
                    darkMode
                        ? 'bg-gradient-to-b from-[#0a192f] to-[#112240] text-white'
                        : 'bg-gradient-to-b from-gray-100 to-white text-gray-900'
                }`}
            >
                {/* HEADER */}
                <header className="absolute top-0 flex w-full items-center justify-between px-8 py-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-white shadow-md">
                            <img
                                src={megalogo}
                                alt="Logo Migajeros"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <span className="text-lg font-semibold">Mega</span>
                    </div>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="rounded-lg bg-white/10 p-2 transition hover:bg-white/20"
                    >
                        {darkMode ? (
                            <Sun className="h-5 w-5 text-yellow-400" />
                        ) : (
                            <Moon className="h-5 w-5 text-gray-500" />
                        )}
                    </button>
                </header>

                {/* HERO SECTION */}
                <main className="flex max-w-xl flex-col items-center px-4 text-center">
                    <p className="animate-fadeIn mb-4 mb-8 text-3xl font-bold opacity-90 delay-200 sm:text-4xl">
                        Bienvenido a la Plataforma de Control de
                        Telecomunicaciones.
                    </p>
                    <p className="animate-fadeIn mb-8 opacity-90 delay-200">
                        Gestione, supervise y optimice su comunicación local.
                    </p>

                    {!auth.user && (
                        <div className="animate-fadeIn flex gap-4 delay-500">
                            <Link
                                href={login()}
                                className={`rounded-lg px-6 py-3 font-medium shadow-md transition ${
                                    darkMode
                                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                href={register()}
                                className={`rounded-lg px-6 py-3 font-medium shadow-md transition ${
                                    darkMode
                                        ? 'bg-white text-gray-900 hover:bg-gray-200'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                            >
                                Registrarse
                            </Link>
                        </div>
                    )}
                </main>

                {/* FOOTER */}
                <footer className="absolute bottom-4 text-center text-sm opacity-80">
                    © 2025 Mega — Todos los derechos reservados
                    <br />
                    <span className="text-xs">
                        Team Ingenieros en Desarrollo
                    </span>
                </footer>

                {/* ESTILOS PERSONALIZADOS */}
                <style>
                    {`
            /* --- Animación del texto --- */
            .animated-gradient-text {
              background: linear-gradient(90deg, #60a5fa, #3b82f6, #60a5fa);
              background-size: 200%;
              background-clip: text;
              -webkit-background-clip: text;
              color: #fff;
              animation: shine 4s linear infinite;
            }

            @keyframes shine {
              0% { background-position: 0% 50%; }
              100% { background-position: 200% 50%; }
            }

            /* --- Entrada suave --- */
            .animate-fadeIn {
              opacity: 0;
              transform: translateY(10px);
              animation: fadeInUp 1.5s ease forwards;
            }

            @keyframes fadeInUp {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .delay-200 {
              animation-delay: 0.2s;
            }
            .delay-500 {
              animation-delay: 0.5s;
            }

            /* --- Movimiento flotante leve --- */
            .float-text {
              animation: floaty 6s ease-in-out infinite;
            }

            @keyframes floaty {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
            }
          `}
                </style>
            </div>
        </>
    );
}
