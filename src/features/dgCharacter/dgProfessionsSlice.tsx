import { DgProfession } from "@/src/model/profession";
import { createSlice } from "@reduxjs/toolkit";

export const dgProfessionsSlice = createSlice({
  name: "dgProfessions",
  initialState: [] as DgProfession[],
  reducers: {},
});

export const { } = dgProfessionsSlice.actions;

export default dgProfessionsSlice.reducer;
