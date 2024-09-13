import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialUIState = {
  sideBarOpen: true,
  selectedMenu: "Home",
};

const initialAuthState = {
  auth: false,
  email: undefined,
  name: "User Name",
  avatar: undefined,
};
const UISlice = createSlice({
  name: "UISlice",
  initialState: initialUIState,
  reducers: {
    setSelectedMenu(state, action) {
      state.selectedMenu = action.payload.selectedMenu;
    },
    changeSideBarOpen(state, action) {
      state.sideBarOpen = action.payload;
    },
  },
});

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.auth = true;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
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
