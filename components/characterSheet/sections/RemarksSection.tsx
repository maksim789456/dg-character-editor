"use client";

import React from "react";
import Category from "../category";
import TextInput from "../textInput";
import TableInput from "../table/tableInput";
import TableItem from "../table/tableItem";
import { useDispatch, useSelector } from "react-redux";
import { DgCharacter } from "@/src/model/character";
import {
  addSpecialTraining,
  editSpecialTraining,
  set,
} from "@/src/features/dgCharacter/dgCharacterSlice";

interface RemarksSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const RemarksSection: React.FC<RemarksSectionProps> = ({
  sectionLocale,
  ...props
}) => {
  const dgCharacter = useSelector(
    (state: any) => state.dgCharacter
  ) as DgCharacter;
  const dispatch = useDispatch();

  return (
    <Category className="col-span-2" name={sectionLocale?.categoryName}>
      <div className="flex flex-col">
        <div className="grid grid-cols-2 grid-rows-2 grid-flow-row">
          <TextInput
            className="row-span-2 border-r border-dg"
            title={sectionLocale?.personalInfoRemarks}
            multiline={true}
            rows={15}
            value={dgCharacter.personalDetails}
            onValueChange={(value) =>
              dispatch(set({ field: "personalDetails", value }))
            }
          />
          <TextInput
            className="border-b border-dg"
            title={sectionLocale?.homeFamilyEvents}
            multiline={true}
            rows={7}
            value={dgCharacter.developmentsFamily}
            onValueChange={(value) =>
              dispatch(set({ field: "developmentsFamily", value }))
            }
          />
          <div className="grid grid-cols-1 grid-rows-7">
            <div className="grid grid-cols-2">
              <TableItem
                title={sectionLocale?.specialTraining}
                isHeader={true}
              />
              <TableItem
                title={sectionLocale?.specialTrainingSkill}
                isHeader={true}
              />
            </div>
            {dgCharacter.specialTrainings.map((training, i) => {
              return (
                <div className="grid grid-cols-2" key={i}>
                  <TableInput
                    disabled={!dgCharacter.editMode}
                    value={training.name}
                    onValueChange={(value) =>
                      dispatch(
                        editSpecialTraining({
                          id: i,
                          specialTraining: {
                            ...training,
                            name: value as string,
                          },
                        })
                      )
                    }
                  />
                  <TableInput
                    disabled={!dgCharacter.editMode}
                    value={training.skill}
                    onValueChange={(value) =>
                      dispatch(
                        editSpecialTraining({
                          id: i,
                          specialTraining: {
                            ...training,
                            skill: value as string,
                          },
                        })
                      )
                    }
                  />
                </div>
              );
            })}
            {dgCharacter.specialTrainings.length != 6 &&
            dgCharacter.editMode ? (
              <div className="border-b border-dg flex items-center justify-center">
                <button
                  className="font-dg-main text-dg outline outline-dg rounded my-1 px-3 bg-blue-100"
                  onClick={() => dispatch(addSpecialTraining())}
                >
                  {sectionLocale?.addSpecialTraining}
                </button>
              </div>
            ) : dgCharacter.specialTrainings.length === 0 ? (
              <div className="border-b border-dg flex items-center justify-center">
                <p className="font-dg-main text-base text-center py-1">
                  {sectionLocale?.noSpecialTrainings}
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="border-t border-dg flex items-center justify-center gap-3 px-1">
          <p className="font-dg-main text-dg text-xs py-1 text-center">
            {sectionLocale?.remarksDescription}
          </p>
        </div>
      </div>
    </Category>
  );
};

export default RemarksSection;
