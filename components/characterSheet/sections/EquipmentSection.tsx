"use client";

import React from "react";
import Category from "../category";
import TextInput from "../textInput";
import TableItem from "../table/tableItem";
import AddWeapon from "../weapon/addWeapon";
import WeaponsList from "../weapon/weaponsList";
import { useTranslations } from "next-intl";

interface EquipmentSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const EquipmentSection: React.FC<EquipmentSectionProps> = () => {
  const t = useTranslations("characterSheet.equipmentSection");
  return (
    <Category className="col-span-2" name={t("categoryName")}>
      <div className="flex flex-col">
        <TextInput
          title={t("armor")}
          multiline={true}
          rows={6}
          name="armorAndGear"
        />
        <div className="border-t border-dg dark:border-neutral-600 flex items-center justify-center gap-3 px-1">
          <p className="font-dg-main text-dg dark:text-neutral-200 text-xs py-1 text-center">
            {t("armorDescription")}
          </p>
        </div>
        <div className="border-t border-dg dark:border-neutral-600 grid grid-rows-8">
          <div className="grid grid-cols-15">
            <TableItem
              className="col-span-3"
              title={t("weapons")}
              isHeader={true}
            />
            <TableItem title={t("weaponsSkill")} isHeader={true} />
            <TableItem
              className="col-span-2"
              title={t("weaponsRange")}
              isHeader={true}
            />
            <TableItem
              className="col-span-2"
              title={t("weaponsDamage")}
              isHeader={true}
            />
            <TableItem
              className="col-span-2"
              title={t("weaponsArmorPiecing")}
              isHeader={true}
            />
            <TableItem
              className="col-span-2"
              title={t("weaponsLethality")}
              isHeader={true}
            />
            <TableItem
              className="col-span-2"
              title={t("weaponsKillRadius")}
              isHeader={true}
            />
            <TableItem title={t("weaponsAmmo")} isHeader={true} />
          </div>
          <WeaponsList />
          <AddWeapon />
        </div>
      </div>
    </Category>
  );
};

export default EquipmentSection;
