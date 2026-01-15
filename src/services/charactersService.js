const API_URL = "https://rickandmortyapi.com/api/character";

async function getAllCharacters() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.results;
}

async function getCharacterById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
}

export default {
  getAllCharacters,
  getCharacterById,
};
