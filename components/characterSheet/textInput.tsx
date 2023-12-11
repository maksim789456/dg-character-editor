"use client";

import { set } from "@/src/features/dgCharacter/dgCharacterSlice";
import { DgCharacter } from "@/src/model/character";
import { RootState } from "@/src/store/store";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";

interface TextInputProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  multiline?: boolean;
  rows?: number;
  name?: string;

  disabled?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
}

const fieldSelector = (dgCharacter: DgCharacter, fieldName: string) =>
  dgCharacter[fieldName as keyof DgCharacter] as string;
const makeFieldSelectorInstance = (fieldName: string) =>
  createSelector(
    (state: RootState) => state.dgCharacter,
    (dgCharacter) => fieldSelector(dgCharacter, fieldName)
  );

const makeMapState = (_: RootState, ownProps: TextInputProps) => {
  const fieldSelect = makeFieldSelectorInstance(ownProps.name ?? "");
  return function realMapState(state: RootState) {
    const fieldValue = fieldSelect(state);
    return {
      value: fieldValue,
      disabled: !state.dgCharacter.editMode,
    };
  };
};

const makeDispatchState = (dispatch: Dispatch, ownProps: TextInputProps) => ({
  onValueChange: (value: any) =>
    dispatch(set({ field: ownProps.name ?? "", value })),
});

const TextInput: React.FC<TextInputProps> = ({
  title,
  disabled,
  multiline,
  name,
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
          name={name}
          disabled={disabled}
          rows={rows || 3}
          value={value ?? ''}
          onChange={(e) => (onValueChange ? onValueChange(e.target.value) : e)}
        />
      ) : (
        <input
          type="text"
          className="bg-blue-100 disabled:bg-gray-200"
          name={name}
          disabled={disabled}
          value={value ?? ''}
          onChange={(e) => (onValueChange ? onValueChange(e.target.value) : e)}
        ></input>
      )}
    </div>
  );
};

export default connect(makeMapState, makeDispatchState)(TextInput);
