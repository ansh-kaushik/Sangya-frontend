import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialUISlice = {
  selectedMenu: "Home",
};

const UISlice = createSlice({
  name: "UISlice",
  initialState: initialUISlice,
  reducers: {
    setSelectedMenu(state, action) {
      state.selectedMenu = action.payload.selectedMenu;
    },
  },
});

const store = configureStore({
  reducer: { UI: UISlice.reducer },
});

export const UIactions = UISlice.actions;

export default store;
