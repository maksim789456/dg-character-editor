import { useAppSelector } from "@/src/redux/hooks";
import PropTypes from "prop-types";

interface BoundInstructionsProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const BoundInstructions: React.FC<BoundInstructionsProps> = ({
  sectionLocale,
}) => {
  const boundsExists = useAppSelector(
    (state) => state.dgCharacter.bounds.length !== 0
  );
  return boundsExists ? (
    <div className="border-b border-dg dark:border-neutral-600 flex items-center justify-center">
      <p className="font-dg-main text-xs dark:text-neutral-200 text-center py-1">
        {sectionLocale?.bondsInstruction}
      </p>
    </div>
  ) : (
    <></>
  );
};

BoundInstructions.propTypes = {
  sectionLocale: PropTypes.any.isRequired
}

export default BoundInstructions;
