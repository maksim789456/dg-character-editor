import { useAppSelector } from "@/src/redux/hooks";
import OtherSkill from "./otherSkill";
import { shallowEqual } from "react-redux";
import { useMemo } from "react";

interface SkillsListProps extends React.HTMLAttributes<HTMLDivElement> {
  foreignLangShort: string;
}

const OtherSkillsList: React.FC<SkillsListProps> = ({ foreignLangShort }) => {
  const foreignLanguagesDict = useAppSelector(
    (root) => root.dgSkills.typalSkillVariants["foreign_language"]
  );
  const foreignLanguages = useMemo(
    () =>
      foreignLanguagesDict.map((type: any) => {
        return {
          ...type,
          name: `${foreignLangShort} (${type.name})`,
        };
      }),
    [foreignLangShort, foreignLanguagesDict]
  );

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
