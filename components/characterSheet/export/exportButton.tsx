import React from "react";
import axios from "axios";
import store from "@/src/store/store";

interface ExportButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
}

const pdfFiles = {
  en: "Character_Sheet_ENG.pdf",
  ru: "Character_Sheet_RUS.pdf",
} as any;

const ExportButton: React.FC<ExportButtonProps> = ({ lang, ...props }) => {
  const exportButton = async () => {
    const dgCharacter = store.getState().dgCharacter;
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
      .post("api/pdfExport/" + lang, dgCharacterReduced, {
        responseType: "blob",
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob.data);
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", url);
        downloadAnchorNode.setAttribute(
          "download",
          dgCharacter.fullName + "_" + pdfFiles[lang].split(".")[0] + ".pdf"
        );
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      });
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <button
        className="font-dg-main text-dg outline outline-dg rounded my-1 px-3 bg-blue-100"
        onClick={exportButton}
      >
        {props.children}
      </button>
    </div>
  );
};

export default ExportButton;
