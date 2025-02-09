import React from "react";
import axios from "axios";
import { useAppSelector } from "@/src/redux/hooks";

interface ExportButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  type: string;
  lang: string;
}

const pdfFiles = {
  white: {
    en: "Character_Sheet_ENG_White.pdf",
    ru: "Character_Sheet_RUS_White.pdf",
  },
  old: {
    en: "Character_Sheet_ENG_Old.pdf",
    ru: "Character_Sheet_RUS_Old.pdf",
  }
} as any;

const ExportButton: React.FC<ExportButtonProps> = ({ type, lang, ...props }) => {
  const dgCharacter = useAppSelector(state => state.dgCharacter);

  const exportButton = async () => {
    const dgCharacterReduced = {
      ...dgCharacter,
      skills: dgCharacter.skills
        .map((skill) => {
          return {
            ...skill,
            baseSkillRate: undefined,
            characterSkillRate:
              skill.characterSkillRate === skill.baseSkillRate
                ? undefined
                : skill.characterSkillRate,
          };
        })
        .filter((skill) => skill.characterSkillRate || skill.type || skill.isOther),
    };

    axios
      .post("api/pdfExport/" + type + '/' + lang, dgCharacterReduced, {
        responseType: "blob",
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob.data);
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", url);
        downloadAnchorNode.setAttribute(
          "download",
          dgCharacter.fullName + "_" + pdfFiles[type][lang].split(".")[0] + ".pdf"
        );
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      });
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <button
        className="font-dg-main text-dg outline outline-dg dark:outline-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 rounded my-1 px-3 bg-blue-100"
        onClick={exportButton}
      >
        {props.children}
      </button>
    </div>
  );
};

export default ExportButton;
