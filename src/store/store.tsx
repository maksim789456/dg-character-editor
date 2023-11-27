import { configureStore } from "@reduxjs/toolkit";
import dgCharacterReducer from "../features/dgCharacter/dgCharacterSlice";

export default configureStore({
  reducer: {
    dgCharacter: dgCharacterReducer
  },
});
