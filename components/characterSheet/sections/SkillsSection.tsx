"use client";

import React from "react";
import Category from "../category";
import TableItem from "../table/tableItem";
import AddOtherSkill from "../skill/addOtherSkill";
import SkillsList from "../skill/skillsList";
import OtherSkillsList from "../skill/otherSkillsList";
import { useAppSelector } from "@/src/redux/hooks";
import clsx from "clsx";

interface SkillsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  sectionLocale,
  ...props
}) => {
  const disabled = useAppSelector((state) => !state.dgCharacter.editMode);
  const professionOff = useAppSelector((state) => state.dgCharacter.useCustomProfession)
  return (
    <Category
      className="col-span-2"
      name={sectionLocale?.categoryName}
      {...props}
    >
      <div className="grid grid-flow-col skills-grid">
        <SkillsList typalNone={sectionLocale?.typalNone}/>
        <TableItem title={sectionLocale?.otherSkills} />
        <OtherSkillsList foreignLangShort={sectionLocale?.foreignLangShort} />
        <AddOtherSkill sectionLocale={sectionLocale} />
      </div>
      <div className="flex flex-col items-center justify-center border-dg dark:border-neutral-800 border-t">
        <p className="text-dg-main text-xs text-center py-1">
          {sectionLocale?.skillsInstruction}
        </p>
        <div className={clsx("skill-bg-info", disabled && "hidden")}>
          <p className={clsx(professionOff && "!hidden")}>
            <p className="bg-blue-300 dark:bg-blue-400/50">&emsp;&emsp;&emsp;</p>– profession required skill,
          </p>
          <p className={clsx(professionOff && "!hidden")}>
            <p className="bg-indigo-200 dark:bg-indigo-400/50">&emsp;&emsp;&emsp;</p>– profession additional skill,
          </p>
          <p><p className="bg-red-200 dark:bg-red-700">&emsp;&emsp;&emsp;</p>– bellow default or missing value</p>
        </div>
      </div>
    </Category>
  );
};

export default SkillsSection;
