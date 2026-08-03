import { createCharacter } from "@/src/features/dgCharacter/dgCharactersSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { useRouter } from "next/navigation";

interface AddCharacterProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
  addText: string;
}

export default function AddCharacter({ lang, addText, className }: AddCharacterProps) {
  const router = useRouter()
  const dispatch = useAppDispatch();

  const onAddClick = () => {
    const characterId = dispatch(createCharacter()).payload;
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

