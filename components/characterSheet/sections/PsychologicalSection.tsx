"use client";

import React from "react";
import Category from "../category";
import TableItem from "../table/tableItem";
import SanityLoss from "../sanityLoss";
import AddBound from "../bound/addBound";
import BoundInstructions from "../bound/boundInstructions";
import BoundsList from "../bound/boundsList";
import MotivationDescription from "../motivationDescription";
import { useTranslations } from "next-intl";

interface PsychologicalSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
}

const PsychologicalSection: React.FC<PsychologicalSectionProps> = ({
  ...props
}) => {
  const t = useTranslations("characterSheet.psychologicalSection");
  return (
    <Category name={t("categoryName")} {...props}>
      <div className="grid grid-cols-1 grid-rows-8 h-full">
        <div className="grid grid-cols-1 row-span-3 grid-rows-7">
          <div className="grid grid-cols-9">
            <TableItem
              className="col-span-7 tracking-tighter"
              title={t("bonds")}
              isHeader={true}
            />
            <TableItem
              className="col-span-2 tracking-tighter"
              title={t("bondsValue")}
              isHeader={true}
            />
          </div>
          <BoundsList />
          <AddBound />
          <BoundInstructions />
        </div>
        <div className="row-span-3">
          <div className="border-b border-dg dark:border-neutral-600 flex items-center justify-center">
            <p className="font-dg-main dark:text-neutral-200 text-dg text-sm py-1 text-center">
              {t("motivation")}
            </p>
          </div>
          <MotivationDescription />
        </div>
        <SanityLoss />
      </div>
    </Category>
  );
};

export default PsychologicalSection;
