import {
  AnyAction,
  Dictionary,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import dgCharacterReducer, {
  createDefaultDgCharacter,
} from "./dgCharacterSlice";
import { v4 } from "uuid";
import { DgCharacter } from "@/src/model/character";

const initialState = {} as Dictionary<DgCharacter>;

interface ApplyDgCharacterActionPayload {
  characterId: string;
  action: AnyAction;
}

export const dgCharactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    createCharacter: {
      reducer: (
        state: Dictionary<DgCharacter>,
        action: PayloadAction<string>
      ) => {
        state[action.payload] = createDefaultDgCharacter();
      },
      prepare: () => ({ payload: v4() }),
    },
    deleteCharacter: (
      state: Dictionary<DgCharacter>,
      action: PayloadAction<string>
    ) => {
      delete state[action.payload];
      return state;
    },
    applyDgCharacterAction: (
      state: Dictionary<DgCharacter>,
      action: PayloadAction<ApplyDgCharacterActionPayload>
    ) => {
      const { characterId, action: dgCharacterAction } = action.payload;
      const character = state[characterId] ?? createDefaultDgCharacter();
      state[characterId] = dgCharacterReducer(
        character as DgCharacter,
        dgCharacterAction
      );
    },
  },
});

export const activeCharacterSlice = createSlice({
  name: "activeCharacter",
  initialState: null as string | null,
  reducers: {
    setActiveCharacterId: (_state, action: PayloadAction<string>) =>
      action.payload,
  },
});

export const { createCharacter, deleteCharacter, applyDgCharacterAction } =
  dgCharactersSlice.actions;
export const { setActiveCharacterId } = activeCharacterSlice.actions;
export const activeCharacterReducer = activeCharacterSlice.reducer;

export default dgCharactersSlice.reducer;
