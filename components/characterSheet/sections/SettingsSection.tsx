import ExportButton from "../export/exportButton";
import { set } from "@/src/features/dgCharacter/dgCharacterSlice";
import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import LangSelect from "@/components/langSelect";
import ThemeSelect from "@/components/themeSelect";
import SheetThemeSelector from "../export/sheetThemeSelector";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import PlayIcon from "@/components/icons/play";
import EditIcon from "@/components/icons/edit";
import BackIcon from "@/components/icons/back";

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
  const router = useRouter();

  const onModeClick = useCallback(() => {
    dispatch(set({ field: "editMode", value: !editMode }))
  }, [editMode, dispatch]);

  return (
    <div className={`grid grid-cols-5 items-center gap-3 ${props.className}`}>
      <div className="flex flex-row gap-2">
        <button className="bg-dg/90 dark:bg-neutral-800 rounded p-1.5" onClick={() => router.back()}>
          <BackIcon />
        </button>
        <button className="bg-dg/90 dark:bg-neutral-800 rounded p-1.5" onClick={onModeClick}>
          {!editMode ? <EditIcon /> : <PlayIcon />}
        </button>
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
