import { addOtherSkill } from "@/src/features/dgCharacter/dgCharacterSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import PropTypes from "prop-types";

interface AddOtherSkillProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
}

const AddOtherSkill: React.FC<AddOtherSkillProps> = ({ sectionLocale }) => {
  const otherSkillsCount = useAppSelector(
    (state) => state.dgCharacter.skills.filter((skill) => skill.isOther).length
  );
  const editMode = useAppSelector((state) => state.dgCharacter.editMode);
  const dispatch = useAppDispatch();

  return otherSkillsCount != 6 && editMode ? (
    <div className="border-b border-dg flex items-center justify-center gap-2">
      <button
        className="font-dg-main text-dg outline outline-dg rounded my-1 px-3 bg-blue-100"
        onClick={() => dispatch(addOtherSkill(`other${otherSkillsCount}`))}
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
