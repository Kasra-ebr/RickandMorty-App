import axios from "axios";

const client = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export async function getCharacters(query = "", signal?: AbortSignal) {
    const { data } = await client.get(`/character`, {
      params: { name: query },
      signal,
    });
    return data.results;
  }

export async function getCharacter(id: string) {
  const { data } = await client(`/character/${id}`);
  return data;
}

export async function getEpisodes(id: string) {
  const { data } = await client(
    `/episode/${["1", "2", "3", "4", "5", "6", "7"]}`
  );
  return data;
}

