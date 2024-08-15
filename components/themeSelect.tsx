import PropTypes from "prop-types";
import clsx from "clsx";
import { ThemeContext } from "@/app/contexts/themeContext";
import { useContext } from "react";

interface LangSelectProps extends React.HTMLAttributes<HTMLDivElement> {}

const ThemeSelect: React.FC<LangSelectProps> = ({ ...props }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const themes = [
    {
      id: "light",
      icon: (
        <svg
          className="w-5 h-5 text-white dark:text-neutral-200"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.343 4.929A1 1 0 0 0 4.93 6.343l1.414 1.414a1 1 0 0 0 1.414-1.414L6.343 4.929Zm12.728 1.414a1 1 0 0 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.757 17.657a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414Zm9.9-1.414a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z" />
        </svg>
      ),
    },
    {
      id: "dark",
      icon: (
        <svg
          className="w-5 h-5 text-white dark:text-neutral-200"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className={clsx("flex flex-row gap-3", props.className)}>
      {themes.map((value, key) => {
        if (value.id === theme) return;
        return (
          <button
            onClick={() => setTheme(value.id)}
            key={key}
            aria-label={`Change theme to ${value.id}`}
            title={`Change theme to ${value.id}`}
          >
            {value.icon}
          </button>
        );
      })}
    </div>
  );
};

ThemeSelect.propTypes = {
  className: PropTypes.string,
};

export default ThemeSelect;
