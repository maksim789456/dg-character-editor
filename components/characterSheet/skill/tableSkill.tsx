"use client";

import { editSkill } from "@/src/features/dgCharacter/dgCharacterSlice";
import { useAppSelector } from "@/src/redux/hooks";
import clsx from "clsx";
import React, { memo, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DgSelect, { OptionType } from "../select";
import { SingleValue } from "react-select";
import { getTypeValue } from "@/src/utils/selectUtils";
import { currentProfessionSelector } from "@/src/redux/selectors";

interface TableSkillProps extends React.HTMLAttributes<HTMLDivElement> {
  skillId: string;
  skillName: string;
  types?: any[];
  typalNone: string;
}

const TableSkill = memo(function TableSkillInternal({
  skillId,
  skillName,
  types,
  typalNone,
  ...props
}: TableSkillProps) {
  const disabled = useAppSelector((state) => !state.dgCharacter.editMode);
  const skill = useAppSelector(
    (state) => state.dgCharacter.skills.find((skill) => skill.id === skillId)!
  );
  const currentProfession = useSelector(currentProfessionSelector);
  const profBaseSkill = currentProfession?.baseSkills.find(x => x.id == skill.id);
  const profAdditionalSkill = currentProfession?.additionalSkills.find(x => x.id == skill.id);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [typalError, setTypalError] = useState(false);

  const typeOptions = useMemo(() => {
    if (!skill.isTypal) return [];

    let options =
      types?.map((type) => {
        return {
          value: type.id,
          label: type.name,
        } as OptionType;
      }) ?? [];
    options.unshift({ label: typalNone });
    return options;
  }, [skill.isTypal, types, typalNone]);

  useEffect(() => {
    const isSkillRateSetted = (skill.characterSkillRate ?? -1) >= 0;
    const isSkillTypeSetted = (skill.type ?? "") !== "";

    setError(
      (skill.characterSkillRate ?? 99) < skill.baseSkillRate ||
        ((skill.isTypal ?? false) && !isSkillRateSetted && isSkillTypeSetted)
    );
    setTypalError(
      (skill.isTypal ?? false) && isSkillRateSetted && !isSkillTypeSetted
    );
  }, [skill]);

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

  const onTypeSelectChange = (value: SingleValue<OptionType>) => {
    dispatch(
      editSkill({ skillId: skillId, skill: { ...skill, type: value?.value } })
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
        "h-full",
        !disabled && profBaseSkill && "bg-blue-300 dark:bg-blue-500/30",
        !disabled && profAdditionalSkill && "bg-fuchsia-200 dark:bg-fuchsia-500/30"
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
        className={clsx(
          "w-full h-ful text-center dark:text-neutral-200 col-span-2 row-span-2 border-l border-dg dark:border-neutral-700 disabled:bg-gray-200 dark:disabled:bg-neutral-700",
          error
            ? "bg-red-200 dark:bg-red-700"
            : "bg-blue-100 dark:bg-neutral-800"
        )}
      ></input>
      {skill.isTypal ? (
        <DgSelect
          isDisabled={disabled}
          instanceId={`${skill.id}TypalSelect`}
          name={`${skill.id}TypalSelect`}
          value={getTypeValue(typeOptions, skill.type ?? null)}
          options={typeOptions}
          onChange={onTypeSelectChange}
          className={clsx(
            "w-full h-full col-span-10",
            typalError && "!bg-red-200 dark:!bg-red-700"
          )}
        ></DgSelect>
      ) : (
        <></>
      )}
    </div>
  );
});

export default TableSkill;
