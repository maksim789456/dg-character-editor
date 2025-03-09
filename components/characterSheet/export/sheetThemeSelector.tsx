import clsx from "clsx";
import { useTranslations } from "next-intl";
import PropTypes from "prop-types";

interface SheetThemeSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  theme: string;
  setTheme: (theme: string) => void;
}

const themesIds = ["white", "old"];

const SheetThemeSelector: React.FC<SheetThemeSelectorProps> = ({
  theme,
  setTheme,
  ...props
}) => {
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
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        {themes?.map((theme: any, i: number) => (
          <option key={i} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
};

SheetThemeSelector.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
};

export { SheetThemeSelector };
