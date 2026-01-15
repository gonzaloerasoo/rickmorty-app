import type { Character, Episode } from "../types/models";

export async function getAllCharacters(): Promise<Character[]> {
  const baseUrl = "https://rickandmortyapi.com/api/character";
  const firstPage = await fetch(baseUrl).then((res) => res.json());
  const totalPages = firstPage.info.pages;

  const requests = Array.from({ length: totalPages }, (_, i: number) =>
    fetch(`${baseUrl}?page=${i + 1}`).then((res) => res.json())
  );

  const pages = await Promise.all(requests);
  return pages.flatMap((p) => p.results);
}

export async function getCharacterById(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  return await res.json();
}

export async function getEpisodesFromCharacter(
  character: Character
): Promise<Episode[]> {
  const urls = character.episode;
  const responses = await Promise.all(urls.map((url: string) => fetch(url)));
  const episodes = await Promise.all(responses.map((res) => res.json()));
  return episodes;
}
