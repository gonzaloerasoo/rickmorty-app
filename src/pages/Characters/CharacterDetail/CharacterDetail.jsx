import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./CharacterDetail.css";

export default function CharacterDetail({ charactersService }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageToReturn, setPageToReturn] = useState(1);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const params = new URLSearchParams(location.search);
    const pageParam = params.get("page");
    if (pageParam) {
      setPageToReturn(+pageParam || 1);
    }

    charactersService
      .getCharacterById(id)
      .then((data) => {
        setCharacter(data);
        fetchEpisodes(data.episode);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [id, location.search, charactersService]);

  const fetchEpisodes = (episodeUrls) => {
    if (!episodeUrls || episodeUrls.length === 0) return;

    Promise.all(episodeUrls.map((url) => fetch(url).then((res) => res.json())))
      .then((data) => {
        setEpisodes(data);
      })
      .catch(() => {
        setEpisodes([]);
      });
  };

  const goBack = () => {
    if (!character) {
      navigate({
        pathname: "/characters",
        search: `?page=${pageToReturn}`,
      });
      return;
    }

    navigate({
      pathname: "/characters",
      search: `?page=${pageToReturn}`,
      hash: `#character-${character.id}`,
    });
  };

  if (isLoading) {
    return (
      <div className="character-detail-host">
        <div className="spinner-container">Cargando...</div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="character-detail-host">
        <div className="spinner-container">Personaje no encontrado</div>
      </div>
    );
  }

  return (
    <div className="character-detail-host">
      <div className="character-detail">
        <div className="image">
          <img src={character.image} alt={character.name} />
        </div>

        <div className="info">
          <h2>{character.name}</h2>
          <p>
            <strong>Estado:</strong> {character.status}
          </p>
          <p>
            <strong>Especie:</strong> {character.species}
          </p>
          <p>
            <strong>Origen:</strong> {character.origin?.name}
          </p>
          <p>
            <strong>Ubicación:</strong> {character.location?.name}
          </p>
          <p>
            <strong>Género:</strong> {character.gender}
          </p>
          <p>
            <strong>Tipo:</strong> {character.type || "Desconocido"}
          </p>
          <p>
            <strong>Fecha de creación:</strong>{" "}
            {new Date(character.created).toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="episodes">
            <strong>Episodios en los que aparece:</strong>
            <ul>
              {episodes.map((ep) => (
                <li key={ep.id}>
                  {ep.episode} – {ep.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="actions">
            <button onClick={goBack} aria-label="Volver atrás">
              <span className="material-icons">arrow_back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
