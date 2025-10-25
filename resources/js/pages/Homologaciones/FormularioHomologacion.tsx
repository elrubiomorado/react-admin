import { ClipboardIcon } from '@heroicons/react/24/solid';

// Interfaz que define la estructura de una homologación
export interface Homologacion {
    id: number;
    name: string;           // Nombre identificador
    title_base: string;     // Plantilla del título con variables {variable}
    body: string;          // Plantilla del cuerpo con variables {variable}
}

// Props para el componente FormularioHomologacion
export interface FormularioHomologacionProps {
    homologacion: Homologacion;
    valores: Record<string, string>;
    onChange: (key: string, value: string) => void;
    renderTexto: (texto: string) => string;
    getVariables: (texto: string) => string[];
}

// Componente que muestra el formulario para llenar variables y previsualizar resultados
export default function FormularioHomologacion({
    homologacion,
    valores,
    onChange,
    renderTexto,
    getVariables,
}: FormularioHomologacionProps) {
    // Obtiene variables únicas del título y cuerpo combinados
    const variables = Array.from(
        new Set([
            ...getVariables(homologacion.title_base || ''),
            ...getVariables(homologacion.body || ''),
        ]),
    );

    // Genera el título y cuerpo final reemplazando variables
    const tituloFinal = renderTexto(homologacion.title_base || '');
    const cuerpoFinal = renderTexto(homologacion.body || '');

    return (
        <div className="space-y-4">
            <p className="font-semibold text-gray-700">
                Completa los campos de la homologación:
            </p>

            {/* Grid de inputs para cada variable encontrada */}
            <div className="grid grid-cols-2 gap-4">
                {variables.map((v) => (
                    <div key={v}>
                        <label className="mb-1 block text-sm text-gray-600">
                            {v}
                        </label>
                        <input
                            type="text"
                            className="w-full rounded border px-3 py-2 focus:ring-1 focus:ring-blue-400 focus:outline-none"
                            value={valores[v] || ''}
                            onChange={(e) => onChange(v, e.target.value)}
                        />
                    </div>
                ))}
            </div>

            {/* Sección de previsualización y copiado */}
            <div className="space-y-2">
                {/* Título generado */}
                <p className="font-semibold text-gray-700">Título generado:</p>
                <div className="flex gap-2">
                    <input
                        readOnly
                        className="w-full rounded border bg-gray-100 p-2"
                        value={tituloFinal}
                    />
                    <button
                        onClick={() =>
                            navigator.clipboard.writeText(tituloFinal)
                        }
                        className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-white"
                    >
                        <ClipboardIcon className="h-5 w-5" /> Copiar
                    </button>
                </div>

                {/* Cuerpo generado */}
                <p className="font-semibold text-gray-700">Cuerpo generado:</p>
                <div className="flex gap-2">
                    <textarea
                        readOnly
                        className="w-full rounded border bg-gray-100 p-2"
                        rows={5}
                        value={cuerpoFinal}
                    />
                    <button
                        onClick={() =>
                            navigator.clipboard.writeText(cuerpoFinal)
                        }
                        className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-white"
                    >
                        <ClipboardIcon className="h-5 w-5" /> Copiar
                    </button>
                </div>
            </div>
        </div>
    );
}
