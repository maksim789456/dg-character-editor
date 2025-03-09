"use client";

import React, { useMemo } from "react";
import Category from "../category";
import TableItem from "../table/tableItem";
import AddOtherSkill from "../skill/addOtherSkill";
import SkillsList from "../skill/skillsList";
import OtherSkillsList from "../skill/otherSkillsList";
import { useTranslations } from "next-intl";

interface SkillsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  skillsDict: any;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skillsDict,
  ...props
}) => {
  const t = useTranslations("characterSheet.skillsSection");
  const foreignLanguages = useMemo(
    () =>
      skillsDict.typalSkillVariants["foreign_language"].map((type: any) => {
        return {
          ...type,
          name: `${t("foreignLangShort")} (${type.name})`,
        };
      }),
    [t, skillsDict.typalSkillVariants]
  );

  return (
    <Category
      className="col-span-2"
      name={t("categoryName")}
      {...props}
    >
      <div className="grid grid-flow-col skills-grid">
        <SkillsList
          baseSkills={skillsDict.baseSkills}
          typalSkillVariants={skillsDict.typalSkillVariants}
        />
        <TableItem title={t("otherSkills")} />
        <OtherSkillsList foreignLanguages={foreignLanguages} />
        <AddOtherSkill />
      </div>
      <div className="flex items-center justify-center border-dg dark:border-neutral-800 border-t">
        <p className="font-dg-main text-xs text-dg dark:text-neutral-200 text-center py-1">
          {t("skillsInstruction")}
        </p>
      </div>
    </Category>
  );
};

export default SkillsSection;
