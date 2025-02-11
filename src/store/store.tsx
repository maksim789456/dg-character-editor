import { configureStore } from "@reduxjs/toolkit";
import dgCharacterReducer from "../features/dgCharacter/dgCharacterSlice";
import { professionMiddleware } from "../middleware/professionMiddleware";
import dgProfessionsReducer from "../features/dgCharacter/dgProfessionsSlice";
import dgSkillsReducer from "../features/dgCharacter/dgSkillsSlice";

export function makeStore(preloadedState?: Partial<any>) {
  return configureStore({
    reducer: {
      dgCharacter: dgCharacterReducer,
      dgProfessions: dgProfessionsReducer,
      dgSkills: dgSkillsReducer
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(professionMiddleware.middleware),
  });
}

export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
