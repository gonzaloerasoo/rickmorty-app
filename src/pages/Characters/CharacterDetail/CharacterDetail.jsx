import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./CharacterDetail.css";

export default function CharacterDetail({ charactersService, teamService }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInTeam, setIsInTeam] = useState(false);
  const [pageToReturn, setPageToReturn] = useState(1);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

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
        checkIfInTeam(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [id, location.search, charactersService]);

  const checkIfInTeam = (char) => {
    teamService.getTeam().then((team) => {
      setIsInTeam(team.some((member) => member.id === char.id));
    });
  };

  const addToTeam = () => {
    if (!character) return;

    const payload = {
      id: character.id,
      name: character.name,
      species: character.species,
      status: character.status,
      origin: character.origin?.name || "Desconocido",
      location: character.location?.name || "Desconocido",
      gender: character.gender || "Desconocido",
      type: character.type || "Desconocido",
      image: character.image,
      created: character.created || new Date().toISOString(),
    };

    teamService.addToTeam(payload).then(() => {
      setIsInTeam(true);
      setConfirmationMessage("Personaje añadido al equipo");
    });
  };

  const removeFromTeam = () => {
    if (!character) return;

    teamService.removeFromTeam(character.id).then(() => {
      setIsInTeam(false);
      setConfirmationMessage("Personaje eliminado del equipo");
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

          <div className="actions">
            {!isInTeam && (
              <button onClick={addToTeam} aria-label="Añadir al equipo">
                <span className="material-icons">group_add</span>
              </button>
            )}

            {isInTeam && (
              <button onClick={removeFromTeam} aria-label="Quitar del equipo">
                <span className="material-icons">group_off</span>
              </button>
            )}

            <button onClick={goBack} aria-label="Volver atrás">
              <span className="material-icons">arrow_back</span>
            </button>
          </div>

          {confirmationMessage && (
            <div className="confirmation">{confirmationMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}
