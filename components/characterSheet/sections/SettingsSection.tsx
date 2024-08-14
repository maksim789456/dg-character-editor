import ExportButton from "../export/exportButton";
import { set } from "@/src/features/dgCharacter/dgCharacterSlice";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import LangSelect from "@/components/langSelect";
import Link from "next/link";

interface SettingsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLocale: any;
  lang: string;
  id: string;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  sectionLocale,
  lang,
  id,
  ...props
}) => {
  const editMode = useAppSelector((state) => state.dgCharacter.editMode);
  const dispatch = useAppDispatch();

  return (
    <div className={`grid grid-cols-5 items-center gap-3 ${props.className}`}>
      <Link
        title="Back"
        aria-label="Back"
        href={`/${lang}/`}
        className="mr-auto bg-dg/90 rounded p-1"
      >
        <svg
          className="w-6 h-6 text-gray-100 stroke-gray-100 stroke-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path d="m15 19-7-7 7-7" />
        </svg>
      </Link>
      <div className="flex flex-row items-center justify-center gap-3 col-start-2 col-span-3">
        <div className="flex flex-row gap-1">
          <p className="font-dg-main text-dg">{sectionLocale?.editMode}</p>
          <input
            name="editModeCheck"
            aria-label="Enable Edit Mode"
            type="checkbox"
            checked={editMode}
            onChange={(e) =>
              dispatch(set({ field: "editMode", value: e.target.checked }))
            }
          />
        </div>
        <ExportButton lang={lang}>{sectionLocale?.exportPdf}</ExportButton>
      </div>
      <div className="ml-auto bg-dg/90 rounded p-1.5">
        <LangSelect lang={lang} id={id} />
      </div>
    </div>
  );
};

export default SettingsSection;
