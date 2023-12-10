"use client";

import React from "react";
import Category from "../category";
import TextInput from "../textInput";
import SpecialTrainingsList from "../specialTraining/specialTrainingsList";

interface RemarksSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const RemarksSection: React.FC<RemarksSectionProps> = ({ sectionLocale }) => {
  return (
    <Category className="col-span-2" name={sectionLocale?.categoryName}>
      <div className="flex flex-col">
        <div className="grid grid-cols-2 grid-rows-2 grid-flow-row">
          <TextInput
            className="row-span-2 border-r border-dg"
            title={sectionLocale?.personalInfoRemarks}
            multiline={true}
            rows={15}
            name="personalDetails"
          />
          <TextInput
            className="border-b border-dg"
            title={sectionLocale?.homeFamilyEvents}
            multiline={true}
            rows={7}
            name="developmentsFamily"
          />
          <SpecialTrainingsList sectionLocale={sectionLocale} />
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
