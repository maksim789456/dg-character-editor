import { editSkill, rollSkill } from "@/src/features/dgCharacter/dgCharacterSlice";
import TableInput from "../table/tableInput";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import PropTypes from "prop-types";
import clsx from "clsx";
import Dices from "@/components/icons/dices";
import { useTranslations } from "next-intl";

interface OtherSkillProps extends React.HTMLAttributes<HTMLDivElement> {
  skillId: string;
  foreignLanguages: any;
}

const OtherSkill: React.FC<OtherSkillProps> = ({ skillId, foreignLanguages }) => {
  const t = useTranslations('characterSheet');
  const disabled = useAppSelector((state) => !state.dgCharacter.editMode);
  const skill = useAppSelector(
    (state) => state.dgCharacter.skills.find((skill) => skill.id === skillId)!
  );
  const dispatch = useAppDispatch();

  const onSkillRolled = (e: React.MouseEvent<any>) => {
    if (disabled) {
      dispatch(
        rollSkill({
          skillId,
          skillName: skill.isForeignLanguage
            ? foreignLanguages.find((it: any) => it.id === skill.name).name
            : (skill.name.trim() !== "" ? skill.name : `${t("rollToast.skill")} ${skillId}`)
        })
      );
    }
  }

  return (
    <div className="grid grid-cols-12">
      <TableInput
        ariaLabel={`Other skill ${skillId} Name`}
        className={clsx(
          "col-span-10",
          disabled && "!col-span-9"
        )}
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
      <div className={clsx(
        "w-full h-full col-span-2",
        "border-b border-r border-dg dark:border-neutral-800",
        "flex flex-row gap-0.5 items-center",
        disabled && "pr-1 !col-span-3 cursor-pointer"
      )}>
        <TableInput
          className="!border-0"
          ariaLabel={`Other skill ${skillId} Value`}
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
        {disabled ? <Dices onClick={onSkillRolled} /> : <></>}
      </div>
    </div>
  );
};

OtherSkill.propTypes = {
  skillId: PropTypes.string.isRequired,
  foreignLanguages: PropTypes.any.isRequired,
}

export default OtherSkill;
