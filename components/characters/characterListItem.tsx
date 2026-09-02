import { deleteCharacter } from "@/src/features/dgCharacter/dgCharactersSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import Link from "next/link";
import EditIcon from "../icons/edit";
import DeleteIcon from "../icons/delete";

interface CharacterListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
  characterId: string;
}

export default function CharacterListItem({
  lang,
  characterId,
}: CharacterListItemProps) {
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
            <button
              name="edit"
              title="Edit"
              className="inline-flex items-center justify-center rounded-md text-sm 
                font-medium ring-offset-background transition-colors focus-visible:outline-none 
                focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
               bg-dg text-gray-100 hover:bg-dg/90 px-2 py-2"
            >
              <EditIcon className="!size-6" />
            </button>
          </Link>
          <button
            name="delete"
            title="Delete"
            className="bg-red-600 hover:bg-red-600/90 p-2 text-gray-100 rounded-md
              ring-offset-background transition-colors focus-visible:outline-none 
              focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={(e) => dispatch(deleteCharacter(characterId))}
          >
            <DeleteIcon className="!size-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
