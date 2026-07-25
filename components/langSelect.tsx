import { RU, US } from "country-flag-icons/react/1x1";
import clsx from "clsx";

interface LangSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
}

export default function LangSelect({ lang, ...props }: LangSelectProps) {
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
