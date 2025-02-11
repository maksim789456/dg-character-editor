import TableSkill from "./tableSkill";
import { useAppSelector } from "@/src/redux/hooks";

interface SkillsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const SkillsList: React.FC<SkillsListProps> = ({}) => {
  const baseSkills = useAppSelector((root) => root.dgSkills.baseSkills);
  const typalSkillVariants = useAppSelector(
    (root) => root.dgSkills.typalSkillVariants
  );

  return baseSkills.map((skill) => (
    <TableSkill
      skillId={skill.id}
      skillName={skill.name}
      types={typalSkillVariants[skill.id as keyof object]}
      key={skill.id}
    />
  ));
};

export default SkillsList;
