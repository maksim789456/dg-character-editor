import { DgRoll, DgRollResult } from "@/src/model/character";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useSonner } from "sonner";

export interface DiceRollToastProps extends React.HTMLAttributes<HTMLDivElement> {
  toastId: string | number;
  statId: string;
  statName?: string;
  isStaticStat?: boolean;
  roll: DgRoll;
}

export const rollResultColors: Record<DgRollResult, string> = {
  [DgRollResult.Fumble]:
    "text-red-500 dark:text-red-500/70",
  [DgRollResult.Failure]:
    "text-red-500 dark:text-red-500/70",

  [DgRollResult.Success]:
    "text-emerald-500 dark:text-emerald-500/70",
  [DgRollResult.CriticalSuccess]:
    "text-emerald-500 dark:text-emerald-500/70",
};

const DiceRollToast = function DiceRollToastInternal({
  toastId,
  statId,
  statName,
  isStaticStat,
  roll,
  ...props
}: DiceRollToastProps) {
  const t = useTranslations("characterSheet");
  const isLast = true;

  const rateStr = useMemo(() =>
    roll.rate.toString() + "%"
    + (typeof roll.modifier !== "undefined" && roll.modifier !== 0
      ? ` + ${roll.modifier}%` : "")
    , [roll]); // Build stat% + modifier% or only stat% string

  const rollStr = useMemo(() =>
    roll.roll.toString() +
      (roll.result === DgRollResult.CriticalSuccess
      || roll.result === DgRollResult.Fumble ? "!" : "")
    , [roll]);

  const statNameMemo = useMemo(() => isStaticStat ? t("rollToast." + statId) : statName, [statName, isStaticStat]);

  return (
    <div className={clsx("w-full p-4 rounded-lg flex items-center",
      "ring-1 ring-black/5",
      "bg-white dark:bg-neutral-800 shadow-lg"
    )}>
      <div className="flex flex-1 items-center">
        {isLast ?
          <div className="w-full h-full flex flex-row justify-between gap-2">
            <div className="w-full">
              <p className="text-md font-dg-main dark:text-neutral-200">{`${t("rollToast.roll")} ${statNameMemo}`}</p>
              <p className="mt-1 text-sm dark:text-neutral-200">{rateStr}</p>
            </div>
            <p className={clsx(
              "w-14 flex justify-center items-center font-dg-main text-2xl",
              rollResultColors[roll.result]
            )}
            >{rollStr}</p>
          </div>
          :
          <></>
        }
      </div>
    </div>
  );
};

export default DiceRollToast;