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

  const baseStats = [
    {
      title: sectionLocale?.strStat,
      name: "str",
    },
    {
      title: sectionLocale?.conStat,
      name: "con",
    },
    {
      title: sectionLocale?.dexStat,
      name: "dex",
    },
    {
      title: sectionLocale?.intStat,
      name: "int",
    },
    {
      title: sectionLocale?.powStat,
      name: "pow",
    },
    {
      title: sectionLocale?.chaStat,
      name: "cha",
    },
  ];

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
          {baseStats.map((stat: any) => {
            const statValue = dgCharacter.stats[
              stat.name as keyof DgCharacterStats
            ] as DgCharacterBaseStat;
            const isExceptional = statValue.score < 9 || statValue.score > 12;
            return (
              <div className="grid grid-cols-9" key={stat.name}>
                <TableItem className="col-span-3" title={stat.title} />
                <TableInput
                  className="col-span-2"
                  disabled={!editMode}
                  value={statValue.score}
                  isNumber={true}
                  onValueChange={(value) =>
                    dispatch(setBaseStat({ field: stat.name, value }))
                  }
                />
                <TableItem
                  title={`${statValue.score * 5}`}
                  isHeader={true}
                  fontSize="text-base"
                />
                {isExceptional ? (
                  <TableInput
                    className="col-span-3"
                    disabled={!editMode}
                    placeholder={sectionLocale?.statsDescriptionPlaceholder}
                    value={statValue.description ?? ""}
                    onValueChange={(value) =>
                      dispatch(
                        setBaseStatDescription({ field: stat.name, value })
                      )
                    }
                  />
                ) : (
                  <TableItem
                    className="col-span-3"
                    isHeader={true}
                    fontSize="text-base"
                    title={sectionLocale?.bpStatMax}
                  />
                )}
              </div>
            );
          })}
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
              title={`${
                dgCharacter.stats.san - dgCharacter.stats.pow.score < 0
                  ? 0
                  : dgCharacter.stats.san - dgCharacter.stats.pow.score
              }`}
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
