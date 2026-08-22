"use client";

import { set } from "@/src/features/dgCharacter/dgCharacterSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { makeFieldSelectorInstance } from "@/src/redux/selectors";
import React, { useCallback, useMemo } from "react";

interface TextInputProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  multiline?: boolean;
  rows?: number;
  name?: string;

  enabledInView?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  title,
  multiline,
  rows,
  name,
  enabledInView,
  ...props
}) => {
  const dispatch = useAppDispatch();
  const disabled = useAppSelector(
    s => enabledInView ? false : !s.dgCharacter.editMode);

  const fieldSelect = useMemo(
    () => makeFieldSelectorInstance(name ?? ""),
    [name]
  );
  const value = useAppSelector(fieldSelect);

  const onValueChange = useCallback(
    (value: string) => dispatch(set({ field: name ?? "", value })),
    [dispatch, name]
  );

  return (
    <div
      className={`border border-dg dark:border-neutral-600 ${multiline ? "border-0" : "border-t-0 border-l-0"
        } ${props.className || ""} flex flex-col w-full`}
    >
      <p className="font-dg-main dark:text-neutral-200 text-xs p-1">{title}</p>
      {multiline ? (
        <textarea
          className="bg-blue-100 dark:bg-neutral-800 dark:text-neutral-200 resize-none disabled:bg-white dark:disabled:bg-neutral-700"
          name={name}
          aria-label={title}
          disabled={disabled}
          rows={rows || 3}
          value={value ?? ''}
          onChange={(e) => onValueChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          className="px-1 bg-blue-100 dark:bg-neutral-800 dark:text-neutral-200 disabled:bg-white dark:disabled:bg-neutral-700"
          name={name}
          aria-label={title}
          disabled={disabled}
          value={value ?? ''}
          onChange={(e) => onValueChange(e.target.value)}
        ></input>
      )}
    </div>
  );
};

export default TextInput;
