import { login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import Migajerito from '/public/images/Megajerito.jpeg';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    // Texto tipo "typewriter"
    const fullText = ' - Bienvenido NOC, inicia sesión para continuar.';
    const [text, setText] = useState('');

    useEffect(() => {
        let i = 0;
        setText('');
        const interval = setInterval(() => {
            if (i < fullText.length) {
                setText((prev) => prev + fullText.charAt(i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);

    // Inicializar partículas
    const particlesInit = useCallback(async (engine: any) => {
        await loadFull(engine);
    }, []);

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-black text-white">
                {/* Partículas de fondo */}
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    className="absolute inset-0 z-0"
                    options={{
                        background: { color: { value: '#000000' } },
                        fpsLimit: 60,
                        fullScreen: { enable: false, zIndex: 1 },
                        particles: {
                            number: {
                                value: 60,
                                density: { enable: true, area: 800 },
                            },
                            color: { value: ['#00f6ff', '#7c5cff', '#00ff9c'] },
                            shape: { type: 'circle' },
                            opacity: { value: 0.5 },
                            size: { value: { min: 10, max: 50 } },
                            move: {
                                enable: true,
                                speed: 2,
                                direction: 'bottom',
                                outModes: { default: 'out' },
                            },
                            links: {
                                enable: true,
                                distance: 150,
                                color: '#00f6ff',
                                opacity: 0.1,
                                width: 1,
                            },
                        },
                        interactivity: {
                            events: {
                                onHover: { enable: true, mode: 'repulse' },
                                resize: true,
                            },
                            modes: {
                                repulse: { distance: 100, duration: 0.3 },
                            },
                        },
                    }}
                />

                {/* Contenido principal */}
                <div className="relative z-10 flex grow flex-col items-center justify-center px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-linear-to-r from-[#00f6ff] via-[#7c5cff] to-[#00ff9c] bg-clip-text text-4xl font-bold text-transparent drop-shadow-[0_8px_30px_rgba(124,92,255,0.15)] md:text-5xl"
                    >
                        {text}
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 1.2 }}
                            className="text-[#00f6ff]"
                        >
                            |
                        </motion.span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="mt-8 flex gap-4"
                    >
                        <Link
                            href={login()}
                            className="rounded-full bg-linear-to-r from-[#00f6ff] to-[#7c5cff] px-6 py-3 font-semibold text-black transition-transform hover:scale-105"
                        >
                            Iniciar sesión
                        </Link>
                        <Link
                            href={register()}
                            className="rounded-full border border-[#7c5cff80] px-6 py-3 transition hover:bg-[#7c5cff1a]"
                        >
                            Crear cuenta
                        </Link>
                    </motion.div>
                </div>

                {/* Footer */}
                <footer className="relative z-10 py-4 text-center text-sm text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
                        <p>
                            Created by <strong>Ingenieros en desarrollo</strong>{' '}
                            — Nataly, Edgar y Jesús.
                        </p>
                        <img
                            src={Migajerito}
                            alt="Logo migajeros"
                            className="h-10 rounded-md border border-[#ffffff10]"
                        />
                    </div>
                </footer>
            </div>
        </>
    );
}
