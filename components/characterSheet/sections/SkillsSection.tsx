"use client";

import React from "react";
import Category from "../category";
import TableInput from "../table/tableInput";
import TableItem from "../table/tableItem";
import { DgCharacter, DgCharacterSkill } from "@/src/model/character";
import TableSkill from "../table/tableSkill";
import { useSelector, useDispatch } from "react-redux";
import {
  addOtherSkill,
  editSkill,
} from "@/src/features/dgCharacter/dgCharacterSlice";

interface SkillsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
  skillsDict: any;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  sectionLocale,
  skillsDict,
  ...props
}) => {
  const dgCharacter = useSelector(
    (state: any) => state.dgCharacter
  ) as DgCharacter;
  const otherSkills = dgCharacter.skills.filter((skill) => skill.isOther);
  const dispatch = useDispatch();

  return (
    <Category
      className="col-span-2"
      name={sectionLocale?.categoryName}
      {...props}
    >
      <div className="grid grid-flow-col skills-grid">
        {skillsDict.map((langSkill: DgCharacterSkill, i: number) => {
          const skillId = dgCharacter.skills.findIndex(
            (pred) => pred.id === langSkill.id
          );
          const skill = dgCharacter.skills[skillId];
          const skillDescription = {
            ...langSkill,
            ...skill,
          };
          return (
            <TableSkill
              skill={skillDescription}
              disabled={!dgCharacter.editMode}
              damaged={skill.damaged}
              onDamagedChange={(value) =>
                dispatch(
                  editSkill({
                    id: skillId,
                    skill: { ...skill, damaged: value },
                  })
                )
              }
              characterSkillRate={skill.characterSkillRate}
              onCharacterSkillRateChange={(value) =>
                dispatch(
                  editSkill({
                    id: skillId,
                    skill: { ...skill, characterSkillRate: value },
                  })
                )
              }
              type={skill.type}
              onTypeChange={(value) =>
                dispatch(
                  editSkill({ id: skillId, skill: { ...skill, type: value } })
                )
              }
              key={i}
            />
          );
        })}
        <TableItem title={sectionLocale?.otherSkills} />
        {otherSkills.map((skill, i) => {
          const skillId = dgCharacter.skills.findIndex(
            (pred) => pred.id === `other${i}`
          );
          return (
            <div className="grid grid-cols-12" key={i}>
              <TableInput
                className="col-span-10"
                disabled={!dgCharacter.editMode}
                value={skill.name}
                onValueChange={(value) =>
                  dispatch(
                    editSkill({
                      id: skillId,
                      skill: { ...skill, name: value as string },
                    })
                  )
                }
                checkable={true}
                checkboxValue={skill.damaged}
                onCheckboxValueChange={(value) =>
                  dispatch(
                    editSkill({
                      id: skillId,
                      skill: { ...skill, damaged: value },
                    })
                  )
                }
              />
              <TableInput
                className="col-span-2"
                isNumber={true}
                disabled={!dgCharacter.editMode}
                value={skill.characterSkillRate}
                onValueChange={(value) =>
                  dispatch(
                    editSkill({
                      id: skillId,
                      skill: { ...skill, characterSkillRate: value as number },
                    })
                  )
                }
              />
            </div>
          );
        })}
        {otherSkills.length != 6 && dgCharacter.editMode ? (
          <div className="border-b border-dg flex items-center justify-center">
            <button
              className="font-dg-main text-dg outline outline-dg rounded my-1 px-3 bg-blue-100"
              onClick={() =>
                dispatch(addOtherSkill(`other${otherSkills.length}`))
              }
            >
              Add other skill
            </button>
          </div>
        ) : (
          <></>
        )}
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
