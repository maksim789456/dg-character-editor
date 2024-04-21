import { set } from "@/src/features/dgCharacter/dgCharacterSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import PropTypes from "prop-types";

interface MotivationDescriptionProps
  extends React.HTMLAttributes<HTMLTextAreaElement> {
  viewMode?: boolean;
}

const MotivationDescription: React.FC<MotivationDescriptionProps> = ({
  viewMode,
}) => {
  const motivationDescription =
    useAppSelector((state) => state.dgCharacter.motivationDescription) ?? "";
  const dispatch = useAppDispatch();

  return (
    <textarea
      className="bg-blue-100 resize-none w-full translate-y-3"
      rows={viewMode ? 3 : 7}
      value={motivationDescription}
      onChange={(e) =>
        dispatch(set({ field: "motivationDescription", value: e.target.value }))
      }
    />
  );
};

MotivationDescription.propTypes = {
  viewMode: PropTypes.bool,
};

export default MotivationDescription;
