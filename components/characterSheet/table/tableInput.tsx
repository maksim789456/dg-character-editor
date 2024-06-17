"use client";

import React from "react";

interface TableInputProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  checkable?: boolean;
  isNumber?: boolean;
  disabled?: boolean;
  through?: boolean;
  select?: boolean;
  types?: any;
  inputClassName?: string;
  value?: number | string;
  maxValue?: number;
  onValueChange?: (value: number | string) => void;
  checkboxValue?: boolean;
  onCheckboxValueChange?: (value: boolean) => void;
}

const TableInput: React.FC<TableInputProps> = ({
  placeholder,
  checkable,
  isNumber,
  disabled,
  through,
  select,
  types,
  inputClassName,
  value,
  maxValue,
  onValueChange,
  checkboxValue,
  onCheckboxValueChange,
  ...props
}) => {
  const onInputNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onValueChange) return;

    let value = e.target.value === "" ? 0 : parseInt(e.target.value);
    if (isNaN(value)) value = 0;
    if (maxValue && value > maxValue) value = maxValue;
    onValueChange(value);
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onValueChange) onValueChange(e.target.value);
  };

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onCheckboxValueChange) onCheckboxValueChange(e.target.checked);
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onValueChange) onValueChange(e.target.value);
  };

  return (
    <div
      className={
        "border-b border-r border-dg last:border-r-0 w-full h-full flex flex-row " +
        (props.className || "")
      }
    >
      {checkable ? (
        <input
          name="tableItemCheck"
          type="checkbox"
          className="m-1.5"
          checked={checkboxValue ?? false}
          onChange={onCheckboxChange}
        />
      ) : (
        <></>
      )}
      {!select ? (
        <input
          name="tableItemValue"
          type="text"
          inputMode={isNumber ? "numeric" : "text"}
          pattern={isNumber ? "[0-9]*" : ""}
          disabled={disabled}
          className={`w-full h-full bg-blue-100 text-center font-dg-main text-dg
        placeholder:font-dg-main placeholder:text-[0.6rem] placeholder:text-dg placeholder:font-light 
        disabled:bg-gray-200 ${through ? "line-through" : ""} ${inputClassName ?? ""}`}
          placeholder={placeholder}
          value={value}
          onChange={isNumber ? onInputNumberChange : onTextChange}
        ></input>
      ) : (
        <select
          name="tableItemSelect"
          disabled={disabled}
          className={`w-full h-full bg-blue-100 text-center font-dg-main tracking-tight text-dg disabled:bg-gray-200 ${inputClassName ?? ""}`}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={onSelectChange}
        >
          <option value={""}></option>
          {types.map((skill: any, i: number) => (
            <option key={i} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default TableInput;
