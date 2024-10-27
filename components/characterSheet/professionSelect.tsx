import { set } from "@/src/features/dgCharacter/dgCharacterSlice";
import { setProfessions } from "@/src/features/dgCharacter/dgProfessionsSlice";
import { DgProfession } from "@/src/model/profession";
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks";
import PropTypes from "prop-types";
import { useEffect } from "react";

interface ProfessionSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
  professions: DgProfession[];
}

const ProfessionSelect: React.FC<ProfessionSelectProps> = ({
  sectionLocale,
  professions,
  ...props
}) => {
  const professionId = useAppSelector(
    (state) => state.dgCharacter.professionId
  );
  const useCustomProfession = useAppSelector(
    (state) => state.dgCharacter.useCustomProfession
  );
  const customProfession = useAppSelector(
    (state) => state.dgCharacter.customProfession
  );
  const dispatch = useAppDispatch();

  const onTypeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(set({ field: "professionId", value: e.target.value }));
  };

  useEffect(() => {
    dispatch(setProfessions(professions));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [professions]);

  return (
    <div
      className={`border border-dg border-t-0 border-l-0 ${
        props.className || ""
      } flex flex-col w-full`}
    >
      <div className="flex flex-row justify-between">
        <p className="font-dg-main dark:text-neutral-200 text-xs p-1">{sectionLocale.profession}</p>
        <div className="flex flex-row gap-1 items-center pr-1">
          <p className="font-dg-main dark:text-neutral-200 text-xs">
            {sectionLocale.customProfession}
          </p>
          <input
            type="checkbox"
            checked={useCustomProfession}
            onChange={(e) =>
              dispatch(
                set({ field: "useCustomProfession", value: e.target.checked })
              )
            }
          />
        </div>
      </div>
      {useCustomProfession ? (
        <input
          type="text"
          className="bg-blue-100 dark:bg-neutral-800 disabled:bg-gray-200 dark:disabled:bg-neutral-700"
          name={"pro"}
          disabled={false}
          value={customProfession ?? ""}
          onChange={(e) =>
            dispatch(set({ field: "customProfession", value: e.target.value }))
          }
        ></input>
      ) : (
        <select
          className="w-full h-full bg-blue-100 dark:bg-neutral-800 dark:text-neutral-200 col-span-10 disabled:bg-gray-200 dark:disabled:bg-neutral-700"
          disabled={false}
          value={professionId ?? ""}
          onChange={onTypeSelectChange}
        >
          <option value={""}></option>
          {professions?.map((profession: any, i: number) => (
            <option key={i} value={profession.id}>
              {profession.name.en}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

ProfessionSelect.propTypes = {
  sectionLocale: PropTypes.any.isRequired,
  professions: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default ProfessionSelect;
