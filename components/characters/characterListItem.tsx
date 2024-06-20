import { useAppSelector } from "@/src/redux/hooks";
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
  return (
    <div className="border text-card-foreground bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 flex justify-between">
        <div>
          <h2 className="text-lg font-semibold">{fullName}</h2>
          <h3 className="mt-2">{profession}</h3>
        </div>
        <Link href={`/${lang}/${characterId}`}>
          <button
            className="inline-flex items-center justify-center rounded-md text-sm 
        font-medium ring-offset-background transition-colors focus-visible:outline-none 
        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
        disabled:pointer-events-none disabled:opacity-50 bg-dg text-gray-100 hover:bg-dg/90 h-10 px-4 py-2 ml-auto"
          >
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

CharacterListItem.propTypes = {
  lang: PropTypes.string.isRequired,
  characterId: PropTypes.string.isRequired,
};

export default CharacterListItem;
