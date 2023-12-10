import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import PropTypes from "prop-types";
import TableInput from "../table/tableInput";
import { editWeapon } from "@/src/features/dgCharacter/dgCharacterSlice";

interface WeaponListProps extends React.HTMLAttributes<HTMLDivElement> {
  weaponId: number;
}

const Weapon: React.FC<WeaponListProps> = ({ weaponId }) => {
  const weapon = useAppSelector((state) => state.dgCharacter.weapons[weaponId]);
  const dispatch = useAppDispatch();
  return (
    <div className="grid grid-cols-15">
      <TableInput
        className="col-span-3"
        value={weapon.name}
        onValueChange={(value) =>
          dispatch(
            editWeapon({
              id: weaponId,
              weapon: { ...weapon, name: value as string },
            })
          )
        }
      />
      <TableInput
        value={weapon.skill}
        onValueChange={(value) =>
          dispatch(
            editWeapon({
              id: weaponId,
              weapon: { ...weapon, skill: value as string },
            })
          )
        }
      />
      <TableInput
        className="col-span-2"
        value={weapon.baseRange}
        onValueChange={(value) =>
          dispatch(
            editWeapon({
              id: weaponId,
              weapon: { ...weapon, baseRange: value as string },
            })
          )
        }
      />
      <TableInput
        className="col-span-2"
        value={weapon.damage}
        onValueChange={(value) =>
          dispatch(
            editWeapon({
              id: weaponId,
              weapon: { ...weapon, damage: value as string },
            })
          )
        }
      />
      <TableInput
        className="col-span-2"
        value={weapon.armorPiercing}
        onValueChange={(value) =>
          dispatch(
            editWeapon({
              id: weaponId,
              weapon: { ...weapon, armorPiercing: value as string },
            })
          )
        }
      />
      <TableInput
        className="col-span-2"
        value={weapon.lethality}
        onValueChange={(value) =>
          dispatch(
            editWeapon({
              id: weaponId,
              weapon: { ...weapon, lethality: value as string },
            })
          )
        }
      />
      <TableInput
        className="col-span-2"
        value={weapon.killRadius}
        onValueChange={(value) =>
          dispatch(
            editWeapon({
              id: weaponId,
              weapon: { ...weapon, killRadius: value as string },
            })
          )
        }
      />
      <TableInput
        value={weapon.ammo}
        onValueChange={(value) =>
          dispatch(
            editWeapon({
              id: weaponId,
              weapon: { ...weapon, ammo: value as string },
            })
          )
        }
      />
    </div>
  );
};

Weapon.propTypes = {
  weaponId: PropTypes.number.isRequired,
};

export default Weapon;
