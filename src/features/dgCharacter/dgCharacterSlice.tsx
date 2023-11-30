import {
  DgCharacter,
  DgCharacterBaseStat,
  DgCharacterBound,
  DgCharacterSkill,
  DgCharacterStats,
  DgCharacterWeapon,
  DgCharacterSpecialTraining,
  DgGender,
} from "@/src/model/character";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  profession: "",
  employer: "",
  nationality: "",

  gender: DgGender.None,
  age: "",
  education: "",

  stats: {
    str: { score: 3 },
    con: { score: 3 },
    dex: { score: 3 },
    int: { score: 3 },
    pow: { score: 3 },
    cha: { score: 3 },
    hp: 3,
    wp: 3,
    san: 15,
    bp: 12,
  } as DgCharacterStats,

  bounds: [] as DgCharacterBound[],
  violence: 0,
  helplessness: 0,

  skills: [
    { id: "accounting", baseSkillRate: 10 },
    { id: "alertness", baseSkillRate: 20 },
    { id: "anthropology", baseSkillRate: 0 },
    { id: "archeology", baseSkillRate: 0 },
    { id: "art", baseSkillRate: 0, isTypal: true },
    { id: "artillery", baseSkillRate: 0 },
    { id: "athletics", baseSkillRate: 30 },
    { id: "bureaucracy", baseSkillRate: 10 },
    { id: "computer_science", baseSkillRate: 0 },
    { id: "craft", baseSkillRate: 0, isTypal: true },
    { id: "criminology", baseSkillRate: 10 },
    { id: "demolitions", baseSkillRate: 0 },
    { id: "disguise", baseSkillRate: 10 },
    { id: "dodge", baseSkillRate: 30 },
    { id: "drive", baseSkillRate: 20 },
    { id: "firearms", baseSkillRate: 20 },
    { id: "first_aid", baseSkillRate: 10 },
    { id: "forensics", baseSkillRate: 0 },
    { id: "heavy_machinery", baseSkillRate: 10 },
    { id: "heavy_weapons", baseSkillRate: 0 },
    { id: "history", baseSkillRate: 10 },
    { id: "humint", baseSkillRate: 10 },
    { id: "law", baseSkillRate: 0 },
    { id: "medicine", baseSkillRate: 0 },
    { id: "melee_weapons", baseSkillRate: 30 },
    { id: "military_science", baseSkillRate: 0, isTypal: true },
    { id: "navigate", baseSkillRate: 10 },
    { id: "occult", baseSkillRate: 10 },
    { id: "persuade", baseSkillRate: 20 },
    { id: "pharmacy", baseSkillRate: 0 },
    { id: "pilot", baseSkillRate: 0, isTypal: true },
    { id: "psychotherapy", baseSkillRate: 10 },
    { id: "ride", baseSkillRate: 10 },
    { id: "science", baseSkillRate: 0, isTypal: true },
    { id: "search", baseSkillRate: 20 },
    { id: "sigint", baseSkillRate: 0 },
    { id: "stealth", baseSkillRate: 10 },
    { id: "surgery", baseSkillRate: 0 },
    { id: "survival", baseSkillRate: 10 },
    { id: "swim", baseSkillRate: 20 },
    { id: "unarmed_combat", baseSkillRate: 40 },
    { id: "unnatural", baseSkillRate: 0, hideDamage: true },
  ] as DgCharacterSkill[],
  weapons: [] as DgCharacterWeapon[],
  specialTrainings: [] as DgCharacterSpecialTraining[],

  editMode: true,
} as DgCharacter;

export interface SetReducerProps {
  field: string;
  value: any;
}

export interface EditBoundProps {
  id: number;
  bound: DgCharacterBound;
}

export interface EditSkillProps {
  id: number;
  skill: DgCharacterSkill;
}

export interface EditWeaponProps {
  id: number;
  weapon: DgCharacterWeapon;
}

export interface EditSpecialTrainingProps {
  id: number;
  specialTraining: DgCharacterSpecialTraining;
}

export const dgCharacterSlice = createSlice({
  name: "dgCharacter",
  initialState,
  reducers: {
    set: (state: DgCharacter, action: PayloadAction<SetReducerProps>) => {
      return Object.assign({}, state, {
        [action.payload.field]: action.payload.value,
      });
    },
    setBaseStat: (
      state: DgCharacter,
      action: PayloadAction<SetReducerProps>
    ) => {
      (
        state.stats[
          action.payload.field as keyof DgCharacterStats
        ] as DgCharacterBaseStat
      ).score = action.payload.value > 18 ? 18 : action.payload.value;
      return state;
    },
    setBaseStatDescription: (
      state: DgCharacter,
      action: PayloadAction<SetReducerProps>
    ) => {
      (
        state.stats[
          action.payload.field as keyof DgCharacterStats
        ] as DgCharacterBaseStat
      ).description = action.payload.value;
      return state;
    },
    setStat: (state: DgCharacter, action: PayloadAction<SetReducerProps>) => {
      (state.stats[
        action.payload.field as keyof DgCharacterStats
      ] as DgCharacterBaseStat) = action.payload.value;
      return state;
    },
    addBound: (state: DgCharacter) => {
      state.bounds.push({
        damaged: false,
        name: "",
        score: state.stats.cha.score,
      } as DgCharacterBound);
      return state;
    },
    editBound: (state: DgCharacter, action: PayloadAction<EditBoundProps>) => {
      if (state.bounds[action.payload.id]) {
        state.bounds[action.payload.id] = action.payload.bound;
      }
      return state;
    },
    addOtherSkill: (state: DgCharacter, action: PayloadAction<string>) => {
      state.skills.push({
        id: action.payload,
        name: "",
        baseSkillRate: 0,
        isOther: true,
        characterSkillRate: 0,
      } as DgCharacterSkill);
    },
    editSkill: (state: DgCharacter, action: PayloadAction<EditSkillProps>) => {
      if (state.skills[action.payload.id]) {
        state.skills[action.payload.id] = action.payload.skill;
      }
      return state;
    },
    addWeapon: (state: DgCharacter) => {
      state.weapons.push({
        name: "",
        skill: "",
        baseRange: "",
        damage: "",
        armorPiercing: "",
        lethality: "",
        killRadius: "",
        ammo: "",
      } as DgCharacterWeapon);
      return state;
    },
    editWeapon: (
      state: DgCharacter,
      action: PayloadAction<EditWeaponProps>
    ) => {
      if (state.weapons[action.payload.id]) {
        state.weapons[action.payload.id] = action.payload.weapon;
      }
      return state;
    },
    addSpecialTraining: (state: DgCharacter) => {
      state.specialTrainings.push({
        name: "",
        skill: "",
      } as DgCharacterSpecialTraining);
      return state;
    },
    editSpecialTraining: (
      state: DgCharacter,
      action: PayloadAction<EditSpecialTrainingProps>
    ) => {
      if (state.specialTrainings[action.payload.id]) {
        state.specialTrainings[action.payload.id] =
          action.payload.specialTraining;
      }
      return state;
    },
    clear: () => initialState,
  },
});

export const {
  set,
  setBaseStat,
  setBaseStatDescription,
  setStat,
  addBound,
  editBound,
  addOtherSkill,
  editSkill,
  addWeapon,
  editWeapon,
  addSpecialTraining,
  editSpecialTraining,
  clear,
} = dgCharacterSlice.actions;

export default dgCharacterSlice.reducer;
