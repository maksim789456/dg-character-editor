export interface DgCharacter {
  fullName: string;
  profession: string;
  employer?: string;
  nationality?: string;

  gender: DgGender;
  customGender: string;
  age: string;
  education?: string;

  stats: DgCharacterStats;

  bounds: DgCharacterBound[];
  motivationDescription?: string;
  violence: number;
  helplessness: number;

  skills: DgCharacterSkill[];

  wounds?: string;
  firstHelpAttempted?: boolean;

  armorAndGear?: string;
  weapons: DgCharacterWeapon[];

  personalDetails?: string;
  developmentsFamily?: string;
  specialTrainings: DgCharacterSpecialTraining[];

  editMode: boolean;
}

export interface DgCharacterStats {
  str: DgCharacterBaseStat;
  con: DgCharacterBaseStat;
  dex: DgCharacterBaseStat;
  int: DgCharacterBaseStat;
  pow: DgCharacterBaseStat;
  cha: DgCharacterBaseStat;

  hp: number;
  wp: number;
  san: number;
  bp: number;

  description?: string;
}

export interface DgCharacterBaseStat {
  score: number;
  description?: string;
}

export interface DgCharacterBound {
  damaged: boolean;
  name: string;
  score: number;
}

export interface DgCharacterBaseSkill {
  id: string;
  name: string;
  baseSkillRate: number;
  isTypal?: boolean;
  hideDamage?: boolean;
}

export interface DgCharacterSkill extends DgCharacterBaseSkill {
  isOther?: boolean;
  isForeignLanguage?: boolean;
  damaged?: boolean;
  characterSkillRate: number;
  type?: string;
}

export interface DgCharacterWeapon {
  name: string;
  skill: string;
  baseRange?: string;
  damage?: string;
  armorPiercing?: string;
  lethality?: string;
  killRadius?: string;
  ammo?: string;
}

export interface DgCharacterSpecialTraining {
  name: string;
  skill?: string;
}

export enum DgGender {
  None,
  Male,
  Female,
  Custom,
}
