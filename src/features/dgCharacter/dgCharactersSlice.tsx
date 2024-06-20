import { Dictionary, createSlice } from "@reduxjs/toolkit";
import { initialState as defaultDgCharacter } from "./dgCharacterSlice";
import { v4 } from "uuid";
import { DgCharacter } from "@/src/model/character";

const uid = "c3265583-a070-45f6-b7a7-0e1730a9f2e8";
// const uid = v4();
const initialState = {} as Dictionary<DgCharacter>;
initialState[uid] = defaultDgCharacter;

export const dgCharactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
});

export const {} = dgCharactersSlice.actions;

export default dgCharactersSlice.reducer;
