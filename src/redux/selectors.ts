import { createSelector } from "@reduxjs/toolkit";
import {
  DgCharacter,
  DgCharacterStats,
  DgCharacterBaseStat,
} from "../model/character";
import { RootState } from "../store/store";

export const maxHpSelector = (state: RootState) =>
  Math.round(
    (state.dgCharacter.stats.str.score + state.dgCharacter.stats.con.score) / 2
  );
export const maxWpSelector = (state: RootState) =>
  state.dgCharacter.stats.pow.score;
export const maxSanSelector = (state: RootState) =>
  99 -
  (state.dgCharacter.skills.find((p) => p.id === "unnatural")
    ?.characterSkillRate ?? 0);

export const baseStatSelector = (dgCharacter: DgCharacter, statName: string) =>
  dgCharacter.stats[statName as keyof DgCharacterStats] as DgCharacterBaseStat;
export const makeBaseStatSelectorInstance = (fieldName: string) =>
  createSelector(
    (state: RootState) => state.dgCharacter,
    (dgCharacter) => baseStatSelector(dgCharacter, fieldName)
  );

export const calcStatSelector = (dgCharacter: DgCharacter, statName: string) =>
  dgCharacter.stats[statName as keyof DgCharacterStats] as number;
export const makeCalcStatSelectorInstance = (fieldName: string) =>
  createSelector(
    (state: RootState) => state.dgCharacter,
    (dgCharacter) => calcStatSelector(dgCharacter, fieldName)
  );
