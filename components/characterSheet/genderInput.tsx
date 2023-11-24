"use client";

import { DgGender } from "@/src/model/character";
import React from "react";

interface GenderInputProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  mTitle: string;
  fTitle: string;
  disabled?: boolean;

  gender?: DgGender;
  onGenderChange?: (value: DgGender) => void;

  customGender?: string;
  onCustomGenderChange?: (value: string) => void;
}

const GenderInput: React.FC<GenderInputProps> = ({
  title,
  mTitle,
  fTitle,
  disabled,
  gender,
  onGenderChange,
  customGender,
  onCustomGenderChange,
  ...props
}) => {
  const onCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    valueToSet: DgGender
  ) => {
    if (onGenderChange)
      onGenderChange(e.target.checked ? valueToSet : DgGender.None);
  };

  const onCustomGenderInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (onCustomGenderChange) 
      onCustomGenderChange(e.target.value);
  };

  return (
    <div
      className={
        "border border-dg border-t-0 border-l-0 w-full h-full " +
        (props.className || "")
      }
    >
      <p className="font-dg-main text-xs p-1">{title}</p>
      <div className="flex flex-row items-center gap-1 px-1">
        <input
          type="checkbox"
          disabled={disabled}
          checked={gender === DgGender.Male}
          onChange={(e) => onCheckboxChange(e, DgGender.Male)}
        />
        <p className="font-dg-main text-xs">{mTitle}</p>
        <input
          type="checkbox"
          disabled={disabled}
          checked={gender === DgGender.Female}
          onChange={(e) => onCheckboxChange(e, DgGender.Female)}
        />
        <p className="font-dg-main text-xs mr-0.5">{fTitle}</p>
        <input
          type="checkbox"
          disabled={disabled}
          checked={gender === DgGender.Custom}
          onChange={(e) => onCheckboxChange(e, DgGender.Custom)}
        />
        <input
          type="text"
          className="w-full bg-blue-100 disabled:bg-gray-200"
          disabled={gender !== DgGender.Custom || disabled}
          value={customGender}
          onChange={onCustomGenderInputChange}
        ></input>
      </div>
    </div>
  );
};

export default GenderInput;
