import { connect, useSelector } from "react-redux";
import TableInput from "./table/tableInput";
import TableItem from "./table/tableItem";
import { RootState } from "@/src/store/store";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setBaseStat,
  setBaseStatDescription,
} from "@/src/features/dgCharacter/dgCharacterSlice";
import { baseStatSumSelector, makeBaseStatSelectorInstance } from "@/src/redux/selectors";
import PropTypes from "prop-types";
import clsx from "clsx";

interface BaseStatProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;

  title: string;
  name: string;
  disabled?: boolean;

  score?: number;
  onScoreChange?: (score: number) => void;
  description?: string;
  onDescriptionChange?: (description: string) => void;
}

const makeMapState = (_: RootState, ownProps: BaseStatProps) => {
  const baseStatSelector = makeBaseStatSelectorInstance(ownProps.name ?? "");
  return function realMapState(state: RootState) {
    const baseStat = baseStatSelector(state);
    return {
      score: baseStat.score,
      description: baseStat.description,
      disabled: !state.dgCharacter.editMode,
    };
  };
};

const makeDispatchState = (dispatch: Dispatch, ownProps: BaseStatProps) => ({
  onScoreChange: (value: number) =>
    dispatch(setBaseStat({ field: ownProps.name, value })),
  onDescriptionChange: (value: string) =>
    dispatch(setBaseStatDescription({ field: ownProps.name, value })),
});

const BaseStat: React.FC<BaseStatProps> = ({
  sectionLocale,
  title,
  name,
  disabled,
  score,
  onScoreChange,
  description,
  onDescriptionChange,
}) => {
  const baseStatSumIsToBig = useSelector(baseStatSumSelector) > 72;

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
        onValueChange={(value) => {
          onScoreChange ? onScoreChange(value as number) : value;
        }}
      />
      <TableItem
        ariaLabel={`${title} Value x5`}
        title={`${(score ?? 0) * 5}`}
        isHeader={true}
        fontSize="text-base"
      />
      {(score ?? 0) < 9 || (score ?? 0) > 12 ? (
        <TableInput
          className="col-span-3"
          ariaLabel={`${title} Description`}
          disabled={disabled}
          placeholder={sectionLocale?.statsDescriptionPlaceholder}
          value={description ?? ""}
          onValueChange={(value) =>
            onDescriptionChange ? onDescriptionChange(value as string) : value
          }
        />
      ) : (
        <TableItem
          className="col-span-3"
          isHeader={true}
          fontSize="text-base"
          title={sectionLocale?.bpStatMax}
          ariaLabel={`${title} No Description`}
        />
      )}
    </div>
  );
};

BaseStat.propTypes = {
  sectionLocale: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  score: PropTypes.number,
  onScoreChange: PropTypes.func,
  description: PropTypes.string,
  onDescriptionChange: PropTypes.func,
};

export default connect(makeMapState, makeDispatchState)(BaseStat);
