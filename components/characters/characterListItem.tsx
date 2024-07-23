import { deleteCharacter } from "@/src/features/dgCharacter/dgCharactersSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import Link from "next/link";
import PropTypes from "prop-types";

interface CharacterListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
  characterId: string;
}

const CharacterListItem: React.FC<CharacterListItemProps> = ({
  lang,
  characterId,
}) => {
  const { fullName, profession } = useAppSelector(
    (state) => state.characters[characterId]!
  );
  const dispatch = useAppDispatch();
  return (
    <div className="border text-card-foreground bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 flex justify-between">
        <div>
          <h2 className="text-lg font-dg-main font-bold">{fullName}</h2>
          <h3 className="mt-2 font-dg-main">{profession}</h3>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Link href={`/${lang}/${characterId}`}>
            <button className="inline-flex items-center justify-center rounded-md text-sm 
            font-medium ring-offset-background transition-colors focus-visible:outline-none 
            focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
            bg-dg text-gray-100 hover:bg-dg/90 px-2 py-2 ml-auto">
              <div className="w-6 h-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </div>
            </button>
          </Link>
          <button className="bg-red-600 hover:bg-red-600/90 p-2 text-gray-100 rounded-md
          ring-offset-background transition-colors focus-visible:outline-none 
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={(e) =>
              dispatch(deleteCharacter(characterId))
            }>
            <div className="w-6 h-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

CharacterListItem.propTypes = {
  lang: PropTypes.string.isRequired,
  characterId: PropTypes.string.isRequired,
};

export default CharacterListItem;
