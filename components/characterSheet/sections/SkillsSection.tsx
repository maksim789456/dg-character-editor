"use client";

import React from "react";
import Category from "../category";
import TableItem from "../table/tableItem";
import AddOtherSkill from "../skill/addOtherSkill";
import SkillsList from "../skill/skillsList";
import OtherSkillsList from "../skill/otherSkillsList";

interface SkillsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
  skillsDict: any;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  sectionLocale,
  skillsDict,
  ...props
}) => {
  return (
    <Category
      className="col-span-2"
      name={sectionLocale?.categoryName}
      {...props}
    >
      <div className="grid grid-flow-col skills-grid">
        <SkillsList
          baseSkills={skillsDict.baseSkills}
          typalSkillVariants={skillsDict.typalSkillVariants}
        />
        <TableItem title={sectionLocale?.otherSkills} />
        <OtherSkillsList />
        <AddOtherSkill sectionLocale={sectionLocale} />
      </div>
      <div className="flex items-center justify-center">
        <p className="font-dg-main text-xs text-center py-1">
          {sectionLocale?.skillsInstruction}
        </p>
      </div>
    </Category>
  );
};

export default SkillsSection;
