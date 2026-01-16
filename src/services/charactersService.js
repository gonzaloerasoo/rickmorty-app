const API_URL = "https://rickandmortyapi.com/api/character";

async function getAllCharacters() {
  let all = [];
  let next = API_URL;

  while (next) {
    const res = await fetch(next);
    const data = await res.json();
    all = all.concat(data.results);
    next = data.info.next;
  }

  return all;
}

async function getCharacterById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
}

export default {
  getAllCharacters,
  getCharacterById,
};
