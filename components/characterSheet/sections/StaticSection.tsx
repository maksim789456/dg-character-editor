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
import { useTranslations } from "next-intl";

interface StaticSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const StaticSection: React.FC<StaticSectionProps> = ({
  ...props
}) => {
  const t = useTranslations('characterSheet.staticSection');
  const maxBpSelector = (_: RootState) => t("bpStatMax");
  const baseStatSum = useSelector(baseStatSumSelector);
  return (
    <Category name={t("categoryName")} {...props}>
      <div className="grid grid-cols-1 grid-rows-5">
        <div className="grid grid-cols-1 grid-rows-8 row-span-3">
          <div className="grid grid-cols-9">
            <TableItem
              className="col-span-3 tracking-tight"
              title={t("stats")}
              isHeader={true}
            />
            <TableItem
              className="col-span-2 tracking-tighter"
              title={t("statsValue")}
              isHeader={true}
            />
            <TableItem title={t("statsValueX5")} isHeader={true} />
            <TableItem
              className="col-span-3"
              title={t("statsDescription")}
              isHeader={true}
            />
          </div>
          <BaseStat
            title={t("strStat")}
            name="str"
          />
          <BaseStat
            title={t("conStat")}
            name="con"
          />
          <BaseStat
            title={t("dexStat")}
            name="dex"
          />
          <BaseStat
            title={t("intStat")}
            name="int"
          />
          <BaseStat
            title={t("powStat")}
            name="pow"
          />
          <BaseStat
            title={t("chaStat")}
            name="cha"
          />
          {baseStatSum > 72 ? (
            <TableItem
              className="grid-cols-9"
              customTitle={
                <>
                  {t("statsTooMuch")}
                  <br />
                  {t("statsTooMuch2")}
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
              title={t("calcStats")}
            />
            <TableItem
              title={t("calcStatsMax")}
              isHeader={true}
            />
            <TableItem
              title={t("calcStatsCurrent")}
              isHeader={true}
            />
          </div>
          <CalcStat
            title={t("hpStat")}
            name="hp"
            maxSelector={maxHpSelector}
          />
          <CalcStat
            title={t("wpStat")}
            name="wp"
            maxSelector={maxWpSelector}
          />
          <CalcStat
            title={t("sanStat")}
            name="san"
            maxSelector={maxSanSelector}
          />
          <CalcStat
            title={t("bpStat")}
            name="bp"
            maxSelector={maxBpSelector}
          />
        </div>
        <TextInput
          title={t("description")}
          multiline={true}
          name="description"
        />
      </div>
    </Category>
  );
};

export default StaticSection;
