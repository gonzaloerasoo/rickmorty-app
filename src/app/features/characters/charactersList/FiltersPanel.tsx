import { useState } from "react";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const SPECIES = [
  "Alien",
  "Animal",
  "Cronenberg",
  "Disease",
  "Human",
  "Humanoid",
  "Mythological Creature",
  "Poopybutthole",
  "Robot",
  "unknown",
];

export default function FiltersPanel({
  name,
  status,
  species,
  onChange,
  onClose,
}: {
  name: string;
  status: string;
  species: string;
  onChange: (v: { name: string; status: string; species: string }) => void;
  onClose: () => void;
}) {
  const [localName, setLocalName] = useState(name);
  const [localStatus, setLocalStatus] = useState(status);
  const [localSpecies, setLocalSpecies] = useState(species);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-surface-light dark:bg-surface-dark border border-accent p-6 rounded-2xl w-full max-w-2xl shadow-xl">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-semibold">Filtros</h3>
          <button
            onClick={onClose}
            className="text-gray-400 text-sm hover:text-accent"
          >
            Cerrar
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Nombre
          </p>
          <input
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-surface-light dark:bg-surface-dark border border-gray-600"
            placeholder="Buscar por nombre"
          />
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Estado
          </p>
          <div className="flex gap-2 flex-wrap">
            {["", "alive", "dead", "unknown"].map((s) => (
              <button
                key={s || "all"}
                onClick={() => setLocalStatus(s)}
                className={`px-3 py-1 rounded-full text-xs border ${
                  localStatus === s
                    ? "bg-accent text-white border-accent"
                    : "border-gray-600 text-gray-300 hover:border-accent"
                }`}
              >
                {s === "" ? "Todos" : s}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Filtrar por letra
          </p>
          <div className="flex flex-wrap gap-1">
            {LETTERS.map((l) => (
              <button
                key={l}
                onClick={() => setLocalName(l)}
                className="w-7 h-7 rounded-full border border-gray-600 text-gray-300 text-xs hover:border-accent hover:text-accent"
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Filtrar por especie
          </p>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {SPECIES.map((sp) => (
              <button
                key={sp}
                onClick={() => setLocalSpecies(sp)}
                className={`px-3 py-1 rounded-full text-xs border ${
                  localSpecies === sp
                    ? "bg-accent text-white border-accent"
                    : "border-gray-600 text-gray-300 hover:border-accent"
                }`}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => {
              setLocalName("");
              setLocalStatus("");
              setLocalSpecies("");
              onChange({ name: "", status: "", species: "" });
            }}
            className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:border-accent hover:text-accent"
          >
            Limpiar
          </button>

          <button
            onClick={() => {
              onChange({
                name: localName,
                status: localStatus,
                species: localSpecies,
              });
              onClose();
            }}
            className="px-5 py-2 rounded-full bg-accent text-white font-semibold"
          >
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  );
}
