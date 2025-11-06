interface Homologacion {
    id: number;
    name: string;
    title_base: string;
    body: string;
}

interface Props {
    homologacion: Homologacion;
    valores: Record<string, string>;
    onChange: (key: string, value: string) => void;
}

export default function FormularioHomologacion({ homologacion }: Props) {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Copiado al portapapeles');
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow">
            <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Vista previa
            </h3>
            <div className="space-y-3">
                <div>
                    <p className="text-sm text-gray-600">Título base:</p>
                    <div className="flex items-center justify-between rounded border bg-gray-50 p-2">
                        <span className="text-gray-800">
                            {homologacion.title_base}
                        </span>
                        <button
                            onClick={() => handleCopy(homologacion.title_base)}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Copiar
                        </button>
                    </div>
                </div>

                <div>
                    <p className="text-sm text-gray-600">Cuerpo:</p>
                    <div className="flex items-center justify-between rounded border bg-gray-50 p-2">
                        <span className="text-gray-800">
                            {homologacion.body}
                        </span>
                        <button
                            onClick={() => handleCopy(homologacion.body)}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Copiar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
