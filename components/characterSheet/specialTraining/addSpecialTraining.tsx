import { addSpecialTraining } from "@/src/features/dgCharacter/dgCharacterSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import PropTypes from "prop-types";

interface AddSpecialTrainingProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const AddSpecialTraining: React.FC<AddSpecialTrainingProps> = ({
  sectionLocale,
}) => {
  const canAdd = useAppSelector(
    (state) =>
      state.dgCharacter.specialTrainings.length != 6 &&
      state.dgCharacter.editMode
  );
  const noBounds = useAppSelector(
    (state) => state.dgCharacter.specialTrainings.length === 0
  );
  const dispatch = useAppDispatch();

  return canAdd ? (
    <div className="border-b border-dg dark:border-neutral-600 flex items-center justify-center">
      <button
        className="font-dg-main text-dg outline outline-dg rounded my-1 px-3 bg-blue-100 dark:outline-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
        onClick={() => dispatch(addSpecialTraining())}
      >
        {sectionLocale?.addSpecialTraining}
      </button>
    </div>
  ) : noBounds ? (
    <div className="border-b border-dg dark:border-neutral-600 flex items-center justify-center">
      <p className="font-dg-main text-base dark:text-neutral-200 text-center py-1">
        {sectionLocale?.noSpecialTrainings}
      </p>
    </div>
  ) : (
    <></>
  );
};

AddSpecialTraining.propTypes = {
  sectionLocale: PropTypes.any.isRequired,
};

export default AddSpecialTraining;
