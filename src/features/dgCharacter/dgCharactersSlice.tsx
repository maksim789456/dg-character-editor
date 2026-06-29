import { Dictionary, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState as defaultDgCharacter } from "./dgCharacterSlice";
import dgCharacterReducer, {
  createDefaultDgCharacter,
} from "./dgCharacterSlice";
import { v4 } from "uuid";
import { DgCharacter } from "@/src/model/character";

const initialState = {} as Dictionary<DgCharacter>;

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
  },
});

export const { createCharacter, deleteCharacter } = dgCharactersSlice.actions;

export default dgCharactersSlice.reducer;
