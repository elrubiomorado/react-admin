import { dashboard, login, register } from "@/routes";
import { type SharedData } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import Migajerito from "/public/images/Megajerito.jpeg";
import { Sun, Moon } from "lucide-react";

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
        className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 relative overflow-hidden ${
          darkMode
            ? "text-white bg-gradient-to-b from-[#0a192f] to-[#112240]"
            : "text-gray-900 bg-gradient-to-b from-gray-100 to-white"
        }`}
      >
        {/* HEADER */}
        <header className="absolute top-0 w-full flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-md">
              <img
                src={Migajerito}
                alt="Logo Migajeros"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-lg font-semibold">Mega</span>
          </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                >
                {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                <Moon className="w-5 h-5 text-gray-500" />
                )}
              </button>
        </header>

        {/* HERO SECTION */}
        <main className="flex flex-col items-center text-center max-w-xl px-4">
          <p className="mb-8 opacity-90 animate-fadeIn delay-200 text-3xl sm:text-4xl font-bold mb-4">
            Bienvenido a la Plataforma de Control de Telecomunicaciones.
          </p>
          <p className="mb-8 opacity-90 animate-fadeIn delay-200">
            Gestione, supervise y optimice su comunicación local.
          </p>

          {!auth.user && (
            <div className="flex gap-4 animate-fadeIn delay-500">
              <Link
                href={login()}
                className={`px-6 py-3 rounded-lg font-medium shadow-md transition ${
                  darkMode
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Iniciar Sesión
              </Link>
              <Link
                href={register()}
                className={`px-6 py-3 rounded-lg font-medium shadow-md transition ${
                  darkMode
                    ? "bg-white text-gray-900 hover:bg-gray-200"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Registrarse
              </Link>
            </div>
          )}
        </main>

        {/* FOOTER */}
        <footer className="absolute bottom-4 text-sm opacity-80 text-center">
          © 2025 Mega — Todos los derechos reservados<br />
          <span className="text-xs">Team Ingenieros en Desarrollo</span>
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
