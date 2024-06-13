import { configureStore } from "@reduxjs/toolkit";
import dgCharacterReducer from "../features/dgCharacter/dgCharacterSlice";
import { professionMiddleware } from "../middleware/professionMiddleware";
import dgProfessionsReducer from "../features/dgCharacter/dgProfessionsSlice";

const store = configureStore({
  reducer: {
    dgCharacter: dgCharacterReducer,
    dgProfessions: dgProfessionsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(professionMiddleware.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
