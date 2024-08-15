"use client";

import React from "react";
import Category from "../category";
import TextInput from "../textInput";
import TableItem from "../table/tableItem";
import AddWeapon from "../weapon/addWeapon";
import WeaponsList from "../weapon/weaponsList";
interface EquipmentSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const EquipmentSection: React.FC<EquipmentSectionProps> = ({
  sectionLocale,
}) => {
  return (
    <Category className="col-span-2" name={sectionLocale?.categoryName}>
      <div className="flex flex-col">
        <TextInput
          title={sectionLocale?.armor}
          multiline={true}
          rows={6}
          name="armorAndGear"
        />
        <div className="border-t border-dg dark:border-neutral-600 flex items-center justify-center gap-3 px-1">
          <p className="font-dg-main text-dg dark:text-neutral-200 text-xs py-1 text-center">
            {sectionLocale?.armorDescription}
          </p>
        </div>
        <div className="border-t border-dg dark:border-neutral-600 grid grid-rows-8">
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
          <WeaponsList />
          <AddWeapon sectionLocale={sectionLocale} />
        </div>
      </div>
    </Category>
  );
};

export default EquipmentSection;
