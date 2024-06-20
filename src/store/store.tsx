import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import dgCharacterReducer from "../features/dgCharacter/dgCharacterSlice";
import dgCharactersReducer from "../features/dgCharacter/dgCharactersSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "dg-character-editor",
  storage,
};

const persistedReducer = persistReducer(persistConfig, dgCharactersReducer);

export const store = configureStore({
  reducer: {
    dgCharacter: dgCharacterReducer,
    characters: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
