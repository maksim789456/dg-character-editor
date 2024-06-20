"use client";

import { useAppSelector } from "@/src/redux/hooks";
import CharacterListItem from "./characterListItem";
import { shallowEqual } from "react-redux";
import { selectCharactersIds } from "@/src/redux/selectors";

interface CharactersListProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
}

const CharactersList: React.FC<CharactersListProps> = ({ lang }) => {
  const charactersIds = useAppSelector(selectCharactersIds, shallowEqual);
  return (
    <>
      <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8">
        <ul className="divide-y divide-gray-200 space-y-1 md:space-y-1 lg:space-y-1">
          {charactersIds.map((id) => {
            return (
              <li
                className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto"
                key={id}
              >
                <CharacterListItem lang={lang} characterId={id} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default CharactersList;
