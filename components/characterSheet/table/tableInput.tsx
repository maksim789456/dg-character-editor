"use client";

import React from "react";

interface TableInputProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  checkable?: boolean;
  isNumber?: boolean;
  disabled?: boolean;
  through?: boolean;
  value?: number | string;
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
  value,
  onValueChange,
  checkboxValue,
  onCheckboxValueChange,
  ...props
}) => {
  const onInputNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onValueChange) return;

    let value = e.target.value === "" ? 0 : parseInt(e.target.value);
    if (isNaN(value)) value = 0; 
    onValueChange(value);
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onValueChange) onValueChange(e.target.value);
  };

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onCheckboxValueChange) onCheckboxValueChange(e.target.checked);
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
          type="checkbox"
          className="m-1.5"
          checked={checkboxValue}
          onChange={onCheckboxChange}
        />
      ) : (
        <></>
      )}
      <input
        type="text"
        inputMode={isNumber ? "numeric" : "text"}
        pattern={isNumber ? "[0-9]*" : ""}
        disabled={disabled}
        className={`w-full h-full bg-blue-100 text-center font-dg-main text-dg
        placeholder:font-dg-main placeholder:text-[0.6rem] placeholder:text-dg placeholder:font-light 
        disabled:bg-gray-200 ${through ? "line-through": ""}`}
        placeholder={placeholder}
        value={value}
        onChange={isNumber ? onInputNumberChange : onTextChange}
      ></input>
    </div>
  );
};

export default TableInput;
