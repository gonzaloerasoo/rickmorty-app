import { Character } from "../character.model";

export default function Card({ character }: { character: Character }) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-700 hover:border-accent transition">
      <img src={character.image} className="rounded-lg mb-3 w-full" />
      <h2 className="text-lg font-semibold mb-1">{character.name}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {character.species}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {character.status}
      </p>
      <p className="text-xs text-gray-400 mt-1">Año: 2017</p>
    </div>
  );
}
