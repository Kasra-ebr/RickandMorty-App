import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharacterList";
import "./../App.css";
import Button from "./UI/Button";
import Input from "./UI/Input";
import { ICharacter } from "../type/type";

interface NavbarProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return <div className="navbar__logo">LOGO 😍</div>;
}

interface SearchProps {
  query: string;
  setQuery: (query: string) => void;
}

export function Search({ query, setQuery }: SearchProps) {
  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="search..."
    />
  );
}

interface SearchResultProps {
  favourites: ICharacter[] | undefined;
}

export function SearchResult({ favourites }: SearchResultProps) {
  if (!favourites) {
    return <div className="navbar__result">No favourites yet</div>;
  }

  return (
    <div className="navbar__result">
      Found {favourites.length} characters
    </div>
  );
}

interface FavouritesProps {
  favourites: ICharacter[];
  onDeleteFavourite: (id: number) => void;
}

export function Favourites({ favourites, onDeleteFavourite }: FavouritesProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal onOpen={setIsOpen} open={isOpen} title="List of Favourites">
        {favourites.map((item) => (
          <Character key={item.id} item={item}>
            <Button
              className="icon red"
              onClick={() => onDeleteFavourite(item.id)}
            >
              <TrashIcon />
            </Button>
          </Character>
        ))}
      </Modal>

      <Button className="heart" onClick={() => setIsOpen((is) => !is)}>
    
       <HeartIcon
          className={`icon ${
            favourites.length > 0 ? "fav" :"none"
          }`}
        />   
      </Button>
    </>
  );
}



