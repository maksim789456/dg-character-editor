import { useAppSelector } from "@/src/redux/hooks";
import OtherSkill from "./otherSkill";

interface SkillsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const OtherSkillsList: React.FC<SkillsListProps> = ({}) => {
  const otherSkillsIds = useAppSelector((state) =>
    state.dgCharacter.skills
      .filter((skill) => skill.isOther)
      .map((skill) => skill.id)
  );
  return otherSkillsIds.map((skillId) => (
    <OtherSkill skillId={skillId} key={skillId} />
  ));
};

export default OtherSkillsList;
