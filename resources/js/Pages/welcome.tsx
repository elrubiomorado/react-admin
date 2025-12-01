import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
    animate,
    motion,
    useMotionTemplate,
    useMotionValue,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import AppLogo from '/public/images/mega-logo.png';

const COLORS_TOP = ['#292875', '#268d91', '#2a1e57', '#140085'];

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    // Texto "typewriter"
    const fullText = '  -Bienvenido NOC, inicia sesión para continuar.';
    const [text, setText] = useState('');
    useEffect(() => {
        let i = 0;
        setText('');
        const interval = setInterval(() => {
            if (i < fullText.length) {
                setText((p) => p + fullText.charAt(i));
                i++;
            } else clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    // Animación de color para el fondo tipo aurora
    const color = useMotionValue(COLORS_TOP[0]);
    useEffect(() => {
        animate(color, COLORS_TOP, {
            ease: 'easeInOut',
            duration: 10,
            repeat: Infinity,
            repeatType: 'mirror',
        });
    }, []);

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 12%, #020617 50%, ${color})`;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            {/* Fondo aurora + estrellas */}
            <motion.div
                style={{ backgroundImage }}
                className="relative flex h-screen w-full flex-col items-center justify-between overflow-hidden text-white"
            >
                {/* Capa de estrellas con Three.js */}
                <div className="absolute inset-0 z-0">
                    <Canvas>
                        <Stars
                            radius={70}
                            count={2500}
                            factor={3}
                            fade
                            speed={2}
                        />
                    </Canvas>
                </div>

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
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded-full bg-linear-to-r from-[#00f6ff] to-[#7c5cff] px-6 py-3 font-semibold text-black transition-transform hover:scale-105"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
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
                            </>
                        )}
                    </motion.div>
                </div>

                {/* Footer */}
                <footer className="relative z-10 py-4 text-center text-sm text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
                        <p>
                            © 2025 Mega —{' '}
                            <strong>Ingenieros en desarrollo</strong> — Nataly,
                            Edgar y Jesús.
                        </p>

                        <img src={AppLogo} alt="mega" className="h-5 w-5" />
                    </div>
                </footer>
            </motion.div>
        </>
    );
}
