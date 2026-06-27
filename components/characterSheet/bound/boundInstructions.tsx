import { useAppSelector } from "@/src/redux/hooks";
import { useTranslations } from "next-intl";

interface BoundInstructionsProps extends React.HTMLAttributes<HTMLDivElement> {}

const BoundInstructions: React.FC<BoundInstructionsProps> = () => {
  const t = useTranslations("characterSheet.psychologicalSection");
  const boundsExists = useAppSelector(
    (state) => state.dgCharacter.bounds.length !== 0
  );
  return boundsExists ? (
    <div className="border-b border-dg dark:border-neutral-600 flex items-center justify-center">
      <p className="font-dg-main text-xs dark:text-neutral-200 text-center py-1">
        {t("bondsInstruction")}
      </p>
    </div>
  ) : (
    <></>
  );
};

export default BoundInstructions;
