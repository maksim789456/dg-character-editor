import TableInput from "./table/tableInput";
import TableItem from "./table/tableItem";
import {
  setBaseStat,
  setBaseStatDescription,
} from "@/src/features/dgCharacter/dgCharacterSlice";
import { baseStatSumSelector, makeBaseStatSelectorInstance } from "@/src/redux/selectors";
import clsx from "clsx";
import { useTranslations } from "next-intl";
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
  const disabled = useAppSelector(s => !s.dgCharacter.editMode);

  const baseStatSelector = useMemo(
    () => makeBaseStatSelectorInstance(name ?? ""),
    [name]
  );
  const { score, description } = useAppSelector(baseStatSelector);

  const onScoreChange = useCallback(
    (value: number) => dispatch(setBaseStat({ field: name, value })),
    [dispatch, name]
  );

  const onDescriptionChange = useCallback(
    (value: string) => dispatch(setBaseStatDescription({ field: name, value })),
    [dispatch, name]
  );

  return (
    <div className="grid grid-cols-9">
      <TableItem className="col-span-3" title={title} />
      <TableInput
        className={clsx("col-span-2")}
        ariaLabel={`${title} Value`}
        inputClassName={clsx(baseStatSumIsToBig && "bg-yellow-100")}
        disabled={disabled}
        value={score}
        isNumber={true}
        onValueChange={(value) => onScoreChange(value as number)}
      />
      <TableItem
        ariaLabel={`${title} Value x5`}
        title={`${(score ?? 0) * 5}`}
        isHeader={true}
        fontSize="text-base dark:text-neutral-200"
      />
      {(score ?? 0) < 9 || (score ?? 0) > 12 ? (
        <TableInput
          className="col-span-3"
          ariaLabel={`${title} Description`}
          disabled={disabled}
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
