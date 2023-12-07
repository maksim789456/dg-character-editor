"use client";

import React from "react";
import Category from "../category";
import TableItem from "../table/tableItem";
import SanityLoss from "../sanityLoss";
import AddBound from "../bound/addBound";
import BoundInstructions from "../bound/boundInstructions";
import BoundsList from "../bound/boundsList";
import MotivationDescription from "../motivationDescription";

interface PsychologicalSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const PsychologicalSection: React.FC<PsychologicalSectionProps> = ({
  sectionLocale,
  ...props
}) => {
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
          <BoundsList />
          <AddBound sectionLocale={sectionLocale} />
          <BoundInstructions sectionLocale={sectionLocale} />
        </div>
        <div className="row-span-3">
          <div className="border-b border-dg flex items-center justify-center">
            <p className="font-dg-main text-dg text-sm py-1 text-center">
              {sectionLocale?.motivation}
            </p>
          </div>
          <MotivationDescription />
        </div>
        <SanityLoss sectionLocale={sectionLocale} />
      </div>
    </Category>
  );
};

export default PsychologicalSection;
