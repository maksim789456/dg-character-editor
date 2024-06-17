import { configureStore } from "@reduxjs/toolkit";
import dgCharacterReducer from "../features/dgCharacter/dgCharacterSlice";

const store =  configureStore({
  reducer: {
    dgCharacter: dgCharacterReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;