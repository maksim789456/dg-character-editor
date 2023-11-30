"use client";

import React from "react";
import Category from "../category";
import TableInput from "../table/tableInput";
import TableItem from "../table/tableItem";
import { useDispatch, useSelector } from "react-redux";
import { DgCharacter, DgCharacterBound } from "@/src/model/character";
import {
  addBound,
  editBound,
  set,
} from "@/src/features/dgCharacter/dgCharacterSlice";

interface PsychologicalSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const PsychologicalSection: React.FC<PsychologicalSectionProps> = ({
  sectionLocale,
  ...props
}) => {
  const dgCharacter = useSelector(
    (state: any) => state.dgCharacter
  ) as DgCharacter;
  const dispatch = useDispatch();

  return (
    <Category name={sectionLocale?.categoryName} {...props}>
      <div className="grid grid-cols-1 grid-rows-8 h-full">
        <div className="grid grid-cols-1 row-span-3 grid-rows-7">
          <div className="grid grid-cols-9">
            <TableItem
              className="col-span-7 tracking-tighter"
              title={sectionLocale?.bonds}
              isHeader={true}
            />
            <TableItem
              className="col-span-2 tracking-tighter"
              title={sectionLocale?.bondsValue}
              isHeader={true}
            />
          </div>
          {dgCharacter.bounds.map((bound: DgCharacterBound, i: number) => {
            return (
              <div className="grid grid-cols-9" key={i}>
                <TableInput
                  className="col-span-7"
                  checkable={true}
                  disabled={!dgCharacter.editMode}
                  through={bound.score === 0}
                  value={bound.name}
                  onValueChange={(value) => {
                    dispatch(
                      editBound({
                        id: i,
                        bound: { ...bound, name: value as string },
                      })
                    );
                  }}
                  checkboxValue={bound.damaged}
                  onCheckboxValueChange={(value) => {
                    dispatch(
                      editBound({
                        id: i,
                        bound: { ...bound, damaged: value },
                      })
                    );
                  }}
                />
                <TableInput
                  className="col-span-2"
                  isNumber={true}
                  value={bound.score}
                  maxValue={dgCharacter.stats.cha.score}
                  onValueChange={(value) => {
                    dispatch(
                      editBound({
                        id: i,
                        bound: { ...bound, score: value as number },
                      })
                    );
                  }}
                />
              </div>
            );
          })}
          {dgCharacter.bounds.length != 5 && dgCharacter.editMode ? (
            <div className="border-b border-dg flex items-center justify-center">
              <button
                className="font-dg-main text-dg outline outline-dg rounded my-1 px-3 bg-blue-100"
                onClick={() => dispatch(addBound())}
              >
                {sectionLocale?.addBound}
              </button>
            </div>
          ) : dgCharacter.bounds.length === 0 ? (
            <div className="border-b border-dg flex items-center justify-center">
              <p className="font-dg-main text-base text-center py-1">
                {sectionLocale?.noBounds}
              </p>
            </div>
          ) : (
            <></>
          )}
          {dgCharacter.bounds.length !== 0 ? (
            <div className="border-b border-dg flex items-center justify-center">
              <p className="font-dg-main text-xs text-center py-1">
                {sectionLocale?.bondsInstruction}
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="row-span-3">
          <div className="border-b border-dg flex items-center justify-center">
            <p className="font-dg-main text-dg text-sm py-1 text-center">
              {sectionLocale?.motivation}
            </p>
          </div>
          <textarea
            className="bg-blue-100 resize-none w-full translate-y-3"
            rows={7}
            value={dgCharacter.motivationDescription ?? ''}
            onChange={(e) =>
              dispatch(
                set({ field: "motivationDescription", value: e.target.value })
              )
            }
          />
        </div>
        <div className="row-span-2 flex flex-col justify-center">
          <div className="border-t border-b border-dg flex items-center justify-center">
            <p className="font-dg-main text-dg text-sm py-1 text-center">
              {sectionLocale?.sanLoss}
            </p>
          </div>
          <div className="flex flex-row justify-evenly items-center py-1">
            <p className="font-dg-main text-dg text-sm">
              {sectionLocale?.sanLossViolence}
            </p>
            <input
              type="checkbox"
              checked={dgCharacter.violence >= 1}
              onChange={(e) =>
                dispatch(
                  set({ field: "violence", value: e.target.checked ? 1 : 0 })
                )
              }
            />
            <input
              type="checkbox"
              checked={dgCharacter.violence >= 2}
              onChange={() => dispatch(set({ field: "violence", value: 2 }))}
            />
            <input
              type="checkbox"
              checked={dgCharacter.violence === 3}
              onChange={() => dispatch(set({ field: "violence", value: 3 }))}
            />
            <i className="font-dg-main text-dg text-sm">
              {sectionLocale?.sanLossAdapted}
            </i>
            <p className="font-dg-main text-dg text-sm">
              {sectionLocale?.sanLossHelplessness}
            </p>
            <input
              type="checkbox"
              checked={dgCharacter.helplessness >= 1}
              onChange={(e) =>
                dispatch(
                  set({
                    field: "helplessness",
                    value: e.target.checked ? 1 : 0,
                  })
                )
              }
            />
            <input
              type="checkbox"
              checked={dgCharacter.helplessness >= 2}
              onChange={() =>
                dispatch(set({ field: "helplessness", value: 2 }))
              }
            />
            <input
              type="checkbox"
              checked={dgCharacter.helplessness === 3}
              onChange={() =>
                dispatch(set({ field: "helplessness", value: 3 }))
              }
            />
            <i className="font-dg-main text-dg text-sm">
              {sectionLocale?.sanLossAdapted}
            </i>
          </div>
        </div>
      </div>
    </Category>
  );
};

export default PsychologicalSection;
