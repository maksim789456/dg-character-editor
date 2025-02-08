import {
  AnyAction,
  createListenerMiddleware,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import {
  set,
  editSkillRate,
  addBound,
  addOtherSkill,
} from "../features/dgCharacter/dgCharacterSlice";
import { DgProfession } from "../model/profession";
import { RootState } from "../store/store";

export const professionMiddleware = createListenerMiddleware();

const resetCharacterSkills = (
  state: RootState,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
) => {
  console.log(state.dgCharacter.professionId);
  const previousProfession = state.dgProfessions.find(
    (p) => p.id == state.dgCharacter.professionId
  );
  if (!previousProfession) return;

  for (const baseSkill of previousProfession.baseSkills) {
    dispatch(editSkillRate({ skillId: baseSkill.id, rate: -1 }));
  }
};

const triggerFields = ["professionId", "useCustomProfession"];
professionMiddleware.startListening({
  actionCreator: set,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getOriginalState() as RootState;

    if (!triggerFields.includes(action.payload.field)) return;
    if (
      action.payload.value === "" ||
      (action.payload.field === "useCustomProfession" &&
        action.payload.value === true)
    ) {
      // TODO: Reset character bounds?
      resetCharacterSkills(state, listenerApi.dispatch);
      return;
    }

    const professionId =
      action.payload.field === "useCustomProfession" &&
      action.payload.value === false
        ? state.dgCharacter.professionId
        : action.payload.value;
    const selectedProfession = state.dgProfessions.find(
      (p) => p.id == professionId
    );
    if (!selectedProfession) {
      console.warn("Selected profession don't found at professions list");
      return;
    }

    if (state.dgCharacter.professionId !== "") {
      resetCharacterSkills(state, listenerApi.dispatch);
    }
    for (const baseSkill of selectedProfession.baseSkills.filter(
      (s) => s.id !== "foreign_language"
    )) {
      listenerApi.dispatch(
        editSkillRate({ skillId: baseSkill.id, rate: baseSkill.skillRate })
      );
    }
    for (const baseForeignLang of selectedProfession.baseSkills.filter(
      (s) => s.id === "foreign_language"
    )) {
      const otherSkillsCount = state.dgCharacter.skills.filter(
        (skill: any) => skill.isOther
      ).length;

      if (otherSkillsCount == 6) return;

      listenerApi.dispatch(
        addOtherSkill({
          id: `foreignLanguage${otherSkillsCount}`,
          isForeignLanguage: true,
        })
      );
    }

    const currentBoundsCount = state.dgCharacter.bounds.length;
    if (currentBoundsCount !== selectedProfession.bounds) {
      const needAdd = selectedProfession.bounds - currentBoundsCount;
      for (let i = 0; i < needAdd; i++) {
        listenerApi.dispatch(addBound());
      }
    }
  },
});
