"use client";

import React from "react";

interface TextInputProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  multiline?: boolean;
  rows?: number;

  disabled?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  title,
  disabled,
  multiline,
  value,
  onValueChange,
  rows,
  ...props
}) => {
  return (
    <div
      className={`border border-dg ${
        multiline ? "border-0" : "border-t-0 border-l-0"
      } ${props.className || ""} flex flex-col w-full`}
    >
      <p className="font-dg-main text-xs p-1">{title}</p>
      {multiline ? (
        <textarea
          className="bg-blue-100 resize-none disabled:bg-gray-200"
          disabled={disabled}
          rows={rows || 3}
          value={value}
          onChange={(e) => (onValueChange ? onValueChange(e.target.value) : e)}
        />
      ) : (
        <input
          type="text"
          className="bg-blue-100 disabled:bg-gray-200"
          disabled={disabled}
          value={value}
          onChange={(e) => (onValueChange ? onValueChange(e.target.value) : e)}
        ></input>
      )}
    </div>
  );
};

export default TextInput;
