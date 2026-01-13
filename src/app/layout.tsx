import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Layout() {
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] dark:bg-[url('/space-bg.jpg')] bg-cover bg-fixed">
      <header className="w-full py-5 border-b border-gray-700 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <Link to="/" className="text-2xl font-bold text-accent">
            RickPedia
          </Link>

          <nav className="flex gap-6 text-sm">
            <Link to="/" className="hover:text-accent">
              Inicio
            </Link>
            <Link to="/characters" className="hover:text-accent">
              Personajes
            </Link>
          </nav>

          <button
            onClick={() => setDark(!dark)}
            className="px-4 py-2 rounded-full border border-accent text-accent text-sm"
          >
            Modo oscuro
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <Outlet />
      </main>
    </div>
  );
}
