"use client";

import React from "react";
import Category from "../category";
import TextInput from "../textInput";
import TableInput from "../table/tableInput";
import TableItem from "../table/tableItem";
import { useDispatch, useSelector } from "react-redux";
import {
  DgCharacter,
  DgCharacterBaseStat,
  DgCharacterStats,
} from "@/src/model/character";
import {
  setBaseStat,
  setBaseStatDescription,
  setStat,
} from "@/src/features/dgCharacter/dgCharacterSlice";
import BaseStat from "../baseStat";

interface StaticSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const StaticSection: React.FC<StaticSectionProps> = ({
  sectionLocale,
  ...props
}) => {
  const dgCharacter = useSelector(
    (state: any) => state.dgCharacter
  ) as DgCharacter;
  const dispatch = useDispatch();
  const { editMode } = dgCharacter;
  return (
    <Category name={sectionLocale?.categoryName} {...props}>
      <div className="grid grid-cols-1 grid-rows-5">
        <div className="grid grid-cols-1 grid-rows-7 row-span-3">
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
            name={"str"}
          />
          <BaseStat
            sectionLocale={sectionLocale}
            title={sectionLocale?.conStat}
            name={"con"}
          />
          <BaseStat
            sectionLocale={sectionLocale}
            title={sectionLocale?.dexStat}
            name={"dex"}
          />
          <BaseStat
            sectionLocale={sectionLocale}
            title={sectionLocale?.intStat}
            name={"int"}
          />
          <BaseStat
            sectionLocale={sectionLocale}
            title={sectionLocale?.powStat}
            name={"pow"}
          />
          <BaseStat
            sectionLocale={sectionLocale}
            title={sectionLocale?.chaStat}
            name={"cha"}
          />
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
          <div className="grid grid-cols-4">
            <TableItem
              className="col-span-2 py-1"
              title={sectionLocale?.hpStat}
            />
            <TableItem
              title={`${Math.round(
                (dgCharacter.stats.str.score + dgCharacter.stats.con.score) / 2
              )}`}
              isHeader={true}
              fontSize="text-base"
            />
            <TableInput
              isNumber={true}
              value={dgCharacter.stats.hp}
              onValueChange={(value) => {
                dispatch(setStat({ field: "hp", value }));
              }}
            />
          </div>
          <div className="grid grid-cols-4">
            <TableItem
              className="col-span-2 py-1"
              title={sectionLocale?.wpStat}
            />
            <TableItem
              title={`${dgCharacter.stats.pow.score}`}
              isHeader={true}
              fontSize="text-base"
            />
            <TableInput
              isNumber={true}
              value={dgCharacter.stats.wp}
              onValueChange={(value) =>
                dispatch(setStat({ field: "wp", value }))
              }
            />
          </div>
          <div className="grid grid-cols-4">
            <TableItem
              className="col-span-2 py-1"
              title={sectionLocale?.sanStat}
            />
            <TableItem
              title={`${
                99 -
                (dgCharacter.skills.find((p) => p.id === "unnatural")
                  ?.characterSkillRate ?? 0)
              }`}
              isHeader={true}
              fontSize="text-base"
            />
            <TableInput
              isNumber={true}
              value={dgCharacter.stats.san}
              onValueChange={(value) =>
                dispatch(setStat({ field: "san", value }))
              }
            />
          </div>
          <div className="grid grid-cols-4">
            <TableItem
              className="col-span-2 py-1"
              title={sectionLocale?.bpStat}
            />
            <TableItem
              title={sectionLocale?.bpStatMax}
              isHeader={true}
              fontSize="text-base"
            />
            <TableItem
              isHeader={true}
              fontSize="text-base"
              title={`${dgCharacter.stats.bp}`}
            />
          </div>
        </div>
        <TextInput
          title={sectionLocale?.description}
          multiline={true}
          disabled={!editMode}
          value={dgCharacter.stats.description ?? ""}
          onValueChange={(value) =>
            dispatch(setStat({ field: "description", value }))
          }
        />
      </div>
    </Category>
  );
};

export default StaticSection;
