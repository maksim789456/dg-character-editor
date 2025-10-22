"use client";

import React from "react";

interface TextInputProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  multiline?: boolean;
  rows?: number;
  name?: string;

  enabledInView?: boolean;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  title,
  disabled,
  multiline,
  name,
  rows,
  ...props
}) => {
  return (
    <div
      className={`border border-dg dark:border-neutral-600 ${
        multiline ? "border-0" : "border-t-0 border-l-0"
      } ${props.className || ""} flex flex-col w-full`}
    >
      <p className="font-dg-main dark:text-neutral-200 text-xs px-1">{title}</p>
      {multiline ? (
        <textarea
          className="dark:text-neutral-200 resize-none disabled:bg-gray-200 dark:disabled:bg-neutral-700"
          name={name}
          aria-label={title}
          disabled={disabled}
          rows={rows || 3}
        />
      ) : (
        <input
          type="text"
          className="dark:text-neutral-200 disabled:bg-gray-200 dark:disabled:bg-neutral-700"
          name={name}
          aria-label={title}
          disabled={disabled}
        ></input>
      )}
    </div>
  );
};

export default TextInput;
