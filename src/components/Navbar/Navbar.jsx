import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <header className="toolbar">
      <span className="logo">RickPedia</span>
      <span className="spacer" />

      {currentRoute !== "/" && (
        <NavLink to="/" className="nav-button">
          <strong>Inicio</strong>
        </NavLink>
      )}
      {currentRoute !== "/characters" && (
        <NavLink to="/characters" className="nav-button">
          <strong>Personajes</strong>
        </NavLink>
      )}
    </header>
  );
}
