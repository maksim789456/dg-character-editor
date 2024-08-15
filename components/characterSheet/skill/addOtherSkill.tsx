import { addOtherSkill } from "@/src/features/dgCharacter/dgCharacterSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import PropTypes from "prop-types";

interface AddOtherSkillProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const AddOtherSkill: React.FC<AddOtherSkillProps> = ({ sectionLocale }) => {
  const otherSkillsCount = useAppSelector(
    (state: any) => state.dgCharacter.skills.filter((skill: any) => skill.isOther).length
  );
  const editMode = useAppSelector((state) => state.dgCharacter.editMode);
  const dispatch = useAppDispatch();

  return otherSkillsCount != 6 && editMode ? (
    <div className="border-b border-dg flex items-center justify-center gap-2">
      <button
        className="font-dg-main text-dg outline outline-dg rounded my-1 px-3 bg-blue-100 dark:outline-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
        onClick={() =>
          dispatch(
            addOtherSkill({
              id: `foreignLanguage${otherSkillsCount}`,
              isForeignLanguage: true,
            })
          )
        }
      >
        {sectionLocale?.addForeignLanguage}
      </button>
      <button
        className="font-dg-main text-dg outline outline-dg rounded my-1 px-3 bg-blue-100 dark:outline-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
        onClick={() =>
          dispatch(addOtherSkill({ id: `other${otherSkillsCount}` }))
        }
      >
        {sectionLocale?.addOtherSkills}
      </button>
    </div>
  ) : (
    <></>
  );
};

AddOtherSkill.propTypes = {
  sectionLocale: PropTypes.any.isRequired,
};

export default AddOtherSkill;
