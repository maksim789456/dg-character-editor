"use client";

import { useAppSelector } from "@/src/redux/hooks";
import CharacterListItem from "./characterListItem";
import { shallowEqual } from "react-redux";
import { selectCharactersIds } from "@/src/redux/selectors";
import PropTypes from "prop-types";
import AddCharacter from "./addCharacter";

interface CharactersListProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
}

const CharactersList: React.FC<CharactersListProps> = ({ lang }) => {
  const charactersIds = useAppSelector(selectCharactersIds, shallowEqual);
  return (
    <>
      <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8 w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
        <ul className="space-y-2">
          {charactersIds.map((id) => {
            return (
              <li key={id}>
                <CharacterListItem lang={lang} characterId={id} />
              </li>
            );
          })}
          <li>
            <div className="flex justify-center">
              <AddCharacter className="w-48" addText="Add Character" lang={lang} />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

CharactersList.propTypes = {
  lang: PropTypes.string.isRequired,
};

export default CharactersList;
