import PropTypes from "prop-types";
import { GB, RU } from "country-flag-icons/react/1x1";
import clsx from "clsx";
import { useAppSelector } from "@/src/redux/hooks";

const LangSelect: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  const lang = useAppSelector((state) => state.dgCharacter.lang);
  const langs = [
    { id: "en", icon: <GB className="w-7 h-5" /> },
    { id: "ru", icon: <RU className="w-7 h-5" /> },
  ];

  return (
    <div className={clsx("flex flex-row gap-3", props.className)}>
      {langs.map((value, key) => {
        if (value.id === lang) return;
        return (
          <a
            key={key}
            href={value.id}
            aria-label={`Change lang to ${value.id}`}
          >
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
