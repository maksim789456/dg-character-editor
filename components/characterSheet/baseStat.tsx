import { connect } from "react-redux";
import TableInput from "./table/tableInput";
import TableItem from "./table/tableItem";
import {
  DgCharacter,
  DgCharacterBaseStat,
  DgCharacterStats,
} from "@/src/model/character";
import { RootState } from "@/src/store/store";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import {
  setBaseStat,
  setBaseStatDescription,
} from "@/src/features/dgCharacter/dgCharacterSlice";

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

const baseStatSelector = (dgCharacter: DgCharacter, statName: string) =>
  dgCharacter.stats[statName as keyof DgCharacterStats] as DgCharacterBaseStat;
const makeBaseStatSelectorInstance = (fieldName: string) =>
  createSelector(
    (state: RootState) => state.dgCharacter,
    (dgCharacter) => baseStatSelector(dgCharacter, fieldName)
  );

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
  return (
    <div className="grid grid-cols-9">
      <TableItem className="col-span-3" title={title} />
      <TableInput
        className="col-span-2"
        disabled={disabled}
        value={score}
        isNumber={true}
        onValueChange={(value) => {
          onScoreChange ? onScoreChange(value as number) : value;
        }}
      />
      <TableItem
        title={`${score ?? 0 * 5}`}
        isHeader={true}
        fontSize="text-base"
      />
      {(score ?? 0) < 9 || (score ?? 0) > 12 ? (
        <TableInput
          className="col-span-3"
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
        />
      )}
    </div>
  );
};

export default connect(makeMapState, makeDispatchState)(BaseStat);
