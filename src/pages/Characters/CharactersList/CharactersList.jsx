import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CharactersList.css";

export default function CharactersList({ charactersService }) {
  const [characters, setCharacters] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [paginated, setPaginated] = useState([]);

  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");

  const [showNameOverlay, setShowNameOverlay] = useState(true);
  const [showStatusOverlay, setShowStatusOverlay] = useState(true);
  const [showSpeciesOverlay, setShowSpeciesOverlay] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [totalPages, setTotalPages] = useState(1);
  const [visiblePageNumbers, setVisiblePageNumbers] = useState([]);
  const [showPrevEllipsis, setShowPrevEllipsis] = useState(false);
  const [showNextEllipsis, setShowNextEllipsis] = useState(false);

  const alphabet = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), []);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [availableSpecies, setAvailableSpecies] = useState([]);

  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    charactersService.getAllCharacters().then((data) => {
      setCharacters(data);
      setFiltered(data);
      setAvailableSpecies([...new Set(data.map((c) => c.species))].sort());

      const params = new URLSearchParams(location.search);
      const pageParam = params.get("page");
      const page = pageParam ? +pageParam : 1;
      setCurrentPage(page);

      updatePagination(data, page);
      setIsLoading(false);

      const fragment = window.location.hash.replace("#", "");
      if (fragment) {
        setTimeout(() => {
          const el = document.getElementById(fragment);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 0);
      }
    });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [nameFilter, statusFilter, speciesFilter, selectedLetter, selectedSpecies]);

  const applyFilters = () => {
    let result = [...characters];

    const name = nameFilter.toLowerCase();
    const status = statusFilter.toLowerCase();
    const species = speciesFilter.toLowerCase();

    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(name) &&
        c.status.toLowerCase().includes(status) &&
        c.species.toLowerCase().includes(species)
    );

    if (selectedLetter) {
      result = result.filter(
        (c) => c.name.charAt(0).toUpperCase() === selectedLetter
      );
    }

    if (selectedSpecies) {
      result = result.filter((c) => c.species === selectedSpecies);
    }

    setFiltered(result);
    setCurrentPage(1);
    updatePagination(result, 1);
  };

  const selectLetter = (letter) => {
    setSelectedLetter(letter);
  };

  const clearLetter = () => {
    setSelectedLetter(null);
  };

  const selectSpecies = (specie) => {
    setSelectedSpecies(specie);
  };

  const clearSpecies = () => {
    setSelectedSpecies(null);
  };

  const updatePagination = (list, page) => {
    const totalItems = list.length;
    const pages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    setTotalPages(pages);

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setPaginated(list.slice(start, end));

    const maxVisible = 5;
    const visible = [];

    let startPage = Math.max(2, page - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;

    if (endPage >= pages) {
      endPage = pages - 1;
      startPage = Math.max(2, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) visible.push(i);

    setVisiblePageNumbers(visible);
    setShowPrevEllipsis(startPage > 2);
    setShowNextEllipsis(endPage < pages - 1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      updatePagination(filtered, page);
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  const handlePrevEllipsis = () => goToPage(visiblePageNumbers[0] - 1);
  const handleNextEllipsis = () =>
    goToPage(visiblePageNumbers[visiblePageNumbers.length - 1] + 1);

  const onNameFocus = () => setShowNameOverlay(false);
  const onNameBlur = () => {
    if (!nameFilter) setShowNameOverlay(true);
  };

  const onStatusFocus = () => setShowStatusOverlay(false);
  const onStatusBlur = () => {
    if (!statusFilter) setShowStatusOverlay(true);
  };

  const onSpeciesFocus = () => setShowSpeciesOverlay(false);
  const onSpeciesBlur = () => {
    if (!speciesFilter) setShowSpeciesOverlay(true);
  };

  const goToDetail = (id) => {
    navigate(`/characters/${id}?page=${currentPage}`);
  };

  return (
    <div className="characters-list">
      <section className="section-header">
        <h2>Personajes</h2>
        <p>
          Explora los personajes más icónicos del multiverso. Conoce su especie,
          estado y origen.
        </p>
      </section>

      {isLoading && <div className="spinner-container">Cargando...</div>}

      {!isLoading && (
        <>
          <div className="filter-toggle">
            <button onClick={() => setShowFilterPanel(true)}>
              <span className="material-icons">tune</span> Filtros
            </button>
          </div>

          {showFilterPanel && (
            <div className="filter-panel">
              <div className="panel-header">
                <h3>Filtros</h3>
                <button onClick={() => setShowFilterPanel(false)}>
                  <span className="material-icons">close</span> Cerrar
                </button>
              </div>

              <div className="panel-body">
                <div className="name-field">
                  {!showNameOverlay && <label>Nombre</label>}
                  <input
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    onFocus={onNameFocus}
                    onBlur={onNameBlur}
                  />
                  {showNameOverlay && <div className="static-text">Nombre</div>}
                </div>

                <div className="status-field">
                  {!showStatusOverlay && <label>Estado</label>}
                  <input
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    onFocus={onStatusFocus}
                    onBlur={onStatusBlur}
                  />
                  {showStatusOverlay && <div className="static-text">Estado</div>}
                </div>

                <div className="species-field">
                  {!showSpeciesOverlay && <label>Especie</label>}
                  <input
                    value={speciesFilter}
                    onChange={(e) => setSpeciesFilter(e.target.value)}
                    onFocus={onSpeciesFocus}
                    onBlur={onSpeciesBlur}
                  />
                  {showSpeciesOverlay && (
                    <div className="static-text">Especie</div>
                  )}
                </div>

                <div className="alphabet-index">
                  <span>Filtrar por letra:</span>
                  <div className="index-buttons">
                    {alphabet.map((letter) => (
                      <button
                        key={letter}
                        onClick={() => selectLetter(letter)}
                        className={selectedLetter === letter ? "active" : ""}
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                  {selectedLetter && (
                    <button className="clear-button" onClick={clearLetter}>
                      <span className="material-icons">close</span> Quitar filtro
                      de letra
                    </button>
                  )}
                </div>

                <div className="species-index">
                  <span>Filtrar por especie:</span>
                  <div className="index-buttons">
                    {availableSpecies.map((specie) => (
                      <button
                        key={specie}
                        onClick={() => selectSpecies(specie)}
                        className={selectedSpecies === specie ? "active" : ""}
                      >
                        {specie}
                      </button>
                    ))}
                  </div>
                  {selectedSpecies && (
                    <button className="clear-button" onClick={clearSpecies}>
                      <span className="material-icons">close</span> Quitar filtro
                      de especie
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="card-grid">
            {paginated.map((character) => (
              <div
                key={character.id}
                className="character-card"
                id={`character-${character.id}`}
                onClick={() => goToDetail(character.id)}
              >
                <div className="card-image">
                  <img src={character.image} alt={character.name} />
                </div>
                <div className="card-content">
                  <h3 className="name">{character.name}</h3>
                  <p className="meta">
                    {character.species} ({character.status})
                  </p>
                  <p className="year">
                    Año: {new Date(character.created).getFullYear()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length > 0 && totalPages > 1 ? (
            <div className="pagination-controls">
              <button onClick={prevPage} disabled={currentPage === 1}>
                Anterior
              </button>
              <button
                onClick={() => goToPage(1)}
                className={currentPage === 1 ? "active" : ""}
              >
                1
              </button>
              {showPrevEllipsis && (
                <button onClick={handlePrevEllipsis}>...</button>
              )}
              {visiblePageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={page === currentPage ? "active" : ""}
                >
                  {page}
                </button>
              ))}
              {showNextEllipsis && (
                <button onClick={handleNextEllipsis}>...</button>
              )}
              <button
                onClick={() => goToPage(totalPages)}
                className={currentPage === totalPages ? "active" : ""}
              >
                {totalPages}
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </button>
            </div>
          ) : (
            <div className="pagination-controls">
              <button disabled>Anterior</button>
              <button className="active">1</button>
              <button disabled>Siguiente</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
