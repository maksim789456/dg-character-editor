"use client";

import { editSkill } from "@/src/features/dgCharacter/dgCharacterSlice";
import { useAppSelector } from "@/src/redux/hooks";
import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface TableSkillProps extends React.HTMLAttributes<HTMLDivElement> {
  skillId: string;
  skillName: string;
  types?: any[];
}

const TableSkill = memo(function TableSkillInternal({
  skillId,
  skillName,
  types,
  ...props
}: TableSkillProps) {
  const disabled = useAppSelector((state) => !state.dgCharacter.editMode);
  const skill = useAppSelector(
    (state) => state.dgCharacter.skills.find((skill) => skill.id === skillId)!
  );
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  useEffect(
    () => setError(skill.characterSkillRate < skill.baseSkillRate),
    [skill]
  );

  const onCharacterSkillRateInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value === "" ? 0 : parseInt(e.target.value);
    if (isNaN(value)) value = 0;
    if (value > 99) value = 99;
    dispatch(
      editSkill({
        skillId: skillId,
        skill: { ...skill, characterSkillRate: value },
      })
    );
  };

  const onTypeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      editSkill({ skillId: skillId, skill: { ...skill, type: e.target.value } })
    );
  };

  const onDamagedInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      editSkill({
        skillId: skillId,
        skill: { ...skill, damaged: e.target.checked },
      })
    );
  };

  return (
    <div
      className={clsx(
        "border-b border-r border-dg dark:border-neutral-600",
        "w-full",
        props.className || "",
        skill.isTypal ? "row-span-2 grid-rows-2" : "grid-rows-1",
        "grid",
        "grid-cols-12",
        "h-full"
      )}
    >
      {skill.hideDamage ? (
        <div></div>
      ) : (
        <div className="flex items-center justify-center">
          <input
            name={`${skill.id}Damaged`}
            aria-label={`${skill.name} Skill Check Failed`}
            type="checkbox"
            className="w-4 h-4"
            checked={skill.damaged ?? false}
            onChange={onDamagedInputChange}
          />
        </div>
      )}
      <p className="font-dg-main text-dg dark:text-neutral-200 text-sm col-span-9 py-1.5 flex items-center">{`${skillName} (${skill.baseSkillRate}%)`}</p>
      <input
        name={`${skill.id}Rate`}
        aria-label={`${skill.name} Skill Rate`}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        disabled={disabled}
        value={skill.characterSkillRate ?? skill.baseSkillRate}
        onChange={onCharacterSkillRateInputChange}
        className={
          "w-full h-ful text-center dark:text-neutral-200 col-span-2 row-span-2 border-l border-dg dark:border-neutral-800 disabled:bg-gray-200 " +
          (error ? "bg-red-200" : "bg-blue-100 dark:bg-neutral-700")
        }
      ></input>
      {skill.isTypal ? (
        <select
          name={`${skill.id}TypalSelect`}
          aria-label={`${skill.name} Type Select`}
          className="w-full h-full bg-blue-100 dark:bg-neutral-700 dark:text-neutral-200 col-span-10 py-1.5 disabled:bg-gray-200"
          disabled={disabled}
          value={skill.type ?? ""}
          onChange={onTypeSelectChange}
        >
          <option value={""}></option>
          {types?.map((skill: any, i: number) => (
            <option key={i} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>
      ) : (
        // <input
        //   type="text"
        //   disabled={disabled}
        //   value={type ?? ""}
        //   onChange={onTypeInputChange}
        //   className="w-full h-full bg-blue-100 text-center col-span-10 py-1.5 disabled:bg-gray-200"
        // ></input>
        <></>
      )}
    </div>
  );
});

export default TableSkill;
