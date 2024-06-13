export interface DgProfession {
  id: string;
  name: string;
  baseSkills: DgProfessionSkill[];
  additionalCount: number;
  additionalSkills: DgProfessionSkill[];
  stats: string[];
  bounds: number;
}

export interface DgProfessionSkill {
  id: string;
  skillRate: number;
  isTypal?: boolean;
  type?: string;
  anyType?: boolean;
}
