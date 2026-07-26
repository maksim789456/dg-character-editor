import { RootState } from "@/src/store/store";
import TableInput from "./table/tableInput";
import TableItem from "./table/tableItem";
import { rollStat, setStat } from "@/src/features/dgCharacter/dgCharacterSlice";
import { makeCalcStatSelectorInstance } from "@/src/redux/selectors";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useCallback, useMemo } from "react";
import clsx from "clsx";
import Dices from "../icons/dices";

interface CalcStatProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  name: string;
  maxSelector: (state: RootState) => any;
  allowRoll?: boolean;
  disabled?: boolean;
  max?: number | string;
  value?: number;
  onValueChange?: (value: number) => void;
  onSkillRolled?: () => void;
}

export default function CalcStat({
  title,
  name,
  maxSelector,
}: CalcStatProps) {
  const dispatch = useAppDispatch();
  const disabled = useAppSelector(s => !s.dgCharacter.editMode);
  const allowRoll = useMemo(() => name === "san", [name]);

  const calcStatSelector = useMemo(
    () => makeCalcStatSelectorInstance(name ?? ""),
    [name]
  );
  const value = useAppSelector(calcStatSelector);
  const max = useAppSelector(maxSelector);

  const onValueChange = useCallback(
    (value: number) => dispatch(setStat({ field: name, value })),
    [dispatch, name]
  );

  const onSkillRolled = useCallback(
    () => dispatch(rollStat(name)),
    [dispatch, name]
  );

  return (
    <div className="grid grid-cols-4">
      <TableItem ariaLabel={title} className="col-span-2 py-1" title={title} />
      <TableItem
        ariaLabel={`${title} Max Value`}
        title={max?.toString() ?? ""}
        isHeader={true}
        fontSize="text-base dark:text-neutral-200"
      />
      <div
        className={clsx(
          "w-full h-full bg-blue-100 dark:bg-neutral-800",
          "border-b border-dg dark:border-neutral-600",
          "flex flex-row gap-0.5 items-center",
          disabled && allowRoll && "pr-1 cursor-pointer"
        )}
      >
        <TableInput
          className={clsx("!border-0", disabled && allowRoll && "!border-r")}
          ariaLabel={`${title} Current Value`}
          isNumber={true}
          value={value ?? 0}
          onValueChange={(value) =>
            onValueChange ? onValueChange(value as number) : value
          }
          maxValue={typeof max === "string" ? 99 : max}
        />
        {disabled && allowRoll ? <Dices onClick={onSkillRolled} /> : <p></p>}
      </div>
    </div>
  );
};
