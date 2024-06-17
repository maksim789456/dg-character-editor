"use client";

import React from "react";
import Category from "../category";
import TableItem from "../table/tableItem";
import BaseStat from "../baseStat";
import { RootState } from "@/src/store/store";
import CalcStat from "../calcStat";
import {
  maxHpSelector,
  maxWpSelector,
  maxSanSelector,
  baseStatSumSelector,
} from "@/src/redux/selectors";
import TextInput from "../textInput";
import { useSelector } from "react-redux";

interface StaticSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const StaticSection: React.FC<StaticSectionProps> = ({
  sectionLocale,
  ...props
}) => {
  const maxBpSelector = (_: RootState) => sectionLocale?.bpStatMax;
  const baseStatSum = useSelector(baseStatSumSelector);
  return (
    <Category name={sectionLocale?.categoryName} {...props}>
      <div className="grid grid-cols-1 grid-rows-5">
        <div className="grid grid-cols-1 grid-rows-8 row-span-3">
          <div className="grid grid-cols-9">
            <TableItem
              className="col-span-3 tracking-tight"
              title={sectionLocale?.stats}
              isHeader={true}
            />
            <TableItem
              className="col-span-2 tracking-tighter"
              title={sectionLocale?.statsValue}
              isHeader={true}
            />
            <TableItem title={sectionLocale?.statsValueX5} isHeader={true} />
            <TableItem
              className="col-span-3"
              title={sectionLocale?.statsDescription}
              isHeader={true}
            />
          </div>
          <BaseStat
            sectionLocale={sectionLocale}
            title={sectionLocale?.strStat}
            name="str"
          />
          <BaseStat
            sectionLocale={sectionLocale}
            title={sectionLocale?.conStat}
            name="con"
          />
          <BaseStat
            sectionLocale={sectionLocale}
            title={sectionLocale?.dexStat}
            name="dex"
          />
          <BaseStat
            sectionLocale={sectionLocale}
            title={sectionLocale?.intStat}
            name="int"
          />
          <BaseStat
            sectionLocale={sectionLocale}
            title={sectionLocale?.powStat}
            name="pow"
          />
          <BaseStat
            sectionLocale={sectionLocale}
            title={sectionLocale?.chaStat}
            name="cha"
          />
          {baseStatSum > 72 ? (
            <TableItem
              className="grid-cols-9"
              customTitle={
                <>
                  {sectionLocale?.statsTooMuch}
                  <br />
                  {sectionLocale?.statsTooMuch2}
                  {` ${baseStatSum}`}
                </>
              }
              isHeader={true}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="grid grid-cols-1 grid-rows-5 row-span-2">
          <div className="grid grid-cols-4">
            <TableItem
              className="col-span-2"
              title={sectionLocale?.calcStats}
            />
            <TableItem
              className=""
              title={sectionLocale?.calcStatsMax}
              isHeader={true}
            />
            <TableItem
              title={sectionLocale?.calcStatsCurrent}
              isHeader={true}
            />
          </div>
          <CalcStat
            title={sectionLocale?.hpStat}
            name="hp"
            maxSelector={maxHpSelector}
          />
          <CalcStat
            title={sectionLocale?.wpStat}
            name="wp"
            maxSelector={maxWpSelector}
          />
          <CalcStat
            title={sectionLocale?.sanStat}
            name="san"
            maxSelector={maxSanSelector}
          />
          <CalcStat
            title={sectionLocale?.bpStat}
            name="bp"
            maxSelector={maxBpSelector}
          />
        </div>
        <TextInput
          title={sectionLocale?.description}
          multiline={true}
          name="description"
        />
      </div>
    </Category>
  );
};

export default StaticSection;
