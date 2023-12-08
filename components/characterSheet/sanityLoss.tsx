import { set } from "@/src/features/dgCharacter/dgCharacterSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import PropTypes from "prop-types";

interface SanityLossProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const SanityLoss: React.FC<SanityLossProps> = ({ sectionLocale, ...props }) => {
  const violence = useAppSelector((state) => state.dgCharacter.violence);
  const helplessness = useAppSelector(
    (state) => state.dgCharacter.helplessness
  );
  const dispatch = useAppDispatch();

  const onViolenceChanged = (value: number) =>
    dispatch(set({ field: "violence", value: value }));
  const onHelplessnessChanged = (value: number) =>
    dispatch(set({ field: "helplessness", value: value }));

  return (
    <div className="row-span-2 flex flex-col justify-center">
      <div className="border-t border-b border-dg flex items-center justify-center">
        <p className="font-dg-main text-dg text-sm py-1 text-center">
          {sectionLocale?.sanLoss}
        </p>
      </div>
      <div className="flex flex-row justify-evenly items-center py-1">
        <p className="font-dg-main text-dg text-sm">
          {sectionLocale?.sanLossViolence}
        </p>
        <input
          type="checkbox"
          checked={violence >= 1}
          onChange={(e) => onViolenceChanged(e.target.checked ? 1 : 0)}
        />
        <input
          type="checkbox"
          checked={violence >= 2}
          onChange={() => onViolenceChanged(2)}
        />
        <input
          type="checkbox"
          checked={violence === 3}
          onChange={() => onViolenceChanged(3)}
        />
        <i className="font-dg-main text-dg text-sm">
          {sectionLocale?.sanLossAdapted}
        </i>
        <p className="font-dg-main text-dg text-sm">
          {sectionLocale?.sanLossHelplessness}
        </p>
        <input
          type="checkbox"
          checked={helplessness >= 1}
          onChange={(e) => onHelplessnessChanged(e.target.checked ? 1 : 0)}
        />
        <input
          type="checkbox"
          checked={helplessness >= 2}
          onChange={() => onHelplessnessChanged(2)}
        />
        <input
          type="checkbox"
          checked={helplessness === 3}
          onChange={() => onHelplessnessChanged(3)}
        />
        <i className="font-dg-main text-dg text-sm">
          {sectionLocale?.sanLossAdapted}
        </i>
      </div>
    </div>
  );
};

SanityLoss.propTypes = {
  sectionLocale: PropTypes.any.isRequired
}

export default SanityLoss;
