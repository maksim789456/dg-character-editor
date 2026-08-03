import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import TableInput from "../table/tableInput";
import { editWeapon, rollWeaponLethality } from "@/src/features/dgCharacter/dgCharacterSlice";
import clsx from "clsx";
import Dices from "@/components/icons/dices";
import { useCallback } from "react";

interface WeaponListProps extends React.HTMLAttributes<HTMLDivElement> {
  weaponId: number;
}

export default function Weapon({ weaponId }: WeaponListProps) {
  const playMode = useAppSelector(s => !s.dgCharacter.editMode);
  const weapon = useAppSelector((state) => state.dgCharacter.weapons[weaponId]);
  const dispatch = useAppDispatch();

  const onLethalityRolled = useCallback(
    () => dispatch(rollWeaponLethality(weaponId)),
    [dispatch, rollWeaponLethality]
  );

  return (
    <div className="grid grid-cols-15">
      <TableInput
        ariaLabel={`Weapon ${weaponId} Name`}
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
        ariaLabel={`Weapon ${weaponId} Skill Value`}
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
        ariaLabel={`Weapon ${weaponId} Base Range`}
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
        ariaLabel={`Weapon ${weaponId} Damage`}
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
        ariaLabel={`Weapon ${weaponId} Armor Piercing`}
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
      <div className={clsx(
        "w-full h-full col-span-2 flex flex-row gap-0.5 items-center",
        "bg-blue-100 dark:bg-neutral-800",
        "border-b border-r border-dg dark:border-neutral-600",
        playMode && "cursor-pointer"
      )}>
        <TableInput
          ariaLabel={`Weapon ${weaponId} Lethality`}
          className="!border-b-0"
          isNumber={true}
          value={weapon.lethality ?? 0}
          maxValue={99}
          onValueChange={(value) =>
            dispatch(
              editWeapon({
                id: weaponId,
                weapon: { ...weapon, lethality: value as number },
              })
            )
          }
        />
        {playMode ? <Dices onClick={onLethalityRolled} /> : <></>}
      </div>
      <TableInput
        ariaLabel={`Weapon ${weaponId} Kill Radius`}
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
        ariaLabel={`Weapon ${weaponId} Ammo`}
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
