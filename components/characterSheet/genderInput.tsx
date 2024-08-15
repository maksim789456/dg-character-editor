"use client";

import { set } from "@/src/features/dgCharacter/dgCharacterSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { DgGender } from "@/src/model/character";
import React from "react";

interface GenderInputProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  mTitle: string;
  fTitle: string;
}

const GenderInput: React.FC<GenderInputProps> = ({
  title,
  mTitle,
  fTitle,
  ...props
}) => {
  const disabled = useAppSelector((state) => !state.dgCharacter.editMode);
  const gender = useAppSelector((state) => state.dgCharacter.gender);
  const customGender = useAppSelector(
    (state) => state.dgCharacter.customGender
  );

  const dispatch = useAppDispatch();

  const onCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    valueToSet: DgGender
  ) => {
    const value = e.target.checked ? valueToSet : DgGender.None;
    dispatch(set({ field: "gender", value }));
  };

  const onCustomGenderInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(set({ field: "customGender", value: e.target.value }));
  };

  return (
    <div
      className={
        "border border-dg dark:border-neutral-800 border-t-0 border-l-0 w-full h-full " +
        (props.className || "")
      }
    >
      <p className="font-dg-main text-xs dark:text-neutral-200 p-1">{title}</p>
      <div className="flex flex-row items-center gap-1 px-1">
        <input
          name="genderMale"
          aria-label="Gender Male"
          type="checkbox"
          disabled={disabled}
          checked={gender === DgGender.Male}
          onChange={(e) => onCheckboxChange(e, DgGender.Male)}
        />
        <p className="font-dg-main text-xs dark:text-neutral-200">{mTitle}</p>
        <input
          name="genderFemale"
          aria-label="Gender Female"
          type="checkbox"
          disabled={disabled}
          checked={gender === DgGender.Female}
          onChange={(e) => onCheckboxChange(e, DgGender.Female)}
        />
        <p className="font-dg-main text-xs dark:text-neutral-200 mr-0.5">{fTitle}</p>
        <input
          name="genderCustomCheck"
          aria-label="Gender Custom On/Off"
          type="checkbox"
          disabled={disabled}
          checked={gender === DgGender.Custom}
          onChange={(e) => onCheckboxChange(e, DgGender.Custom)}
        />
        <input
          name="genderCustom"
          aria-label="Gender Custom"
          type="text"
          className="w-full bg-blue-100 dark:bg-neutral-800 disabled:bg-gray-200 dark:disabled:bg-neutral-700 dark:disabled:bg-neutral-700"
          disabled={gender !== DgGender.Custom || disabled}
          value={customGender ?? ""}
          onChange={onCustomGenderInputChange}
        ></input>
      </div>
    </div>
  );
};

export default GenderInput;
