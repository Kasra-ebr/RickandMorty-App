import { useEffect, useState } from 'react';
import './App.css';

import useCharacters from './hook/useCharacters';
import useLocalStorage from './hook/useLocalStorage';
import CharacterList from './Component/CharacterList';
import Navbar, { Favourites, Search, SearchResult } from './Component/Navbar';
import CharacterDetail from './Component/CharacterDetail';
import { ICharacter } from './type/type';
import { Toaster } from 'react-hot-toast';


interface IMainProps {
  children: React.ReactNode;
}

function Main({ children }: IMainProps) {
  return <main className="main">{children}</main>;
}

function App() {
  const [query, setQuery] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const { characters, isLoading } = useCharacters(query);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [favourites, setFavourites] = useLocalStorage<ICharacter[]>('FAVOURITES', []);

  useEffect(() => {
    const interval = setInterval(() => setCount((c) => c + 1), 1000);

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  const handleSelectCharacter = (id: number) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavourite = (char: ICharacter) => {
    setFavourites((preFav) => [...preFav, char]);
  };

  const handleDeleteFavourite = (id: number) => {
    setFavourites((preFav) => preFav.filter((fav) => fav.id !== id));
  };

  const isAddToFavourite = favourites.map((fav) => fav.id).includes(selectedId as number);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={favourites.length} />
        <Favourites favourites={favourites} onDeleteFavourite={handleDeleteFavourite} />
      </Navbar>
      <Main>
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
        />
        <CharacterDetail
          selectedId={selectedId}
          onAddFavourite={handleAddFavourite}
          isAddToFavourite={isAddToFavourite}
        />
      </Main>
    </div>
  );
}

export default App;
