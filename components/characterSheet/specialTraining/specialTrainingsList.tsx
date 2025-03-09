import { useAppSelector } from "@/src/redux/hooks";
import { shallowEqual } from "react-redux";
import TableItem from "../table/tableItem";
import SpecialTraining from "./specialTraining";
import AddSpecialTraining from "./addSpecialTraining";
import { useTranslations } from "next-intl";

interface SpecialTrainingsListProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SpecialTrainingsList: React.FC<SpecialTrainingsListProps> = () => {
  const t = useTranslations("characterSheet.remarksSection");
  const haveAllSpecialTrainings = useAppSelector(
    (state) => state.dgCharacter.specialTrainings.length <= 5
  );
  const specialTrainingsIds = useAppSelector(
    (state) => Array.from(state.dgCharacter.specialTrainings.keys()),
    shallowEqual
  );
  return (
    <div
      className={`grid grid-cols-1 ${
        haveAllSpecialTrainings ? "auto-rows-min" : "auto-rows-auto"
      }`}
    >
      <div className="grid grid-cols-2 h-10">
        <TableItem title={t("specialTraining")} isHeader={true} />
        <TableItem
          title={t("specialTrainingSkill")}
          isHeader={true}
        />
      </div>
      {specialTrainingsIds.map((id: number) => (
        <SpecialTraining key={id} specialTrainingId={id} />
      ))}
      <AddSpecialTraining />
    </div>
  );
};

export default SpecialTrainingsList;
