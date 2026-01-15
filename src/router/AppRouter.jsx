import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import CharacterDetail from "../pages/Characters/CharacterDetail/CharacterDetail";
import CharactersList from "../pages/Characters/CharactersList/CharactersList";
import Navbar from "../components/Navbar/Navbar";
import charactersService from "../services/charactersService";
import teamService from "../services/teamService";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/characters"
          element={<CharactersList charactersService={charactersService} />}
        />
        <Route
          path="/characters/:id"
          element={
            <CharacterDetail
              charactersService={charactersService}
              teamService={teamService}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
