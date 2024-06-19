import { RootState } from "@/src/store/store";
import TableInput from "./table/tableInput";
import TableItem from "./table/tableItem";
import { connect, useSelector } from "react-redux";
import { setStat } from "@/src/features/dgCharacter/dgCharacterSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { makeCalcStatSelectorInstance } from "@/src/redux/selectors";
import PropTypes from "prop-types";

interface CalcStatProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  name: string;
  maxSelector: (state: RootState) => any;
  max?: number | string;
  value?: number;
  onValueChange?: (value: number) => void;
}

const makeMapState = (_: RootState, ownProps: CalcStatProps) => {
  const calcStatSelector = makeCalcStatSelectorInstance(ownProps.name ?? "");
  return function realMapState(state: RootState) {
    const calcStat = calcStatSelector(state);
    const maxStat = ownProps.maxSelector(state);
    return {
      max: maxStat,
      value: calcStat,
    };
  };
};

const makeDispatchState = (dispatch: Dispatch, ownProps: CalcStatProps) => ({
  onValueChange: (value: number) =>
    dispatch(setStat({ field: ownProps.name, value })),
});

const CalcStat: React.FC<CalcStatProps> = ({
  title,
  max,
  value,
  onValueChange,
}) => {
  return (
    <div className="grid grid-cols-4">
      <TableItem ariaLabel={title} className="col-span-2 py-1" title={title} />
      <TableItem
        ariaLabel={`${title} Max Value`}
        title={max?.toString() ?? ""}
        isHeader={true}
        fontSize="text-base"
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

export default connect(makeMapState, makeDispatchState)(CalcStat);
