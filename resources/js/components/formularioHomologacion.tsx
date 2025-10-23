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
    alert("Copiado al portapapeles");
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Vista previa</h3>
      <div className="space-y-3">
        <div>
          <p className="text-gray-600 text-sm">Título base:</p>
          <div className="flex justify-between items-center bg-gray-50 border rounded p-2">
            <span className="text-gray-800">{homologacion.title_base}</span>
            <button
              onClick={() => handleCopy(homologacion.title_base)}
              className="text-blue-600 text-sm hover:underline"
            >
              Copiar
            </button>
          </div>
        </div>

        <div>
          <p className="text-gray-600 text-sm">Cuerpo:</p>
          <div className="flex justify-between items-center bg-gray-50 border rounded p-2">
            <span className="text-gray-800">{homologacion.body}</span>
            <button
              onClick={() => handleCopy(homologacion.body)}
              className="text-blue-600 text-sm hover:underline"
            >
              Copiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
