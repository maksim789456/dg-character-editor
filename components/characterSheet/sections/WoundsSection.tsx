"use client";

import React from "react";
import Category from "../category";
import TextInput from "../textInput";
import FirstHelpAttemptedCheckbox from "../firstHelpAttempted";
import { useTranslations } from "next-intl";

interface WoundsSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const WoundsSection: React.FC<WoundsSectionProps> = () => {
  const t = useTranslations("characterSheet.woundsSection");
  return (
    <Category className="col-span-2" name={t("categoryName")}>
      <div className="flex flex-col">
        <TextInput
          title={t("wounds")}
          enabledInView={true}
          multiline={true}
          rows={6}
          name="wounds"
        />
        <div className="border-t border-dg flex items-center justify-center gap-3 px-1">
          <p className="font-dg-main text-dg dark:text-neutral-200 text-xs py-1 text-center">
            {t("firstHelp")}
          </p>
          <div className="flex flex-row">
            <FirstHelpAttemptedCheckbox className="mr-1" />
            <p className="font-dg-main text-dg dark:text-neutral-200 text-xs py-1 text-center">
              {t("firstHelpYes")}
            </p>
          </div>
        </div>
      </div>
    </Category>
  );
};

export default WoundsSection;
