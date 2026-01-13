export async function getCharacters(
  page: number,
  name: string,
  status: string,
  species: string
) {
  const params = new URLSearchParams();
  params.append("page", String(page));
  if (name) params.append("name", name);
  if (status) params.append("status", status);
  if (species) params.append("species", species);

  const res = await fetch(
    `https://rickandmortyapi.com/api/character?${params}`
  );
  if (!res.ok) throw new Error("Error");
  return res.json();
}

export async function getCharacterDetail(id: string) {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!res.ok) throw new Error("Error");
  return res.json();
}
