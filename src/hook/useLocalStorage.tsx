import { useEffect, useState } from "react";
import { ICharacter } from "../Type/Type";


interface UseLocalStorageReturn {
  value: ICharacter[];
  setValue: React.Dispatch<React.SetStateAction<ICharacter[]>>;
}

export default function useLocalStorage(
  key: string,
  initialState: ICharacter[]
): UseLocalStorageReturn {
  const [value, setValue] = useState<ICharacter[]>(
    () => JSON.parse(localStorage.getItem(key) || "null") || initialState
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
