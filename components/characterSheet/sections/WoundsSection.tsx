"use client";

import React from "react";
import Category from "../category";
import TextInput from "../textInput";
import { set } from "@/src/features/dgCharacter/dgCharacterSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

interface WoundsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const WoundsSection: React.FC<WoundsSectionProps> = ({ sectionLocale }) => {
  const firstHelpAttempted = useAppSelector(
    (state) => state.dgCharacter.firstHelpAttempted
  );
  const dispatch = useAppDispatch();
  return (
    <Category className="col-span-2" name={sectionLocale?.categoryName}>
      <div className="flex flex-col">
        <TextInput
          title={sectionLocale?.wounds}
          multiline={true}
          rows={6}
          name="wounds"
        />
        <div className="border-t border-dg flex items-center justify-center gap-3 px-1">
          <p className="font-dg-main text-dg text-xs py-1 text-center">
            {sectionLocale?.firstHelp}
          </p>
          <div className="flex flex-row">
            <input
              type="checkbox"
              className="mr-1"
              checked={firstHelpAttempted ?? false}
              onChange={(e) =>
                dispatch(
                  set({ field: "firstHelpAttempted", value: e.target.checked })
                )
              }
            />
            <p className="font-dg-main text-dg text-xs py-1 text-center">
              {sectionLocale?.firstHelpYes}
            </p>
          </div>
        </div>
      </div>
    </Category>
  );
};

export default WoundsSection;
