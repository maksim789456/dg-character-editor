import ExportButton from "../export/exportButton";
import { set } from "@/src/features/dgCharacter/dgCharacterSlice";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import LangSelect from "@/components/langSelect";
import ThemeSelect from "@/components/themeSelect";
import { SheetThemeSelector } from "../export/sheetThemeSelector";
import { useTranslations } from "next-intl";

interface SettingsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  lang,
  ...props
}) => {
  const t = useTranslations('characterSheet.settingsSection');
  const [theme, setTheme] = React.useState("white");
  const editMode = useAppSelector((state) => state.dgCharacter.editMode);
  const dispatch = useAppDispatch();

  return (
    <div className={`grid grid-cols-5 items-center gap-3 ${props.className}`}>
      <div className="mr-auto flex flex-row gap-1">
        <p className="font-dg-main text-dg dark:text-neutral-200">
          {t("editMode")}
        </p>
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
      <div className="flex flex-row gap-3 col-span-3 justify-center">
        <SheetThemeSelector
          //locale={sectionLocale?.sheetThemeSelect}
          theme={theme}
          setTheme={setTheme}
        />
        <ExportButton type={theme} lang={lang}>
          {t("exportPdf")}
        </ExportButton>
      </div>
      <div className="ml-auto flex flex-row gap-2">
        <div className="bg-dg/90 dark:bg-neutral-800 rounded p-1.5">
          <ThemeSelect />
        </div>
        <div className="bg-dg/90 dark:bg-neutral-800 rounded p-1.5">
          <LangSelect lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
