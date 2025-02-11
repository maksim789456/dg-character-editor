import { DgSkillsDict } from "@/src/model/skills";
import { createSlice } from "@reduxjs/toolkit";

export const dgSkillsSlice = createSlice({
  name: "dgSkills",
  initialState: {} as DgSkillsDict,
  reducers: {},
});

export const { } = dgSkillsSlice.actions;

export default dgSkillsSlice.reducer;
