const BASE = "https://rickandmortyapi.com/api";

export async function getCharacters(params: {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
}) {
  const search = new URLSearchParams();
  if (params.page) search.set("page", String(params.page));
  if (params.name) search.set("name", params.name);
  if (params.status) search.set("status", params.status);
  if (params.species) search.set("species", params.species);

  const res = await fetch(`${BASE}/character?${search.toString()}`);
  if (!res.ok) throw new Error("Error al cargar personajes");
  return res.json();
}

export async function getCharacterById(id: string) {
  const res = await fetch(`${BASE}/character/${id}`);
  if (!res.ok) throw new Error("Error al cargar personaje");
  return res.json();
}
