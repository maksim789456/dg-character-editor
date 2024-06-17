import { useAppSelector } from "@/src/redux/hooks";
import OtherSkill from "./otherSkill";
import { shallowEqual } from "react-redux";

interface SkillsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const OtherSkillsList: React.FC<SkillsListProps> = ({}) => {
  const otherSkillsIds = useAppSelector(
    (state) =>
      state.dgCharacter.skills
        .filter((skill) => skill.isOther)
        .map((skill) => skill.id),
    shallowEqual
  );
  return otherSkillsIds.map((skillId) => (
    <OtherSkill skillId={skillId} key={skillId} />
  ));
};

export default OtherSkillsList;
