import { DgCharacterBaseSkill } from "./character";

export interface DgSkillsDict {
  baseSkills: DgCharacterBaseSkill[];
  typalSkillVariants: DgTypalSkillVariants;
}

export interface DgTypalSkillVariants {
  art: DgCharacterBaseSkill[];
  craft: DgCharacterBaseSkill[];
  military_science: DgCharacterBaseSkill[];
  pilot: DgCharacterBaseSkill[];
  science: DgCharacterBaseSkill[];
  foreign_language: DgCharacterBaseSkill[];
}
