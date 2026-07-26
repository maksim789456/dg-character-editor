import TableInput from "./table/tableInput";
import TableItem from "./table/tableItem";
import {
  rollStat,
  setBaseStat,
  setBaseStatDescription,
} from "@/src/features/dgCharacter/dgCharacterSlice";
import { baseStatSumSelector, makeBaseStatSelectorInstance } from "@/src/redux/selectors";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Dices from "../icons/dices";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useCallback, useMemo } from "react";

interface BaseStatProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  name: string;
}

export default function BaseStat({
  title,
  name,
  ...props
}: BaseStatProps) {
  const t = useTranslations('characterSheet.staticSection');
  const dispatch = useAppDispatch();

  const baseStatSumIsToBig = useAppSelector(baseStatSumSelector) > 72;
  const playMode = useAppSelector(s => !s.dgCharacter.editMode);

  const baseStatSelector = useMemo(
    () => makeBaseStatSelectorInstance(name ?? ""),
    [name]
  );
  const { score, description } = useAppSelector(baseStatSelector);

  const scoreOutOfRange = score! < 9 || score! > 12;
  const hasDescription = (description as string)?.trim() ?? "" !== "";

  const onSkillRolled = useCallback(() => {
    if (playMode) {
      dispatch(rollStat(name));
    }
  }, [dispatch, name, playMode]);

  const onScoreChange = useCallback(
    (value: number) => dispatch(setBaseStat({ field: name, value })),
    [dispatch, name]
  );

  const onDescriptionChange = useCallback(
    (value: string) => dispatch(setBaseStatDescription({ field: name, value })),
    [dispatch, name]
  );

  return (
    <div className="grid grid-cols-10">
      <TableItem className="col-span-3" title={title} />
      <TableInput
        className={clsx("col-span-2")}
        ariaLabel={`${title} Value`}
        inputClassName={clsx(baseStatSumIsToBig && "bg-yellow-100")}
        disabled={playMode}
        value={score}
        isNumber={true}
        onValueChange={(value) => onScoreChange(value as number)}
      />
      <div className={clsx(
        "col-span-2 flex flex-row gap-1 items-center",
        "border-r border-b border-dg dark:border-neutral-600",
        playMode && "pr-1 cursor-pointer"
      )}>
        <TableItem
          className="!border-0"
          ariaLabel={`${title} Value x5`}
          title={`${score! * 5}`}
          isHeader={true}
          fontSize="text-base dark:text-neutral-200"
        />
        {playMode ? <Dices onClick={onSkillRolled} /> : <></>}
      </div>
      {!playMode && scoreOutOfRange || hasDescription ? (
        <TableInput
          className="col-span-3"
          ariaLabel={`${title} Description`}
          disabled={playMode}
          placeholder={t("statsDescriptionPlaceholder")}
          value={description ?? ""}
          onValueChange={(value) => onDescriptionChange(value as string)}
        />
      ) : (
        <TableItem
          className="col-span-3"
          isHeader={true}
          fontSize="text-base"
          title={t("bpStatMax")}
          ariaLabel={`${title} No Description`}
        />
      )}
    </div>
  );
};
