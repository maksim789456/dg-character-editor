"use client";

import React from "react";
import Category from "../category";
import TextInput from "../textInput";
import SpecialTrainingsList from "../specialTraining/specialTrainingsList";
import { useTranslations } from "next-intl";

interface RemarksSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const RemarksSection: React.FC<RemarksSectionProps> = () => {
  const t = useTranslations("characterSheet.remarksSection");
  return (
    <Category className="col-span-2" name={t("categoryName")}>
      <div className="flex flex-col">
        <div className="grid grid-cols-2 grid-rows-2 grid-flow-row">
          <TextInput
            className="row-span-2 border-r border-dg"
            title={t("personalInfoRemarks")}
            multiline={true}
            rows={15}
            name="personalDetails"
          />
          <TextInput
            className="border-b border-dg"
            title={t("homeFamilyEvents")}
            multiline={true}
            rows={7}
            name="developmentsFamily"
          />
          <SpecialTrainingsList />
        </div>
        <div className="border-t border-dg dark:border-neutral-800 flex items-center justify-center gap-3 px-1">
          <p className="font-dg-main text-dg dark:text-neutral-200 text-xs py-1 text-center">
            {t("remarksDescription")}
          </p>
        </div>
      </div>
    </Category>
  );
};

export default RemarksSection;
