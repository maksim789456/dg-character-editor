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
  value?: number;
  onValueChange?: (value: number) => void;
}

const makeMapState = (_: RootState, ownProps: CalcStatProps) => {
  const calcStatSelector = makeCalcStatSelectorInstance(ownProps.name ?? "");
  return function realMapState(state: RootState) {
    const calcStat = calcStatSelector(state);
    return {
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
  maxSelector,
  value,
  onValueChange,
}) => {
  const max = useSelector(maxSelector);
  return (
    <div className="grid grid-cols-4">
      <TableItem className="col-span-2 py-1" title={title} />
      <TableItem title={max ?? ""} isHeader={true} fontSize="text-base" />
      <TableInput
        isNumber={true}
        value={value ?? 0}
        onValueChange={(value) =>
          onValueChange ? onValueChange(value as number) : value
        }
      />
    </div>
  );
};

CalcStat.propTypes = {
  title: PropTypes.string.isRequired,
  maxSelector: PropTypes.func.isRequired,
  value: PropTypes.number,
  onValueChange: PropTypes.func,
};

export default connect(makeMapState, makeDispatchState)(CalcStat);
