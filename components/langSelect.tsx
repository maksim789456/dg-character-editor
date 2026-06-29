import PropTypes from "prop-types";
import { RU, US } from "country-flag-icons/react/1x1";
import clsx from "clsx";
import Link from "next/link";
import { useAppSelector } from "@/src/redux/hooks";
import { selectCurrentCharacterId } from "@/src/redux/selectors";

interface LangSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
}

const LangSelect: React.FC<LangSelectProps> = ({ lang, ...props }) => {
  const langs = [
    { id: "en", icon: <US className="w-7 h-5" aria-label="US flag" /> },
    { id: "ru", icon: <RU className="w-7 h-5" aria-label="RU flag" /> },
  ];
  const activeCharacterId = useAppSelector(selectCurrentCharacterId);

  return (
    <div className={clsx("flex flex-row gap-3", props.className)}>
      {langs.map((value, key) => {
        if (value.id === lang) return;
        return (
          <Link
            key={key}
            href={`/${value.id}/${activeCharacterId}`}
            aria-label={`Change lang to ${value.id}`}
            title={`Change lang to ${value.id}`}
          >
            {value.icon}
          </Link>
        );
      })}
    </div>
  );
};

LangSelect.propTypes = {
  className: PropTypes.string,
  lang: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default LangSelect;
