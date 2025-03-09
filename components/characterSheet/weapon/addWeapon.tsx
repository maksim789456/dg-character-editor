import { addWeapon } from "@/src/features/dgCharacter/dgCharacterSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useTranslations } from "next-intl";

interface AddWeaponProps extends React.HTMLAttributes<HTMLDivElement> {}

const AddWeapon: React.FC<AddWeaponProps> = () => {
  const t = useTranslations("characterSheet.equipmentSection");
  const canAdd = useAppSelector(
    (state) => state.dgCharacter.weapons.length !== 7
  );
  const dispatch = useAppDispatch();

  return canAdd ? (
    <div className="border-b border-dg flex items-center justify-center">
      <button
        className="font-dg-main text-dg outline outline-dg rounded my-1 px-3 bg-blue-100 dark:outline-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
        onClick={() => dispatch(addWeapon())}
      >
        {t("addWeapon")}
      </button>
    </div>
  ) : (
    <></>
  );
};

export default AddWeapon;
