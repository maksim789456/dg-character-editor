import { DgCharacterBound } from "@/src/model/character";
import TableInput from "../table/tableInput";
import { editBound } from "@/src/features/dgCharacter/dgCharacterSlice";
import { RootState } from "@/src/store/store";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface BoundProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  boundMaxScore?: number;
  boundId: number;
  bound?: DgCharacterBound;
  onBoundChanged?: (bound: DgCharacterBound) => void;
}

const makeMapState = (state: RootState, ownProps: BoundProps) => ({
  disabled: !state.dgCharacter.editMode,
  boundMaxScore: state.dgCharacter.stats.cha.score,
  bound: state.dgCharacter.bounds[ownProps.boundId],
});

const makeDispatchState = (dispatch: Dispatch, ownProps: BoundProps) => ({
  onBoundChanged: (bound: DgCharacterBound) =>
    dispatch(editBound({ id: ownProps.boundId, bound })),
});

const Bound: React.FC<BoundProps> = ({
  disabled,
  boundMaxScore,
  bound,
  onBoundChanged,
}) => {
  const onNameChanged = (name: string | number) => {
    if (bound && onBoundChanged && bound.name != name) {
      onBoundChanged({ ...bound, name: name as string });
    }
  };

  const onDamageChanged = (damaged: boolean) => {
    if (bound && onBoundChanged && bound.damaged != damaged) {
      onBoundChanged({ ...bound, damaged });
    }
  };

  const onScoreChanged = (score: number | string) => {
    if (bound && onBoundChanged && bound.score != score) {
      onBoundChanged({ ...bound, score: score as number });
    }
  };

  return bound ? (
    <div className="grid grid-cols-9">
      <TableInput
        className="col-span-7"
        checkable={true}
        disabled={disabled}
        through={bound.score === 0}
        value={bound.name}
        onValueChange={onNameChanged}
        checkboxValue={bound?.damaged}
        onCheckboxValueChange={onDamageChanged}
      />
      <TableInput
        className="col-span-2"
        isNumber={true}
        value={bound.score}
        maxValue={boundMaxScore}
        onValueChange={onScoreChanged}
      />
    </div>
  ) : (
    <></>
  );
};

export default connect(makeMapState, makeDispatchState)(Bound);
