import { useEffect, useState } from "react";
import { getCharacters } from "../characters.service";
import { Character } from "../character.model";

export function useCharactersList({
  page,
  name,
  status,
  species,
}: {
  page: number;
  name: string;
  status: string;
  species: string;
}) {
  const [data, setData] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    getCharacters(page, name, status, species)
      .then((res) => {
        setData(res.results);
        setTotalPages(res.info.pages);
      })
      .catch(() => setError("Error cargando personajes"))
      .finally(() => setLoading(false));
  }, [page, name, status, species]);

  return { data, totalPages, loading, error };
}
