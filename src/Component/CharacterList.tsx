import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { ICharacter } from "../type/type";
import './../App.css';
import Button from "./UI/Button";

interface CharacterListProps {
  selectedId: number | null;
  characters: ICharacter[];
  isLoading: boolean;
  onSelectCharacter: (id: number) => void;
}

function CharacterList({
  selectedId,
  characters,
  isLoading,
  onSelectCharacter,
}: CharacterListProps) {

  return (
    <div className="characters-list">
      {isLoading ? (
        <Loader />
      ) : (
        characters.map((item) => (
          <Character key={item.id} item={item}>
            <Button
              className="icon_red"
              onClick={() => onSelectCharacter(item.id)}
            >
              {selectedId === item.id ? <EyeSlashIcon className="icon" /> : <EyeIcon className="icon" />}
            </Button>
          </Character>
        ))
      )}
    </div>
  );
}

export default CharacterList;

// -------------------- CHARACTER COMPONENTS --------------------

interface CharacterProps {
  item: ICharacter;
  children?: React.ReactNode;
}

export function Character({ item, children }: CharacterProps) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <div className="list-info">
        <CharaterName item={item} />
        <CharacterInfo item={item} />
      </div>
      {children}
    </div>
  );
}

interface CharaterNameProps {
  item: ICharacter;
}

function CharaterName({ item }: CharaterNameProps) {
  return (
    <h3 className="name">
      <span>{item.gender === "Male" ? "👱🏻‍♂️" : "👩🏻‍🦳"}</span>
      <span> {item.name}</span>
    </h3>
  );
}

interface CharacterInfoProps {
  item: ICharacter;
}

function CharacterInfo({ item }: CharacterInfoProps) {
  return (
    <div className="list-item__detail">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}>
        <span> {item.status} </span>
        <span> - {item.species}</span>
      </span>
    </div>
  );
}
