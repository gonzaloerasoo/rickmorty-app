import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="home">
        <div className="spinner-container">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="hero">
        <h1>RickPedia</h1>
      </div>

      <div className="card-grid">
        <div className="feature-card">
          <div className="card-image">
            <img
              src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
              alt="Rick"
            />
          </div>
          <h2 className="card-title">Personajes</h2>
          <div className="card-content">
            <p>
              Conoce a Rick y los personajes clave. Descubre sus historias y
              habilidades.
            </p>
          </div>
          <div className="card-actions">
            <button onClick={() => navigate("/characters")}>Ver más</button>
          </div>
        </div>
      </div>
    </div>
  );
}
