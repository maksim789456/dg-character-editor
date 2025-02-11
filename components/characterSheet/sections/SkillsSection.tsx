"use client";

import React from "react";
import Category from "../category";
import TableItem from "../table/tableItem";
import AddOtherSkill from "../skill/addOtherSkill";
import SkillsList from "../skill/skillsList";
import OtherSkillsList from "../skill/otherSkillsList";

interface SkillsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  sectionLocale,
  ...props
}) => {
  return (
    <Category
      className="col-span-2"
      name={sectionLocale?.categoryName}
      {...props}
    >
      <div className="grid grid-flow-col skills-grid">
        <SkillsList />
        <TableItem title={sectionLocale?.otherSkills} />
        <OtherSkillsList foreignLangShort={sectionLocale?.foreignLangShort} />
        <AddOtherSkill sectionLocale={sectionLocale} />
      </div>
      <div className="flex items-center justify-center border-dg dark:border-neutral-800 border-t">
        <p className="font-dg-main text-xs text-dg dark:text-neutral-200 text-center py-1">
          {sectionLocale?.skillsInstruction}
        </p>
      </div>
    </Category>
  );
};

export default SkillsSection;
