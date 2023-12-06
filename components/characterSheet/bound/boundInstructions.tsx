import { useAppSelector } from "@/src/redux/hooks";

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
    <div className="border-b border-dg flex items-center justify-center">
      <p className="font-dg-main text-xs text-center py-1">
        {sectionLocale?.bondsInstruction}
      </p>
    </div>
  ) : (
    <></>
  );
};

export default BoundInstructions;
