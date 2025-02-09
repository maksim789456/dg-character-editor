import { configureStore } from "@reduxjs/toolkit";
import dgCharacterReducer from "../features/dgCharacter/dgCharacterSlice";
import { professionMiddleware } from "../middleware/professionMiddleware";
import dgProfessionsReducer from "../features/dgCharacter/dgProfessionsSlice";

export function makeStore(preloadedState?: Partial<any>) {
  return configureStore({
    reducer: {
      dgCharacter: dgCharacterReducer,
      dgProfessions: dgProfessionsReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(professionMiddleware.middleware),
  });
}

export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
