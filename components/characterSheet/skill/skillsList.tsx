import { DgCharacterSkill } from "@/src/model/character";
import TableSkill from "./tableSkill";

interface SkillsListProps extends React.HTMLAttributes<HTMLDivElement> {
  baseSkills: DgCharacterSkill[];
  typalSkillVariants: any[];
}

const SkillsList: React.FC<SkillsListProps> = ({
  baseSkills,
  typalSkillVariants,
}) => {
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
