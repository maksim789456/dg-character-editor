import { DgCharacter } from "@/src/model/character";
import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

interface ExportButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
}

const pdfFiles = {
  en: "Character_Sheet_ENG.pdf",
  ru: "Character_Sheet_RUS.pdf",
} as any;

const ExportButton: React.FC<ExportButtonProps> = ({ lang, ...props }) => {
  const dgCharacter = useSelector(
    (state: any) => state.dgCharacter
  ) as DgCharacter;

  const exportButton = async () => {
    const dgCharacterReduced = {
      ...dgCharacter,
      skills: dgCharacter.skills
        .filter((skill) => skill.characterSkillRate !== undefined || skill.type)
        .map((skill) => {
          return { ...skill, baseSkillRate: undefined };
        }),
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
