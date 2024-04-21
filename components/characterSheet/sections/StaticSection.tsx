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
} from "@/src/redux/selectors";
import TextInput from "../textInput";
import clsx from "clsx";

interface StaticSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
  viewMode?: boolean;
}

const StaticSection: React.FC<StaticSectionProps> = ({
  sectionLocale,
  viewMode,
  ...props
}) => {
  const maxBpSelector = (_: RootState) => sectionLocale?.bpStatMax;
  return (
    <Category name={sectionLocale?.categoryName} vertical={viewMode} {...props}>
      <div
        className={clsx("grid", {
          "grid-cols-1 grid-rows-5": !viewMode,
          "grid-cols-2 grid-rows-3": viewMode,
        })}
      >
        <div className={clsx("grid grid-cols-1 grid-rows-7 row-span-3", {"border-r-2 border-dg": viewMode})}>
          <div
            className={clsx("grid", {
              "grid-cols-9": !viewMode,
              "grid-cols-6": viewMode,
            })}
          >
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
            {viewMode ? (
              <></>
            ) : (
              <TableItem
                className="col-span-3"
                title={sectionLocale?.statsDescription}
                isHeader={true}
              />
            )}
          </div>
          <BaseStat
            sectionLocale={sectionLocale}
            title={sectionLocale?.strStat}
            name="str"
            viewMode={viewMode}
          />
          <BaseStat
            sectionLocale={sectionLocale}
            title={sectionLocale?.conStat}
            name="con"
            viewMode={viewMode}
          />
          <BaseStat
            sectionLocale={sectionLocale}
            title={sectionLocale?.dexStat}
            name="dex"
            viewMode={viewMode}
          />
          <BaseStat
            sectionLocale={sectionLocale}
            title={sectionLocale?.intStat}
            name="int"
            viewMode={viewMode}
          />
          <BaseStat
            sectionLocale={sectionLocale}
            title={sectionLocale?.powStat}
            name="pow"
            viewMode={viewMode}
          />
          <BaseStat
            sectionLocale={sectionLocale}
            title={sectionLocale?.chaStat}
            name="cha"
            viewMode={viewMode}
          />
        </div>
        <div
          className={clsx("grid grid-cols-1", {
            "row-span-2 grid-rows-5": !viewMode,
            "row-span-3 grid-rows-7": viewMode,
          })}
        >
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
        {!viewMode ? (
          <TextInput
            title={sectionLocale?.description}
            multiline={true}
            name="description"
          />
        ) : (
          <></>
        )}
      </div>
    </Category>
  );
};

export default StaticSection;
