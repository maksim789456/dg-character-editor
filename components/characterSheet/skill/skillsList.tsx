import { DgCharacterSkill } from "@/src/model/character";
import TableSkill from "./tableSkill";

interface SkillsListProps extends React.HTMLAttributes<HTMLDivElement> {
  baseSkills: DgCharacterSkill[];
  typalSkillVariants: any[];
  viewMode?: boolean;
}

const SkillsList: React.FC<SkillsListProps> = ({
  baseSkills,
  typalSkillVariants,
  viewMode,
}) => {
  return baseSkills.map((skill) => (
    <TableSkill
      skillId={skill.id}
      skillName={skill.name}
      types={typalSkillVariants[skill.id as keyof object]}
      key={skill.id}
      viewMode={viewMode}
    />
  ));
};

export default SkillsList;
