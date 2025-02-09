type CreateArrayWithLengthX<
  LENGTH extends number,
  ACC extends unknown[] = []
> = ACC["length"] extends LENGTH
  ? ACC
  : CreateArrayWithLengthX<LENGTH, [...ACC, 1]>;

type NumericRange<
  START_ARR extends number[],
  END extends number,
  ACC extends number = never
> = START_ARR["length"] extends END
  ? ACC | END
  : NumericRange<[...START_ARR, 1], END, ACC | START_ARR["length"]>;

export interface DgCharacter {
  fullName: string;
  professionId?: string;
  useCustomProfession: boolean;
  customProfession: string;
  employer?: string;
  nationality?: string;

  gender: DgGender;
  customGender: string;
  age: string;
  education?: string;

  stats: DgCharacterStats;
  description?: string;

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
}

export interface DgCharacterBaseStat {
  score: NumericRange<CreateArrayWithLengthX<3>, 18>;
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
  characterSkillRate?: number;
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
