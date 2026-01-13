import { useEffect, useState } from "react";
import { getCharacterDetail } from "../characters.service";
import { Character } from "../character.model";

export function useCharacterDetail(id: string) {
  const [data, setData] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    getCharacterDetail(id)
      .then((res) => setData(res))
      .catch(() => setError("Error cargando personaje"))
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading, error };
}
