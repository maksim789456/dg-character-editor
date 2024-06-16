import { set } from "@/src/features/dgCharacter/dgCharacterSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

const MotivationDescription: React.FC = ({}) => {
  const motivationDescription =
    useAppSelector((state) => state.dgCharacter.motivationDescription) ?? "";
  const dispatch = useAppDispatch();

  return (
    <textarea
      name="motivationDescription"
      className="bg-blue-100 resize-none w-full translate-y-3"
      rows={7}
      value={motivationDescription}
      onChange={(e) =>
        dispatch(set({ field: "motivationDescription", value: e.target.value }))
      }
    />
  );
};

export default MotivationDescription;
