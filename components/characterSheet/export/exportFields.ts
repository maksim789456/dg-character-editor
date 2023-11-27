import { DgCharacter, DgGender } from "@/src/model/character";

export enum FieldType {
  Text,
  Checkbox,
}

export interface ExportFieldDescription {
  fieldName: string;
  fieldType: FieldType;
  value: string | number | boolean;
}

const fieldDescriptions = (pdfForm: any, character: DgCharacter) =>
  [
    {
      fieldName: pdfForm.personalSection.name,
      fieldType: FieldType.Text,
      value: character.fullName,
    },
    {
      fieldName: pdfForm.personalSection.genderMCheck,
      fieldType: FieldType.Checkbox,
      value: character.gender === DgGender.Male,
    },
    {
      fieldName: pdfForm.personalSection.genderFCheck,
      fieldType: FieldType.Checkbox,
      value: character.gender === DgGender.Female,
    },
    {
      fieldName: pdfForm.personalSection.genderCustomCheck,
      fieldType: FieldType.Checkbox,
      value: character.gender === DgGender.Custom,
    },
    {
      fieldName: pdfForm.personalSection.genderCustomField,
      fieldType: FieldType.Text,
      value: character.customGender,
    },
    {
      fieldName: pdfForm.staticSection.str,
      fieldType: FieldType.Text,
      value: character.stats.str.score,
    },
    {
      fieldName: pdfForm.staticSection.strX5,
      fieldType: FieldType.Text,
      value: character.stats.str.score * 5,
    },
    {
      fieldName: pdfForm.staticSection.strDescription,
      fieldType: FieldType.Text,
      value: character.stats.str.description,
    },
    {
      fieldName: pdfForm.staticSection.con,
      fieldType: FieldType.Text,
      value: character.stats.con.score,
    },
    {
      fieldName: pdfForm.staticSection.conX5,
      fieldType: FieldType.Text,
      value: character.stats.con.score * 5,
    },
    {
      fieldName: pdfForm.staticSection.conDescription,
      fieldType: FieldType.Text,
      value: character.stats.con.description,
    },
    {
      fieldName: pdfForm.staticSection.dex,
      fieldType: FieldType.Text,
      value: character.stats.dex.score,
    },
    {
      fieldName: pdfForm.staticSection.dexX5,
      fieldType: FieldType.Text,
      value: character.stats.dex.score * 5,
    },
    {
      fieldName: pdfForm.staticSection.dexDescription,
      fieldType: FieldType.Text,
      value: character.stats.dex.description,
    },
    {
      fieldName: pdfForm.staticSection.int,
      fieldType: FieldType.Text,
      value: character.stats.int.score,
    },
    {
      fieldName: pdfForm.staticSection.intX5,
      fieldType: FieldType.Text,
      value: character.stats.int.score * 5,
    },
    {
      fieldName: pdfForm.staticSection.intDescription,
      fieldType: FieldType.Text,
      value: character.stats.int.description,
    },
    {
      fieldName: pdfForm.staticSection.pow,
      fieldType: FieldType.Text,
      value: character.stats.pow.score,
    },
    {
      fieldName: pdfForm.staticSection.powX5,
      fieldType: FieldType.Text,
      value: character.stats.pow.score * 5,
    },
    {
      fieldName: pdfForm.staticSection.powDescription,
      fieldType: FieldType.Text,
      value: character.stats.pow.description,
    },
    {
      fieldName: pdfForm.staticSection.cha,
      fieldType: FieldType.Text,
      value: character.stats.cha.score,
    },
    {
      fieldName: pdfForm.staticSection.chaX5,
      fieldType: FieldType.Text,
      value: character.stats.cha.score * 5,
    },
    {
      fieldName: pdfForm.staticSection.chaDescription,
      fieldType: FieldType.Text,
      value: character.stats.cha.description,
    },
    {
      fieldName: pdfForm.staticSection.hpMax,
      fieldType: FieldType.Text,
      value: Math.round((character.stats.str.score + character.stats.con.score) / 2),
    },
    {
      fieldName: pdfForm.staticSection.hpCurr,
      fieldType: FieldType.Text,
      value: character.stats.hp,
    },
    {
      fieldName: pdfForm.staticSection.wpMax,
      fieldType: FieldType.Text,
      value: character.stats.pow.score,
    },
    {
      fieldName: pdfForm.staticSection.wpCurr,
      fieldType: FieldType.Text,
      value: character.stats.wp,
    },
    {
      fieldName: pdfForm.staticSection.sanMax,
      fieldType: FieldType.Text,
      value:
        99 -
        (character.skills.find((p) => p.id === "unnatural")
          ?.characterSkillRate ?? 0),
    },
    {
      fieldName: pdfForm.staticSection.sanCurr,
      fieldType: FieldType.Text,
      value: character.stats.wp,
    },
    {
      fieldName: pdfForm.staticSection.bpCurr,
      fieldType: FieldType.Text,
      value: character.stats.bp,
    },
    {
      fieldName: pdfForm.staticSection.physicalDescription,
      fieldType: FieldType.Text,
      value: character.stats.description,
    },
    {
      fieldName: pdfForm.psychologicalSection.motivation,
      fieldType: FieldType.Text,
      value: character.motivationDescription,
    },
    {
      fieldName: pdfForm.psychologicalSection.violence1,
      fieldType: FieldType.Checkbox,
      value: character.violence >= 1,
    },
    {
      fieldName: pdfForm.psychologicalSection.violence2,
      fieldType: FieldType.Checkbox,
      value: character.violence >= 2,
    },
    {
      fieldName: pdfForm.psychologicalSection.violence3,
      fieldType: FieldType.Checkbox,
      value: character.violence === 3,
    },
    {
      fieldName: pdfForm.psychologicalSection.helplessness1,
      fieldType: FieldType.Checkbox,
      value: character.helplessness >= 1,
    },
    {
      fieldName: pdfForm.psychologicalSection.helplessness2,
      fieldType: FieldType.Checkbox,
      value: character.helplessness >= 2,
    },
    {
      fieldName: pdfForm.psychologicalSection.helplessness3,
      fieldType: FieldType.Checkbox,
      value: character.helplessness === 3,
    },
    {
      fieldName: pdfForm.woundsSection.wounds,
      fieldType: FieldType.Text,
      value: character.wounds,
    },
    {
      fieldName: pdfForm.equipmentSection.armor,
      fieldType: FieldType.Text,
      value: character.armorAndGear,
    },
    {
      fieldName: pdfForm.remarksSection.personalDetails,
      fieldType: FieldType.Text,
      value: character.personalDetails,
    },
    {
      fieldName: pdfForm.remarksSection.homeFamilyEvents,
      fieldType: FieldType.Text,
      value: character.developmentsFamily,
    },
  ] as ExportFieldDescription[];

export default fieldDescriptions;
