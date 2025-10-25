import PropTypes from "prop-types";
import { GB, RU } from "country-flag-icons/react/1x1";
import clsx from "clsx";

interface LangSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
  pageUrl?: string;
}

const LangSelect: React.FC<LangSelectProps> = ({ lang, pageUrl, ...props }) => {
  const langs = [
    { id: "en", icon: <GB className="w-7 h-5" /> },
    { id: "ru", icon: <RU className="w-7 h-5" /> },
  ];
  pageUrl = pageUrl ?? "/"

  return (
    <div className={clsx("flex flex-row gap-3 print:hidden", props.className)}>
      {langs.map((value, key) => {
        if (value.id === lang) return;
        return (
          <a key={key} href={`/${value.id}${pageUrl}`} aria-label={`Change lang to ${value.id}`}>
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
  pageUrl: PropTypes.string
};

export default LangSelect;
