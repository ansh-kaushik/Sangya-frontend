import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialUIState = {
  sideBarOpen: true,
  selectedMenu: "Home",
  darkMode: localStorage.getItem("darkMode") === "true",
  homePageVideos: [],
  playlists: [],
};

const initialAuthState = {
  auth: false,
  email: undefined,
  id: undefined,
  name: "User Name",
  avatar: undefined,
};
const initialVideoSlice = {
  url: undefined,
  title: undefined,
  channelImage: undefined,
  channel: undefined,
  views: undefined,
  description: undefined,
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
    setHomePageVideos(state, action) {
      state.homePageVideos = action.payload.homePageVideos;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode);
    },
    setPlaylists(state, action) {
      state.playlists = action.payload.playlists;
    },
  },
});
const videoSlice = createSlice({
  name: "videoSlice",
  initialState: initialVideoSlice,
  reducers: {
    setVideoDetails(state, action) {
      const { title, url, channelImage, channel, views, description } = action.payload;
      return {
        ...state,
        title,
        url,
        channelImage,
        channel,
        views,
        description,
      };
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
      state.id = action.payload.id;
    },
    logout(state) {
      state = initialAuthState;
    },
  },
});

const store = configureStore({
  reducer: { UI: UISlice.reducer, auth: authSlice.reducer, video: videoSlice.reducer },
});

export const UIactions = UISlice.actions;
export const authActions = authSlice.actions;
export const videoActions = videoSlice.actions;

export default store;
