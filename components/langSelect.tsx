import PropTypes from "prop-types";
import { RU, US } from "country-flag-icons/react/1x1";
import clsx from "clsx";

interface LangSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
}

const LangSelect: React.FC<LangSelectProps> = ({ lang, ...props }) => {
  const langs = [
    { id: "en", icon: <US className="w-7 h-5" aria-label="US flag" /> },
    { id: "ru", icon: <RU className="w-7 h-5" aria-label="RU flag" /> },
  ];

  return (
    <div className={clsx("flex flex-row gap-3", props.className)}>
      {langs.map((value, key) => {
        if (value.id === lang) return;
        return (
          <a key={key} href={value.id} aria-label={`Change lang to ${value.id}`}>
            {value.icon}
          </a>
        );
      })}
    </div>
  );
};

LangSelect.propTypes = {
  className: PropTypes.string,
  lang: PropTypes.string.isRequired,
};

export default LangSelect;
