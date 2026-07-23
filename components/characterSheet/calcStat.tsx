import { RootState } from "@/src/store/store";
import TableInput from "./table/tableInput";
import TableItem from "./table/tableItem";
import { connect, useSelector } from "react-redux";
import { rollStat, setStat } from "@/src/features/dgCharacter/dgCharacterSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { makeCalcStatSelectorInstance } from "@/src/redux/selectors";
import PropTypes from "prop-types";
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

const makeMapState = (_: RootState, ownProps: CalcStatProps) => {
  const calcStatSelector = makeCalcStatSelectorInstance(ownProps.name ?? "");
  return function realMapState(state: RootState) {
    const calcStat = calcStatSelector(state);
    const maxStat = ownProps.maxSelector(state);
    return {
      max: maxStat,
      value: calcStat,
      disabled: !state.dgCharacter.editMode,
      allowRoll: ownProps.name === "san"
    };
  };
};

const makeDispatchState = (dispatch: Dispatch, ownProps: CalcStatProps) => ({
  onValueChange: (value: number) =>
    dispatch(setStat({ field: ownProps.name, value })),
  onSkillRolled: () => dispatch(rollStat(ownProps.name)),
});

const CalcStat: React.FC<CalcStatProps> = ({
  title,
  disabled,
  allowRoll,
  max,
  value,
  onValueChange,
  onSkillRolled
}) => {
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
          "border-b border-dg dark:border-neutral-800",
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

CalcStat.propTypes = {
  title: PropTypes.string.isRequired,
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  allowRoll: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.number,
  onValueChange: PropTypes.func,
  onSkillRolled: PropTypes.func,
};

export default connect(makeMapState, makeDispatchState)(CalcStat);
