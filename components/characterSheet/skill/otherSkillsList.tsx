import { useAppSelector } from "@/src/redux/hooks";
import OtherSkill from "./otherSkill";
import { shallowEqual } from "react-redux";

interface SkillsListProps extends React.HTMLAttributes<HTMLDivElement> {
  foreignLanguages: any;
}

const OtherSkillsList: React.FC<SkillsListProps> = ({ foreignLanguages }) => {
  const otherSkillsIds = useAppSelector(
    (state) =>
      state.dgCharacter.skills
        .filter((skill) => skill.isOther)
        .map((skill) => skill.id),
    shallowEqual
  );

  return otherSkillsIds.map((skillId) => (
    <OtherSkill
      skillId={skillId}
      key={skillId}
      foreignLanguages={foreignLanguages}
    />
  ));
};

export default OtherSkillsList;
