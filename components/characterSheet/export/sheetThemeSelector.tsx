import clsx from "clsx";
import { useTranslations } from "next-intl";

interface SheetThemeSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  theme: string;
  setTheme: (theme: string) => void;
}

const themesIds = ["white", "old", "ussr"];

export default function SheetThemeSelector({
  theme,
  setTheme,
  ...props
}: SheetThemeSelectorProps) {
  const t = useTranslations('characterSheet.settingsSection.sheetThemeSelect');
  const themes = themesIds.map((theme: string) => ({
    id: theme,
    name: t(`themes.${theme}`),
  }));

  return (
    <div className={clsx("flex flex-row gap-1 items-center", props.className)}>
      <p className="font-dg-main text-dg dark:text-neutral-200">
        {t("pdfTheme")}
      </p>
      <select
        className="h-full bg-blue-100 dark:bg-neutral-800 dark:text-neutral-200 col-span-10 py-1"
        aria-label={t("pdfTheme")}
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        {themes?.map((theme: any, i: number) => (
          <option key={i} value={theme.id} aria-label={theme.name}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
};
