import { set } from "@/src/features/dgCharacter/dgCharacterSlice";
import { setProfessions } from "@/src/features/dgCharacter/dgProfessionsSlice";
import { DgProfession } from "@/src/model/profession";
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import DgSelect, { OptionType } from "./select";
import { SingleValue } from "react-select";
import { getTypeValue } from "@/src/utils/selectUtils";

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
  const disabled = useAppSelector((state) => !state.dgCharacter.editMode);
  const dispatch = useAppDispatch();

  const onTypeSelectChange = (value: SingleValue<OptionType>) => {
    dispatch(set({ field: "professionId", value: value?.value }));
  };

  useEffect(() => {
    dispatch(setProfessions(professions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [professions]);

  const typeOptions = useMemo(() => {
    if (!professions) return [];

    let options =
      professions?.map((type: DgProfession) => {
        return {
          value: type.id,
          label: type.name.en,
        } as OptionType;
      }) ?? [];
    options.unshift({ label: "None" });
    return options;
  }, [professions]);

  return (
    <div
      className={`border border-dg dark:border-neutral-600 border-t-0 border-l-0 ${
        props.className || ""
      } flex flex-col w-full`}
    >
      <div className="flex flex-row justify-between">
        <p className="font-dg-main dark:text-neutral-200 text-xs p-1">
          {sectionLocale.profession}
        </p>
        <div
          className={clsx("flex flex-row gap-1 items-center pr-1", {
            hidden: disabled,
          })}
        >
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
          disabled={disabled}
          value={customProfession ?? ""}
          onChange={(e) =>
            dispatch(set({ field: "customProfession", value: e.target.value }))
          }
        ></input>
      ) : (
        <DgSelect
          isDisabled={disabled}
          instanceId="ProfessionSelect"
          name="ProfessionSelect"
          value={getTypeValue(typeOptions, professionId ?? null)}
          options={typeOptions}
          onChange={onTypeSelectChange}
          className="w-full col-span-10"
        ></DgSelect>
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
