import { useAppSelector } from "@/src/redux/hooks";
import { shallowEqual } from "react-redux";
import PropTypes from "prop-types";
import TableItem from "../table/tableItem";
import SpecialTraining from "./specialTraining";
import AddSpecialTraining from "./addSpecialTraining";

interface SpecialTrainingsListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const SpecialTrainingsList: React.FC<SpecialTrainingsListProps> = ({
  sectionLocale,
}) => {
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
        <TableItem title={sectionLocale?.specialTraining} isHeader={true} />
        <TableItem
          title={sectionLocale?.specialTrainingSkill}
          isHeader={true}
        />
      </div>
      {specialTrainingsIds.map((id: number) => (
        <SpecialTraining key={id} specialTrainingId={id} />
      ))}
      <AddSpecialTraining sectionLocale={sectionLocale} />
    </div>
  );
};

SpecialTrainingsList.propTypes = {
  sectionLocale: PropTypes.any,
};

export default SpecialTrainingsList;
