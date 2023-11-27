import { DgCharacter } from "@/src/model/character";
import { PDFDocument } from "pdf-lib";
import React from "react";
import { useSelector } from "react-redux";
import fieldDescriptions, { FieldType } from "./exportFields";

interface ExportButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  pdfForm: any;
  lang: string;
}

const pdfFiles = {
  en: "Character_Sheet_ENG.pdf",
  ru: "Character_Sheet_RUS.pdf",
} as any;

const ExportButton: React.FC<ExportButtonProps> = ({
  pdfForm,
  lang,
  ...props
}) => {
  const dgCharacter = useSelector(
    (state: any) => state.dgCharacter
  ) as DgCharacter;

  const exportButton = async (e: React.MouseEvent<HTMLElement>) => {
    const formUrl = pdfFiles[lang];
    const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(formPdfBytes);

    const form = pdfDoc.getForm();
    fieldDescriptions(pdfForm, dgCharacter).forEach((description) => {
      switch (description.fieldType) {
        case FieldType.Text:
          const textField = form.getTextField(description.fieldName);
          textField.setText(description.value.toString());
          break;
        case FieldType.Checkbox:
          const checkbox = form.getCheckBox(description.fieldName);
          if (description.value as boolean) checkbox.check();
          else checkbox.uncheck();
          break;
      }
    });

    dgCharacter.bounds.forEach((bound, i) => {
      const boundDescription = pdfForm.psychologicalSection.bounds[i];
      form.getTextField(boundDescription.name).setText(bound.name);
      form.getTextField(boundDescription.score).setText(bound.score.toString());
      if (boundDescription.damageCheck !== "" && bound.damaged)
        form.getCheckBox(boundDescription.damageCheck).check();
    });

    dgCharacter.skills.forEach((skill) => {
      const skillDescription = pdfForm.skillsSection.find(
        (pdfFormSkill: any) => pdfFormSkill.id === skill.id
      );
      form
        .getTextField(skillDescription.valueFormName)
        .setText(
          skill.characterSkillRate ? skill.characterSkillRate.toString() : ""
        );
      if (skill.isTypal)
        form.getTextField(skillDescription.typalFormName).setText(skill.type);
      if (skill.isOther)
        form.getTextField(skillDescription.nameFormName).setText(skill.name);
    });

    dgCharacter.weapons.forEach((weapon, i) => {
      const weaponDescription = pdfForm.equipmentSection.weapons[i];
      form.getTextField(weaponDescription.weapon).setText(weapon.name);
      form.getTextField(weaponDescription.skill).setText(weapon.skill);
      form.getTextField(weaponDescription.baseRange).setText(weapon.baseRange);
      form.getTextField(weaponDescription.damage).setText(weapon.damage);
      form
        .getTextField(weaponDescription.armorPiercing)
        .setText(weapon.armorPiercing);
      form.getTextField(weaponDescription.killDamage).setText(weapon.lethality);
      form
        .getTextField(weaponDescription.killRadius)
        .setText(weapon.killRadius);
      form.getTextField(weaponDescription.ammo).setText(weapon.ammo);
    });

    dgCharacter.specialTrainings.forEach((specTraining, i) => {
      const specTrainingDescription = pdfForm.remarksSection.specialTrainings[i];
      form
        .getTextField(specTrainingDescription.name)
        .setText(specTraining.name);
      form
        .getTextField(specTrainingDescription.value)
        .setText(specTraining.skill);
    });

    const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", pdfBytes);
    downloadAnchorNode.setAttribute(
      "download",
      dgCharacter.fullName + "_" + pdfFiles[lang].split(".")[0] + ".pdf"
    );
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <button
        className="font-dg-main text-dg outline outline-dg rounded my-1 px-3 bg-blue-100"
        onClick={exportButton}
      >
        Export PDF
      </button>
    </div>
  );
};

export default ExportButton;
