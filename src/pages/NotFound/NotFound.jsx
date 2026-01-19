import "./NotFound.css";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-host">
      <div className="notfound-box">
        <h2>404</h2>
        <p>Página no encontrada</p>
        <button onClick={() => navigate("/")}>
          <span className="material-icons">arrow_back</span>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
