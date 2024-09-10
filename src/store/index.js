import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialUIState = {
  selectedMenu: "Home",
};

const initialAuthState = {
  auth: false,
};
const UISlice = createSlice({
  name: "UISlice",
  initialState: initialUIState,
  reducers: {
    setSelectedMenu(state, action) {
      state.selectedMenu = action.payload.selectedMenu;
    },
  },
});

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.auth = true;
    },
    logout(state) {
      state.auth = false;
    },
  },
});

const store = configureStore({
  reducer: { UI: UISlice.reducer, auth: authSlice.reducer },
});

export const UIactions = UISlice.actions;
export const authActions = authSlice.actions;
export default store;
