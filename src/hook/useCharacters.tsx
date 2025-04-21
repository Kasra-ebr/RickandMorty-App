import { useEffect, useState } from "react";
import { ICharacter } from "../type/type";
import { getCharacters } from "../Server/Server";
import axios from "axios";
import toast from "react-hot-toast";

interface UseCharactersResult {
  characters: ICharacter[];
  isLoading: boolean;
}

export default function useCharacters(query: string): UseCharactersResult {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setIsLoading(true);

    getCharacters(query, signal)
      .then((res: ICharacter[]) => {
        setCharacters(res.slice(0, 5)); // Optional slice
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setCharacters([]);
          toast.error(
            err?.response?.data?.error || "Failed to fetch characters"
          );
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [query]);

  return { isLoading, characters };
}
