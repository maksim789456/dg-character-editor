import TableInput from "../table/tableInput";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useCallback } from "react";
import { editBound } from "@/src/features/dgCharacter/dgCharacterSlice";

interface BoundProps extends React.HTMLAttributes<HTMLDivElement> {
  boundId: number;
}

export default function Bound({
  boundId,
}: BoundProps) {
  const dispatch = useAppDispatch();
  const disabled = useAppSelector(s => !s.dgCharacter.editMode);
  const bound = useAppSelector(s => s.dgCharacter.bounds[boundId]);
  const boundMaxScore = useAppSelector(s => s.dgCharacter.stats.cha.score);

  const onDamageChanged = useCallback((damaged: boolean) =>
    dispatch(editBound({ boundId, bound: { damaged } })),
    [dispatch, boundId]
  );

  const onNameChanged = useCallback((name: string) =>
    dispatch(editBound({ boundId, bound: { name } })),
    [dispatch, boundId]
  );

  const onScoreChanged = useCallback((score: number) =>
    dispatch(editBound({ boundId, bound: { score } })),
    [dispatch, boundId]
  );

  return bound ? (
    <div className="grid grid-cols-9">
      <TableInput
        ariaLabel={`Bound ${boundId} name`}
        className="col-span-7"
        checkable={true}
        disabled={disabled}
        through={bound.score === 0}
        value={bound.name}
        onValueChange={e => onNameChanged(e as string)}
        checkboxValue={bound?.damaged}
        onCheckboxValueChange={onDamageChanged}
      />
      <TableInput
        ariaLabel={`Bound ${boundId} value`}
        className="col-span-2"
        isNumber={true}
        value={bound.score}
        maxValue={boundMaxScore}
        onValueChange={e => onScoreChanged(e as number)}
      />
    </div>
  ) : (
    <></>
  );
};
