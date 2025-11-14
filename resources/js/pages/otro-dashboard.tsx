import { useState } from 'react';

const MisAlarmas = () => {
    const [activeMenu, setActiveMenu] = useState('Mis Alarmas');

    const menuItems = [
        {
            name: 'Dashboard',
            icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
        },
        {
            name: 'Escalas',
            icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        },
        {
            name: 'Homologaciones',
            icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
        },
        {
            name: 'Contactos',
            icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
        },
        {
            name: 'Utilidades',
            icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
        },
        {
            name: 'Mis Alarmas',
            icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        },
    ];

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Sidebar Azul - Lado Izquierdo */}
            <div className="flex w-1/4 flex-col bg-gradient-to-b from-blue-600 to-indigo-700 p-8 text-white">
                <div className="mb-12 flex items-center">
                    <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500">
                        <span className="text-2xl font-bold">JD</span>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">John Duck</h1>
                        <p className="text-lg text-blue-200">
                            Bienvenido a tu panel
                        </p>
                    </div>
                </div>

                <nav className="mt-8 flex-1">
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <button
                                    onClick={() => setActiveMenu(item.name)}
                                    className={`flex w-full items-center rounded-xl p-4 transition duration-200 ${
                                        activeMenu === item.name
                                            ? 'scale-105 transform bg-blue-500 shadow-lg'
                                            : 'hover:bg-blue-500 hover:shadow-md'
                                    }`}
                                >
                                    <svg
                                        className="mr-4 h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d={item.icon}
                                        />
                                    </svg>
                                    <span className="text-lg font-semibold">
                                        {item.name}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="mt-auto border-t border-blue-500 pt-8">
                    <button className="flex w-full items-center rounded-lg p-3 text-blue-200 transition duration-200 hover:bg-blue-500 hover:text-white">
                        <svg
                            className="mr-3 h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        <span className="text-lg font-medium">
                            Cerrar Sesión
                        </span>
                    </button>
                </div>
            </div>

            {/* Contenido Principal - Lado Derecho */}
            <div className="flex-1 overflow-auto p-8">
                <div className="mx-auto max-w-6xl">
                    {/* Header del contenido */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="mb-2 text-4xl font-bold text-gray-800">
                                {activeMenu}
                            </h2>
                            <div className="h-1.5 w-24 rounded-full bg-blue-500"></div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar alarmas..."
                                    className="rounded-xl border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <svg
                                    className="absolute top-3 left-3 h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <div className="rounded-xl bg-white p-2 shadow-sm">
                                <svg
                                    className="h-6 w-6 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/*------------------ Contenido específico según el menú activo--------------------- */}
                    {activeMenu === 'Mis Alarmas' && (
                        <>
                            {/* Estadísticas Rápidas */}
                            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                                <div className="rounded-xl border-l-4 border-blue-500 bg-white p-6 text-center shadow-md">
                                    <div className="mb-2 text-3xl font-bold text-blue-600">
                                        {cronometrosActivos.length}
                                    </div>
                                    <div className="text-gray-600">
                                        Alarmas Totales
                                    </div>
                                </div>
                                <div className="rounded-xl border-l-4 border-green-500 bg-white p-6 text-center shadow-md">
                                    <div className="mb-2 text-3xl font-bold text-green-600">
                                        2
                                    </div>
                                    <div className="text-gray-600">
                                        Alarmas Activas
                                    </div>
                                </div>
                                <div className="rounded-xl border-l-4 border-gray-500 bg-white p-6 text-center shadow-md">
                                    <div className="mb-2 text-3xl font-bold text-gray-600">
                                        2
                                    </div>
                                    <div className="text-gray-600">
                                        Alarmas Inactivas
                                    </div>
                                </div>
                            </div>

                            {/* --------------- Termina las alarmas ---------- */}

                            {/* Lista de Alarmas */}
                            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                                <div className="flex items-center justify-between border-b border-gray-200 p-6">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        Tus Alarmas Configuradas
                                    </h3>
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-500">
                                        4 alarmas
                                    </span>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {/* Alarma 1 */}
                                    <div className="flex items-center justify-between p-6 transition duration-200 hover:bg-blue-50">
                                        <div className="flex items-center">
                                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                                                <svg
                                                    className="h-6 w-6 text-blue-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-800">
                                                    Alarma Matutina
                                                </h4>
                                                <p className="text-gray-600">
                                                    07:30 AM - Lunes a Viernes
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                                Activa
                                            </span>
                                            <div className="relative inline-block w-14 align-middle select-none">
                                                <input
                                                    type="checkbox"
                                                    name="toggle1"
                                                    id="toggle1"
                                                    className="toggle-checkbox hidden"
                                                    defaultChecked
                                                />
                                                <label
                                                    htmlFor="toggle1"
                                                    className="toggle-label block h-7 w-14 cursor-pointer rounded-full bg-green-500 transition duration-200"
                                                ></label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Alarma 2 */}
                                    <div className="flex items-center justify-between p-6 transition duration-200 hover:bg-blue-50">
                                        <div className="flex items-center">
                                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                                                <svg
                                                    className="h-6 w-6 text-blue-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-800">
                                                    Recordatorio Medicación
                                                </h4>
                                                <p className="text-gray-600">
                                                    12:00 PM - Todos los días
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                                Activa
                                            </span>
                                            <div className="relative inline-block w-14 align-middle select-none">
                                                <input
                                                    type="checkbox"
                                                    name="toggle2"
                                                    id="toggle2"
                                                    className="toggle-checkbox hidden"
                                                    defaultChecked
                                                />
                                                <label
                                                    htmlFor="toggle2"
                                                    className="toggle-label block h-7 w-14 cursor-pointer rounded-full bg-green-500 transition duration-200"
                                                ></label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Alarma 3 */}
                                    <div className="flex items-center justify-between p-6 transition duration-200 hover:bg-blue-50">
                                        <div className="flex items-center">
                                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                                                <svg
                                                    className="h-6 w-6 text-blue-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-800">
                                                    Reunión Diaria
                                                </h4>
                                                <p className="text-gray-600">
                                                    09:00 AM - Lunes a Viernes
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                                                Inactiva
                                            </span>
                                            <div className="relative inline-block w-14 align-middle select-none">
                                                <input
                                                    type="checkbox"
                                                    name="toggle3"
                                                    id="toggle3"
                                                    className="toggle-checkbox hidden"
                                                />
                                                <label
                                                    htmlFor="toggle3"
                                                    className="toggle-label block h-7 w-14 cursor-pointer rounded-full bg-gray-300 transition duration-200"
                                                ></label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Alarma 4 */}
                                    <div className="flex items-center justify-between p-6 transition duration-200 hover:bg-blue-50">
                                        <div className="flex items-center">
                                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                                                <svg
                                                    className="h-6 w-6 text-blue-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-800">
                                                    Ejercicio
                                                </h4>
                                                <p className="text-gray-600">
                                                    06:00 PM - Lunes, Miércoles,
                                                    Viernes
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                                                Inactiva
                                            </span>
                                            <div className="relative inline-block w-14 align-middle select-none">
                                                <input
                                                    type="checkbox"
                                                    name="toggle4"
                                                    id="toggle4"
                                                    className="toggle-checkbox hidden"
                                                />
                                                <label
                                                    htmlFor="toggle4"
                                                    className="toggle-label block h-7 w-14 cursor-pointer rounded-full bg-gray-300 transition duration-200"
                                                ></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Botón Agregar Nueva Alarma */}
                                <div className="border-t border-gray-200 bg-gray-50 p-6">
                                    <button className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition duration-200 hover:bg-blue-700">
                                        <svg
                                            className="mr-3 h-6 w-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            ></path>
                                        </svg>
                                        Agregar Nueva Alarma
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Contenido para otros menús (placeholder) */}
                    {activeMenu !== 'Mis Alarmas' && (
                        <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
                            <div className="mx-auto max-w-md">
                                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
                                    <svg
                                        className="h-12 w-12 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d={
                                                menuItems.find(
                                                    (item) =>
                                                        item.name ===
                                                        activeMenu,
                                                )?.icon
                                            }
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-4 text-2xl font-bold text-gray-800">
                                    {activeMenu}
                                </h3>
                                <p className="mb-8 text-gray-600">
                                    Esta sección está en desarrollo. Pronto
                                    podrás acceder a todas las funcionalidades
                                    de {activeMenu.toLowerCase()}.
                                </p>
                                <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700">
                                    Explorar {activeMenu}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MisAlarmas;
