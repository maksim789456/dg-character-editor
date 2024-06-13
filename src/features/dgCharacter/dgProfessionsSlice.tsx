import { DgProfession } from "@/src/model/profession";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const dgProfessionsSlice = createSlice({
  name: "dgProfessions",
  initialState: [] as DgProfession[],
  reducers: {
    setProfessions: (
      state: DgProfession[],
      action: PayloadAction<DgProfession[]>
    ) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setProfessions } = dgProfessionsSlice.actions;

export default dgProfessionsSlice.reducer;
