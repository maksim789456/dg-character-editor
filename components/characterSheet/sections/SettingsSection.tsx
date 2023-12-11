import ExportButton from "../export/exportButton";
import { set } from "@/src/features/dgCharacter/dgCharacterSlice";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

interface SettingsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
  lang: string;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  sectionLocale,
  lang,
  ...props
}) => {
  const editMode = useAppSelector((state) => state.dgCharacter.editMode);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`flex flex-row justify-center items-center gap-3 ${props.className}`}
    >
      <div className="flex flex-row gap-1">
        <p className="font-dg-main text-dg">{sectionLocale?.editMode}</p>
        <input
          type="checkbox"
          checked={editMode}
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
