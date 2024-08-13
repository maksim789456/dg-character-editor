import { createCharacter } from "@/src/features/dgCharacter/dgCharactersSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

interface AddCharacterProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
  addText: string;
}

const AddCharacter: React.FC<AddCharacterProps> = ({ lang, addText, className }) => {
  const router = useRouter()
  const dispatch = useAppDispatch();

  const onAddClick = () => {
    let characterId = dispatch(createCharacter("")).payload;
    router.push(`/${lang}/${characterId}`)
  }

  return (
    <div className={className}>
      <button
        name="add"
        title={addText}
        onClick={onAddClick}
        className="flex items-center justify-center rounded-md text-sm 
        font-medium ring-offset-background transition-colors focus-visible:outline-none 
        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
      bg-dg text-gray-100 hover:bg-dg/90 px-10 py-4 ml-auto"
      >
        {addText}
      </button>
    </div>
  );
};

AddCharacter.propTypes = {
  lang: PropTypes.string.isRequired,
  addText: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default AddCharacter;
