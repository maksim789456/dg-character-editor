import { addBound } from "@/src/features/dgCharacter/dgCharacterSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import PropTypes from "prop-types";

interface AddBoundProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const AddBound: React.FC<AddBoundProps> = ({ sectionLocale }) => {
  const canAdd = useAppSelector(
    (state) =>
      state.dgCharacter.bounds.length != 5 && state.dgCharacter.editMode
  );
  const noBounds = useAppSelector(
    (state) => state.dgCharacter.bounds.length === 0
  );
  const dispatch = useAppDispatch();

  return canAdd ? (
    <div className="border-b border-dg dark:border-neutral-600 flex items-center justify-center">
      <button
        className="font-dg-main text-dg outline outline-dg dark:outline-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 rounded my-1 px-3 bg-blue-100"
        onClick={() => dispatch(addBound())}
      >
        {sectionLocale?.addBound}
      </button>
    </div>
  ) : noBounds ? (
    <div className="border-b border-dg dark:border-neutral-600 flex items-center justify-center">
      <p className="font-dg-main dark:text-neutral-200 text-base text-center py-1">
        {sectionLocale?.noBounds}
      </p>
    </div>
  ) : (
    <></>
  );
};

AddBound.propTypes = {
  sectionLocale: PropTypes.any.isRequired
}

export default AddBound;
