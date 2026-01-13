import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center mt-16">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a RickPedia</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10">
        Explora el multiverso de Rick and Morty.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        <Link
          to="/characters"
          className="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-700 hover:border-accent transition"
        >
          <h2 className="text-xl font-semibold mb-2 text-accent">Personajes</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Explora todos los personajes del multiverso.
          </p>
        </Link>
      </div>
    </div>
  );
}
