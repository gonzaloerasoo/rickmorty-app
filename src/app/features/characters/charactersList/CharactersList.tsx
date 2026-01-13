import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCharactersList } from "./useCharactersList";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import FiltersPanel from "./FiltersPanel";
import PaginationBar from "./PaginationBar";

export default function CharactersList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get("page") || "1");
  const name = searchParams.get("name") || "";
  const status = searchParams.get("status") || "";
  const species = searchParams.get("species") || "";

  const [showFilters, setShowFilters] = useState(false);

  const { data, totalPages, loading, error } = useCharactersList({
    page,
    name,
    status,
    species,
  });

  useEffect(() => {
    const savedScroll = sessionStorage.getItem("scrollY");
    if (savedScroll) {
      window.scrollTo(0, Number(savedScroll));
      sessionStorage.removeItem("scrollY");
    }
  }, []);

  const updateURL = (next: {
    page?: number;
    name?: string;
    status?: string;
    species?: string;
  }) => {
    const params: Record<string, string> = {};
    const p = next.page ?? page;
    const n = next.name ?? name;
    const s = next.status ?? status;
    const sp = next.species ?? species;

    if (p !== 1) params.page = String(p);
    if (n) params.name = n;
    if (s) params.status = s;
    if (sp) params.species = sp;

    setSearchParams(params);
  };

  const handleFiltersChange = (next: {
    name: string;
    status: string;
    species: string;
  }) => {
    updateURL({ page: 1, ...next });
  };

  const handlePageChange = (nextPage: number) => {
    updateURL({ page: nextPage });
  };

  const handleCardClick = (id: number) => {
    sessionStorage.setItem("scrollY", String(window.scrollY));
    navigate(`/characters/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-2">Personajes</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Explora los personajes más icónicos del multiverso. Conoce su especie,
        estado y origen.
      </p>

      <div className="flex justify-between mb-6">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {name || status || species ? "Filtros activos" : "Sin filtros"}
        </div>
        <button
          onClick={() => setShowFilters(true)}
          className="px-4 py-2 rounded-full border border-accent text-accent text-sm"
        >
          Filtros
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <p className="text-center mt-10">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {data.map((char) => (
              <div
                key={char.id}
                onClick={() => handleCardClick(char.id)}
                className="cursor-pointer"
              >
                <Card character={char} />
              </div>
            ))}
          </div>

          <PaginationBar
            page={page}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        </>
      )}

      {showFilters && (
        <FiltersPanel
          name={name}
          status={status}
          species={species}
          onChange={handleFiltersChange}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
}
