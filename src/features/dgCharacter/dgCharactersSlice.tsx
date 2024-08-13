import { Dictionary, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState as defaultDgCharacter } from "./dgCharacterSlice";
import { v4 } from "uuid";
import { DgCharacter } from "@/src/model/character";

const initialState = {} as Dictionary<DgCharacter>;

export const dgCharactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    createCharacter: (
      state: Dictionary<DgCharacter>,
      action: PayloadAction<string>
    ) => {
      let uuid = v4();
      state[uuid] = defaultDgCharacter;
      action.payload = uuid;
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
