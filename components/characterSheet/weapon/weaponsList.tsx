import { useAppSelector } from "@/src/redux/hooks";
import { shallowEqual } from "react-redux";
import Weapon from "./weapon";

interface WeaponsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const WeaponsList: React.FC<WeaponsListProps> = () => {
  const weaponsIds = useAppSelector(
    (state) => Array.from(state.dgCharacter.weapons.keys()),
    shallowEqual
  );
  return weaponsIds.map((id: number) => <Weapon weaponId={id} key={id} />);
};

export default WeaponsList;
