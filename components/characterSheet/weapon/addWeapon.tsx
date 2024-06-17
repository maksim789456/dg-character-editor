import { addWeapon } from "@/src/features/dgCharacter/dgCharacterSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import PropTypes from "prop-types";

interface AddWeaponProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const AddWeapon: React.FC<AddWeaponProps> = ({ sectionLocale }) => {
  const canAdd = useAppSelector(
    (state) => state.dgCharacter.weapons.length !== 7
  );
  const dispatch = useAppDispatch();

  return canAdd ? (
    <div className="border-b border-dg flex items-center justify-center">
      <button
        className="font-dg-main text-dg outline outline-dg rounded my-1 px-3 bg-blue-100"
        onClick={() => dispatch(addWeapon())}
      >
        {sectionLocale?.addWeapon}
      </button>
    </div>
  ) : (
    <></>
  );
};

AddWeapon.propTypes = {
  sectionLocale: PropTypes.any.isRequired,
};

export default AddWeapon;
