import fieldDescriptions, {
  FieldType,
} from "@/components/characterSheet/export/exportFields";
import { getPdfFieldsDictionary } from "@/res/dictionaries";
import { DgCharacter } from "@/src/model/character";
import { pdf } from "@react-pdf/renderer";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { PDFDocument } from "pdf-lib";

const pdfFiles = {
  en: "Character_Sheet_ENG.pdf",
  ru: "Character_Sheet_RUS.pdf",
} as any;

export async function POST(
  req: Request,
  { params }: { params: { lang: string } }
) {
  const lang = params.lang;
  if (!pdfFiles[lang]) {
    return NextResponse.json(
      { error: `Lang ${lang} don't supported` },
      { status: 500 }
    );
  }

  return await req
    .json()
    .then(async (data) => {
      const dgCharacter = data as DgCharacter;

      const pdfFilename = pdfFiles[lang];
      const pdfPath = path.join(process.cwd(), "public", pdfFilename);
      const file = await fs.readFile(pdfPath);
      const pdfDoc = await PDFDocument.load(file);
      const pdfForm = ((await getPdfFieldsDictionary(lang)) as any).pdfForm;

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
        form
          .getTextField(boundDescription.score)
          .setText(bound.score.toString());
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
        form
          .getTextField(weaponDescription.baseRange)
          .setText(weapon.baseRange);
        form.getTextField(weaponDescription.damage).setText(weapon.damage);
        form
          .getTextField(weaponDescription.armorPiercing)
          .setText(weapon.armorPiercing);
        form
          .getTextField(weaponDescription.killDamage)
          .setText(weapon.lethality);
        form
          .getTextField(weaponDescription.killRadius)
          .setText(weapon.killRadius);
        form.getTextField(weaponDescription.ammo).setText(weapon.ammo);
      });

      dgCharacter.specialTrainings.forEach((specTraining, i) => {
        const specTrainingDescription =
          pdfForm.remarksSection.specialTrainings[i];
        form
          .getTextField(specTrainingDescription.name)
          .setText(specTraining.name);
        form
          .getTextField(specTrainingDescription.value)
          .setText(specTraining.skill);
      });

      const resultBytes = await pdfDoc.save();
      const headers = new Headers();
      headers.set("Content-Type", "application/pdf");
      headers.set("Content-Transfer-Encoding", "binary");
      headers.set("Content-Disposition", "attachment; filename=" + pdfFilename);
      return new NextResponse(resultBytes, {
        status: 200,
        headers,
      });
    })
    .catch((err) => {
      console.log(err);
      return NextResponse.json(
        { error: `Body don't contain any data` },
        { status: 500 }
      );
    });
}
