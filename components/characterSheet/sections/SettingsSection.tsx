import { useDispatch, useSelector } from "react-redux";
import ExportButton from "../export/exportButton";
import { set } from "@/src/features/dgCharacter/dgCharacterSlice";
import { DgCharacter } from "@/src/model/character";

interface SettingsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
  lang: string;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  sectionLocale,
  lang,
  ...props
}) => {
  const dgCharacter = useSelector(
    (state: any) => state.dgCharacter
  ) as DgCharacter;
  const dispatch = useDispatch();

  return (
    <div
      className={`flex flex-row justify-center items-center gap-3 ${props.className}`}
    >
      <div className="flex flex-row gap-1">
        <p className="font-dg-main text-dg">{sectionLocale?.editMode}</p>
        <input
          type="checkbox"
          checked={dgCharacter.editMode}
          onChange={(e) =>
            dispatch(set({ field: "editMode", value: e.target.checked }))
          }
        />
      </div>
      <ExportButton lang={lang}>{sectionLocale?.exportPdf}</ExportButton>
      {props.children}
    </div>
  );
};

export default SettingsSection;
