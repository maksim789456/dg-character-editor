import { RootState } from "@/src/store/store";
import TableInput from "./table/tableInput";
import TableItem from "./table/tableItem";
import { setStat } from "@/src/features/dgCharacter/dgCharacterSlice";
import { makeCalcStatSelectorInstance } from "@/src/redux/selectors";
import PropTypes from "prop-types";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useCallback, useMemo } from "react";

interface CalcStatProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  name: string;
  maxSelector: (state: RootState) => any;
  max?: number | string;
  value?: number;
  onValueChange?: (value: number) => void;
}

const CalcStat: React.FC<CalcStatProps> = ({
  title,
  name,
  maxSelector,
}) => {
  const dispatch = useAppDispatch();

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

  return (
    <div className="grid grid-cols-4">
      <TableItem ariaLabel={title} className="col-span-2 py-1" title={title} />
      <TableItem
        ariaLabel={`${title} Max Value`}
        title={max?.toString() ?? ""}
        isHeader={true}
        fontSize="text-base dark:text-neutral-200"
      />
      <TableInput
        ariaLabel={`${title} Current Value`}
        isNumber={true}
        value={value ?? 0}
        onValueChange={(value) =>
          onValueChange ? onValueChange(value as number) : value
        }
        maxValue={typeof max === "string" ? 99 : max}
      />
    </div>
  );
};

CalcStat.propTypes = {
  title: PropTypes.string.isRequired,
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.number,
  onValueChange: PropTypes.func,
};

export default CalcStat;
