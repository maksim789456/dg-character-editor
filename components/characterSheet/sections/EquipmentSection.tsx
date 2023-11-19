"use client";

import React from "react";
import Category from "../category";
import TextInput from "../textInput";
import TableItem from "../table/tableItem";
import TableInput from "../table/tableInput";
import { useDispatch, useSelector } from "react-redux";
import { DgCharacter } from "@/src/model/character";
import {
  addWeapon,
  editWeapon,
  set,
} from "@/src/features/dgCharacter/dgCharacterSlice";

interface EquipmentSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const EquipmentSection: React.FC<EquipmentSectionProps> = ({
  sectionLocale,
  ...props
}) => {
  const dgCharacter = useSelector(
    (state: any) => state.dgCharacter
  ) as DgCharacter;
  const dispatch = useDispatch();

  return (
    <Category className="col-span-2" name={sectionLocale?.categoryName}>
      <div className="flex flex-col">
        <TextInput
          title={sectionLocale?.armor}
          multiline={true}
          rows={6}
          value={dgCharacter.armorAndGear ?? ''}
          onValueChange={(value) =>
            dispatch(set({ field: "armorAndGear", value }))
          }
        />
        <div className="border-t border-dg flex items-center justify-center gap-3 px-1">
          <p className="font-dg-main text-dg text-xs py-1 text-center">
            {sectionLocale?.armorDescription}
          </p>
        </div>
        <div className="border-t border-dg grid grid-rows-8">
          <div className="grid grid-cols-15">
            <TableItem
              className="col-span-3"
              title={sectionLocale?.weapons}
              isHeader={true}
            />
            <TableItem title={sectionLocale?.weaponsSkill} isHeader={true} />
            <TableItem
              className="col-span-2"
              title={sectionLocale?.weaponsRange}
              isHeader={true}
            />
            <TableItem
              className="col-span-2"
              title={sectionLocale?.weaponsDamage}
              isHeader={true}
            />
            <TableItem
              className="col-span-2"
              title={sectionLocale?.weaponsArmorPiecing}
              isHeader={true}
            />
            <TableItem
              className="col-span-2"
              title={sectionLocale?.weaponsLethality}
              isHeader={true}
            />
            <TableItem
              className="col-span-2"
              title={sectionLocale?.weaponsKillRadius}
              isHeader={true}
            />
            <TableItem title={sectionLocale?.weaponsAmmo} isHeader={true} />
          </div>
          {dgCharacter.weapons.map((weapon, i) => (
            <div className="grid grid-cols-15" key={i}>
              <TableInput
                className="col-span-3"
                value={weapon.name}
                onValueChange={(value) =>
                  dispatch(
                    editWeapon({
                      id: i,
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
                      id: i,
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
                      id: i,
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
                      id: i,
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
                      id: i,
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
                      id: i,
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
                      id: i,
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
                      id: i,
                      weapon: { ...weapon, ammo: value as string },
                    })
                  )
                }
              />
            </div>
          ))}
          {dgCharacter.weapons.length != 7 ? (
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
          )}
          {dgCharacter.bounds.length !== 0 ? (
            <div className="border-b border-dg flex items-center justify-center">
              <p className="font-dg-main text-xs text-center py-1">
                {sectionLocale?.bondsInstruction}
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Category>
  );
};

export default EquipmentSection;
