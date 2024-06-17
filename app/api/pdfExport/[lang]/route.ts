import fieldDescriptions, {
  FieldType,
} from "@/app/api/pdfExport/[lang]/exportFields";
import {
  getPdfFieldsDictionary,
  getSkillsDictionary,
} from "@/res/dictionaries";
import fontkit from "@pdf-lib/fontkit";
import { DgCharacter } from "@/src/model/character";
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
      const typalSkillVariants = ((await getSkillsDictionary(lang)) as any)
        .typalSkillVariants;

      const fontPath = path.join(
        process.cwd(),
        "public",
        "OpenSans-Medium.ttf"
      );
      const openSansFontBytes = await fs.readFile(fontPath);
      pdfDoc.registerFontkit(fontkit);
      const openSansFont = await pdfDoc.embedFont(openSansFontBytes);

      const form = pdfDoc.getForm();

      const setTextField = (fieldName: string, value?: string) => {
        const field = form.getTextField(fieldName);
        field.setText(value);
        field.updateAppearances(openSansFont);
      };

      fieldDescriptions(pdfForm, dgCharacter).forEach((description) => {
        switch (description.fieldType) {
          case FieldType.Text:
            setTextField(description.fieldName, description.value.toString());
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
        setTextField(boundDescription.name, bound.name);
        setTextField(boundDescription.score, bound.score.toString());
        if (boundDescription.damageCheck !== "" && bound.damaged)
          form.getCheckBox(boundDescription.damageCheck).check();
      });

      dgCharacter.skills.forEach((skill) => {
        const skillDescription = pdfForm.skillsSection.find(
          (pdfFormSkill: any) =>
            pdfFormSkill.id === skill.id.replace("foreignLanguage", "other")
        );
        if (skill.isOther) console.log(skillDescription, skill);

        setTextField(
          skillDescription.valueFormName,
          skill.characterSkillRate ? skill.characterSkillRate.toString() : ""
        );
        if (skill.isTypal) {
          const typalSkill = typalSkillVariants[skill.id].find(
            (typal: any) => typal.id == skill.type
          );
          setTextField(skillDescription.typalFormName, typalSkill.name);
        }
        if (skill.isOther) {
          if (skill.isForeignLanguage) {
            const langName = typalSkillVariants.foreign_language.find(
              (fl: any) => fl.id == skill.name
            )?.name;
            setTextField(
              skillDescription.nameFormName,
              `Foreign Language (${langName})`
            );
          } else {
            setTextField(skillDescription.nameFormName, skill.name);
          }
        }
      });

      dgCharacter.weapons.forEach((weapon, i) => {
        const weaponDescription = pdfForm.equipmentSection.weapons[i];
        setTextField(weaponDescription.weapon, weapon.name);
        setTextField(weaponDescription.skill, weapon.skill.toString());
        setTextField(weaponDescription.baseRange, weapon.baseRange?.toString());
        setTextField(weaponDescription.damage, weapon.damage?.toString());
        setTextField(
          weaponDescription.armorPiercing,
          weapon.armorPiercing?.toString()
        );
        setTextField(
          weaponDescription.killDamage,
          weapon.lethality?.toString()
        );
        setTextField(
          weaponDescription.killRadius,
          weapon.killRadius?.toString()
        );
        setTextField(weaponDescription.ammo, weapon.ammo?.toString());
      });

      dgCharacter.specialTrainings.forEach((specTraining, i) => {
        const specTrainingDescription =
          pdfForm.remarksSection.specialTrainings[i];
        setTextField(specTrainingDescription.name, specTraining.name);
        setTextField(specTrainingDescription.value, specTraining.skill);
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
