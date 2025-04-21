import { useEffect, useState } from "react";
import { ICharacter, IEpisode } from "../type/type";
import Loader from "./Loader";
import { getCharacter, getEpisodes } from "../Server/Server";
import Button from "./UI/Button";
import './../App.css';
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
interface CharacterDetailProps {
    selectedId: number | null;
    onAddFavourite: (character: ICharacter) => void;
    isAddToFavourite: boolean;
  }


// ========== Main Component ==========
function CharacterDetail({selectedId, onAddFavourite,  isAddToFavourite, }: CharacterDetailProps) {
    const [character, setCharacter] = useState<ICharacter | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  
    useEffect(() => {
      if (!selectedId) return;
  
      setIsLoading(true);
  
      getCharacter(selectedId)
        .then((data: ICharacter) => {
          console.log("Fetched character:", data);
          setCharacter(data);
        })
        .catch((error: any) => {
          console.error("Character fetch error:", error);
          toast.error(error?.response?.data?.error || "Failed to fetch character");
        });
  
      getEpisodes(selectedId)
        .then((episodeData: IEpisode[] | IEpisode) => {
          setEpisodes([episodeData].flat().slice(0, 6));
        })
        .catch((error: any) => {
          console.error("Episodes fetch error:", error);
          toast.error(error?.response?.data?.error || "Failed to fetch episodes");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [selectedId]);
  
    if (isLoading)
      return (
        <div style={{ flex: 1 }}>
          <Loader />
        </div>
      );
  
    if (!character || !selectedId)
      return (
        <div style={{ flex: 1, color: "var(--slate-300)" }}>
          Please select a character.
        </div>
      );
  
    return (
      <div style={{ flex: 1 }}>
        <CharacterSubInfo
          onAddFavourite={onAddFavourite}
          character={character}
          isAddToFavourite={isAddToFavourite}
        />
        <EpisodeList episodes={episodes} />
      </div>
    );
  }
  
  export default CharacterDetail;
  
  // ========== Character Sub Info ==========
  interface CharacterSubInfoProps {
    character: ICharacter;
    isAddToFavourite: boolean;
    onAddFavourite: (character: ICharacter) => void;
  }
  
  function CharacterSubInfo({
    character,
    isAddToFavourite,
    onAddFavourite,
  }: CharacterSubInfoProps) {
    return (
      <div className="character-detail">
        <img
          src={character.image}
          alt={character.name}
          className="character-detail__img"
        />
        <div className="character-detail__info">
          <h3 className="name">
            <span>{character.gender === "Male" ? "👱🏻‍♂️" : "👩🏻‍🦳"}</span>
            <span>&nbsp;{character.name}</span>
          </h3>
          <div className="info">
            <span className={`status ${character.status === "Dead" ? "red" : ""}`} />
            <span>&nbsp;{character.status}</span>
            <span> - &nbsp;{character.species}</span>
          </div>
          <div className="location">
            <p>Last known location:</p>
            <p>{character.location.name}</p>
          </div>
          <div className="actions">
            {isAddToFavourite ? (
              <p>Already Added To Favourites ✅</p>
            ) : (
              <Button
                onClick={() => onAddFavourite(character)}
                className="btn btn--primary"
              >
                Add to Favourite
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // ========== Episode List ==========
  interface EpisodeListProps {
    episodes: IEpisode[];
  }
  
  function EpisodeList({ episodes }: EpisodeListProps) {
    const [sortBy, setSortby] = useState<boolean>(true);
  
    let sortedEpisodes: IEpisode[] = sortBy
    ? [...episodes].sort(
        (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
      )
    : [...episodes].sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      );
    return (
      <div className="character-episodes">
        <div className="title">
          <h2>List of Episodes:    <Button onClick={() => setSortby((is) => !is)} className="icon-large">
            <ArrowUpCircleIcon
              className="icon"
              style={{ rotate: sortBy ? "0deg" : "180deg" }}
            />
          </Button></h2>
       
        </div>
        <ul>
          {sortedEpisodes.map((item, index) => (
            <li key={item.id}>
              <div className="episode_list">
                {String(index + 1).padStart(2, "0")} - {item.episode} :{" "}
                <strong>{item.name}</strong>
                <div className="badge badge--secondary">{item.air_date}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }