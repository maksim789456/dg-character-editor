import { createListenerMiddleware } from "@reduxjs/toolkit";
import { set, editSkillRate } from "../features/dgCharacter/dgCharacterSlice";
import { DgProfession } from "../model/profession";

export const professionMiddleware = createListenerMiddleware();

professionMiddleware.startListening({
  actionCreator: set,
  effect: async (action, listenerApi) => {
    if (action.payload.field !== "professionId") return;
    if (!action.payload.value) return; //todo: reset skills set?

    const professions = (listenerApi.getState() as any)
      .dgProfessions as DgProfession[];
    const selectedProfession = professions.find(
      (p) => p.id == action.payload.value
    );
    if (!selectedProfession) return;

    for (const baseSkill of selectedProfession.baseSkills) {
      listenerApi.dispatch(
        editSkillRate({ skillId: baseSkill.id, rate: baseSkill.skillRate })
      );
    }
  },
});
