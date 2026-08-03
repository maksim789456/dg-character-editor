import {
  AnyAction,
  combineReducers,
  configureStore,
  Dictionary,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { initialState as defaultDgCharacter } from "../features/dgCharacter/dgCharacterSlice";
import dgCharactersReducer, {
  activeCharacterReducer,
  applyDgCharacterAction,
} from "../features/dgCharacter/dgCharactersSlice";
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
import { DgCharacter } from "../model/character";

const persistConfig = {
  key: "dg-character-editor",
  storage,
};

const persistedReducer = persistReducer(persistConfig, dgCharactersReducer);

const appReducer = combineReducers({
  activeCharacterId: activeCharacterReducer,
  characters: persistedReducer,
});

type AppState = ReturnType<typeof appReducer>;
type RootReducerState = AppState & { dgCharacter: DgCharacter };

const selectActiveDgCharacter = (state: AppState) => {
  const characters = state.characters as Dictionary<DgCharacter>;
  return (
    (state.activeCharacterId && characters[state.activeCharacterId]) ||
    defaultDgCharacter
  );
};

const isDgCharacterAction = (action: AnyAction) =>
  action.type.startsWith("dgCharacter/");

const rootReducer = (
  state: RootReducerState | undefined,
  action: AnyAction
): RootReducerState => {
  const appState = state
    ? {
        activeCharacterId: state.activeCharacterId,
        characters: state.characters,
      }
    : undefined;

  let nextState = appReducer(appState, action);

  if (isDgCharacterAction(action) && nextState.activeCharacterId) {
    nextState = {
      ...nextState,
      characters: persistedReducer(
        nextState.characters,
        applyDgCharacterAction({
          characterId: nextState.activeCharacterId,
          action,
        })
      ),
    };
  }

  return {
    ...nextState,
    dgCharacter: selectActiveDgCharacter(nextState),
  };
};

export const store = configureStore({
  reducer: rootReducer,
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
