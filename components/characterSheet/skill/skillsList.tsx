import TableSkill from "./tableSkill";
import { useAppSelector } from "@/src/redux/hooks";

interface SkillsListProps extends React.HTMLAttributes<HTMLDivElement> {
  typalNone: string;
}

const SkillsList: React.FC<SkillsListProps> = ({ typalNone }) => {
  const baseSkills = useAppSelector((root) => root.dgSkills.baseSkills);
  const typalSkillVariants = useAppSelector(
    (root) => root.dgSkills.typalSkillVariants
  );

  return baseSkills.map((skill) => (
    <TableSkill
      skillId={skill.id}
      skillName={skill.name}
      types={typalSkillVariants[skill.id as keyof object]}
      typalNone={typalNone}
      key={skill.id}
    />
  ));
};

export default SkillsList;
