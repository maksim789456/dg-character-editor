import { editSkill } from "@/src/features/dgCharacter/dgCharacterSlice";
import TableInput from "../table/tableInput";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import PropTypes from "prop-types";

interface OtherSkillProps extends React.HTMLAttributes<HTMLDivElement> {
  skillId: string;
  foreignLanguages: any;
}

const OtherSkill: React.FC<OtherSkillProps> = ({ skillId, foreignLanguages }) => {
  const disabled = useAppSelector((state) => !state.dgCharacter.editMode);
  const skill = useAppSelector(
    (state) => state.dgCharacter.skills.find((skill) => skill.id === skillId)!
  );
  const dispatch = useAppDispatch();
  return (
    <div className="grid grid-cols-12">
      <TableInput
        className="col-span-10"
        disabled={disabled}
        value={skill.name}
        select={skill.isForeignLanguage}
        types={foreignLanguages}
        onValueChange={(value) =>
          dispatch(
            editSkill({
              skillId,
              skill: { ...skill, name: value as string },
            })
          )
        }
        checkable={true}
        checkboxValue={skill.damaged}
        onCheckboxValueChange={(value) =>
          dispatch(
            editSkill({
              skillId,
              skill: { ...skill, damaged: value },
            })
          )
        }
      />
      <TableInput
        className="col-span-2"
        isNumber={true}
        disabled={disabled}
        value={skill.characterSkillRate}
        onValueChange={(value) =>
          dispatch(
            editSkill({
              skillId,
              skill: { ...skill, characterSkillRate: value as number },
            })
          )
        }
      />
    </div>
  );
};

OtherSkill.propTypes = {
  skillId: PropTypes.string.isRequired,
  foreignLanguages: PropTypes.any.isRequired,
}

export default OtherSkill;
