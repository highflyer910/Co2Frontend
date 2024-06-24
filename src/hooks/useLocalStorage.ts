import { useState, useEffect } from "react";

// Definiamo un tipo generico per lo stato iniziale
type InitialStateType = {
  [key: string]: boolean;
};

// Custom hook per gestire lo stato in localStorage
export function useLocalStorageState(
  initialState: InitialStateType,
  key: string
): [InitialStateType, React.Dispatch<React.SetStateAction<InitialStateType>>] {
  // Utilizziamo useState con una funzione callback per inizializzare lo stato da localStorage
  const [value, setValue] = useState<InitialStateType>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // useEffect per salvare lo stato in localStorage ogni volta che cambia
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
