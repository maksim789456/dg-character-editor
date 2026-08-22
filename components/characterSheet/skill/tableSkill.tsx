"use client";

import Dices from "@/components/icons/dices";
import { editSkill, rollSkill } from "@/src/features/dgCharacter/dgCharacterSlice";
import { useAppSelector } from "@/src/redux/hooks";
import clsx from "clsx";
import { useTranslations } from "next-intl";
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
  const t = useTranslations('characterSheet.staticSection');
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

  const onSkillRolled = (e: React.MouseEvent<any>) => {
    if (disabled) {
      dispatch(
        rollSkill({
          skillId,
          skillName
        })
      );
    }
  }

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
            aria-label={`${skillName} Skill Check Failed`}
            type="checkbox"
            className="w-4 h-4"
            checked={skill.damaged ?? false}
            onChange={onDamagedInputChange}
          />
        </div>
      )}
      <p className={clsx("font-dg-main text-dg dark:text-neutral-200 text-sm col-span-9 py-1.5 flex items-center", disabled && "!col-span-8")}>
        {`${skillName} (${skill.baseSkillRate}%)`}
      </p>
      <div
        className={clsx(
          "w-full h-full col-span-2 row-span-2",
          "border-l border-dg dark:border-neutral-600",
          "flex flex-row gap-0.5 items-center",
          disabled && "pr-1 !col-span-3 cursor-pointer"
        )}
      >
        <input
          name={`${skill.id}Rate`}
          aria-label={`${skillName} Skill Rate`}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          readOnly={disabled}
          value={skill.characterSkillRate ?? skill.baseSkillRate}
          onChange={onCharacterSkillRateInputChange}
          onClick={onSkillRolled}
          className={clsx(
            "w-full h-full text-center dark:text-neutral-200",
            "read-only:bg-white dark:read-only:bg-neutral-900 read-only:cursor-pointer",
            (error ? "bg-red-200" : "bg-blue-100 dark:bg-neutral-800")
          )}
        />
        {disabled ? <Dices onClick={onSkillRolled}/> : <></>}
      </div>
      {(!disabled && skill.isTypal) ? (
        <select
          name={`${skill.id}TypalSelect`}
          aria-label={`${skillName} Type Select`}
          className={clsx(
            "w-full h-full bg-blue-100 dark:bg-neutral-800 font-dg-main dark:text-neutral-200 col-span-10 py-1.5",
            "disabled:bg-white dark:disabled:bg-neutral-900"
          )}
          disabled={disabled}
          value={skill.type ?? ""}
          onChange={onTypeSelectChange}
        >
          <option value={""}></option>
          {types?.map((type: any, i: number) => (
            <option key={i} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      ) : (disabled && skill.isTypal) ? (
        <p className="w-full h-full col-span-9 font-dg-main text-dg dark:text-neutral-200 py-1.5 flex items-center justify-center bg-gray-200 dark:bg-neutral-700">
          {(types?.find(it => it.id === skill.type)?.name) ?? t("bpStatMax")}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
});

export default TableSkill;
