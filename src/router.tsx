import { createBrowserRouter } from "react-router-dom";
import Layout from "./app/pages/layout";
import Home from "./app/pages/home/Home";
import CharactersList from "@characters/list/CharactersList";
import CharacterDetail from "@characters/detail/CharacterDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "characters", element: <CharactersList /> },
      { path: "characters/:id", element: <CharacterDetail /> },
    ],
  },
]);
