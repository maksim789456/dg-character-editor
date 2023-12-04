"use client";

import { DgCharacterSkill } from "@/src/model/character";
import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";

interface TableSkillProps extends React.HTMLAttributes<HTMLDivElement> {
  skill: DgCharacterSkill;
  disabled?: boolean;

  damaged?: boolean;
  onDamagedChange?: (damage: boolean) => void;
  characterSkillRate: number;
  onCharacterSkillRateChange: (skillRate: number) => void;
  types: any[];
  type?: string;
  onTypeChange?: (type: string) => void;
}

const TableSkill = memo(function TableSkillInternal({
  disabled,
  skill,
  damaged,
  onDamagedChange,
  characterSkillRate,
  onCharacterSkillRateChange,
  types,
  type,
  onTypeChange,
  ...props
}: TableSkillProps) {
  const [error, setError] = useState(false);

  useEffect(
    () => setError(characterSkillRate < skill.baseSkillRate),
    [skill, characterSkillRate]
  );

  const onCharacterSkillRateInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value === "" ? 0 : parseInt(e.target.value);
    if (isNaN(value)) value = 0;
    if (value > 99) value = 99;
    if (onCharacterSkillRateChange) onCharacterSkillRateChange(value);
  };

  const onTypeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onTypeChange) onTypeChange(e.target.value);
  };

  const onDamagedInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onDamagedChange) onDamagedChange(e.target.checked);
  };

  return (
    <div
      className={clsx(
        "border-b border-r border-dg",
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
            type="checkbox"
            className="w-4 h-4"
            checked={damaged ?? false}
            onChange={onDamagedInputChange}
          />
        </div>
      )}
      <p className="font-dg-main text-dg text-sm col-span-9 py-1.5 flex items-center">{`${skill.name} (${skill.baseSkillRate}%)`}</p>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        disabled={disabled}
        value={characterSkillRate ?? skill.baseSkillRate}
        onChange={onCharacterSkillRateInputChange}
        className={
          "w-full h-ful text-center col-span-2 row-span-2 border-l border-dg disabled:bg-gray-200 " +
          (error ? "bg-red-200" : "bg-blue-100")
        }
      ></input>
      {skill.isTypal ? (
        <select
          className="w-full h-full bg-blue-100 col-span-10 py-1.5 disabled:bg-gray-200"
          disabled={disabled}
          value={skill.type ?? ""}
          onChange={onTypeSelectChange}
        >
          <option value={""}></option>
          {types.map((skill: any, i: number) => (
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
