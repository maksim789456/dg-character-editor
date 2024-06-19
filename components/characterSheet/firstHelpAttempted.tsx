import { set } from "@/src/features/dgCharacter/dgCharacterSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

const FirstHelpAttemptedCheckbox: React.FC<
  React.HTMLAttributes<HTMLInputElement>
> = ({ ...props }) => {
  const firstHelpAttempted = useAppSelector(
    (state) => state.dgCharacter.firstHelpAttempted ?? false
  );
  const dispatch = useAppDispatch();
  return (
    <input
      name="firstHelpAttempted"
      aria-label="First Help Attemted"
      type="checkbox"
      checked={firstHelpAttempted}
      onChange={(e) =>
        dispatch(set({ field: "firstHelpAttempted", value: e.target.checked }))
      }
      {...props}
    />
  );
};

export default FirstHelpAttemptedCheckbox;
