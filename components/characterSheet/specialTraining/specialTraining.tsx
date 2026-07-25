import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import TableInput from "../table/tableInput";
import { editSpecialTraining } from "@/src/features/dgCharacter/dgCharacterSlice";

interface SpecialTrainingListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  specialTrainingId: number;
}

export default function SpecialTraining({
  specialTrainingId,
}: SpecialTrainingListProps) {
  const disabled = useAppSelector((state) => !state.dgCharacter.editMode);
  const training = useAppSelector(
    (state) => state.dgCharacter.specialTrainings[specialTrainingId]
  );
  const dispatch = useAppDispatch();
  return (
    <div className="grid grid-cols-2">
      <TableInput
        ariaLabel={`Special Training ${specialTrainingId} Name`}
        disabled={disabled}
        value={training.name}
        onValueChange={(value) =>
          dispatch(
            editSpecialTraining({
              id: specialTrainingId,
              specialTraining: {
                ...training,
                name: value as string,
              },
            })
          )
        }
      />
      <TableInput
        ariaLabel={`Special Training ${specialTrainingId} Skills`}
        disabled={disabled}
        value={training.skill}
        onValueChange={(value) =>
          dispatch(
            editSpecialTraining({
              id: specialTrainingId,
              specialTraining: {
                ...training,
                skill: value as string,
              },
            })
          )
        }
      />
    </div>
  );
};
