import { useEffect, useState } from "react";
// import EmailTemplate from "./EmailTemplate";

import { Button, Container } from "@mui/material";
import axios, { all } from "axios";
import MMRList from "./components/MMRList";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Inbox from "./pages/Inbox";
import Subscriptions from "./pages/Subscriptions";
import Home from "./pages/Home";
import UserVideos from "./pages/UserVideos";
import WatchHistory from "./pages/WatchHistory";
import Playlists from "./pages/Playlists";
import LikedVideos from "./pages/LikedVideos";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AppSettings from "./pages/AppSettings";
import SignUp from "./pages/SignUp";
import VideoPage from "./pages/VideoPage";
import UploadVideo from "./pages/UploadVideo";
import { useDispatch, useSelector } from "react-redux";
import { authActions, UIactions } from "./store";
import axiosInstance from "./services/axiosInstance";
import SearchResults from "./pages/SearchResults";

const getNewKills = async () => {
  // const api_key = "HDEV-8547f177-1188-4cf9-8086-2a8d734ec747";
  const url =
    "https://api.henrikdev.xyz/valorant/v3/matches/ap/mark3000/9463?api_key=HDEV-8547f177-1188-4cf9-8086-2a8d734ec747";
  const res = await axios.get(url);

  const data = res.data.data;
  console.log("🤣🤣", data);

  const lastMatchData = data[0];
  const allPlayerData = lastMatchData.players.all_players;
  const reqUserData = allPlayerData.filter((p) => p.name === "mark3000")[0];
  console.log("🚩🚩", reqUserData);

  const newKills = reqUserData.stats.kills;
  return parseInt(newKills);
};

function App() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const syncAuthSlice = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
      const res = await axios.get(`${BASE_URL}/users/getUser`, { withCredentials: true });

      const user = res.data.data;
      // console.log(user);
      if (res.status === 200) {
        dispatch(
          authActions.login({
            email: user.email,
            name: user.fullName,
            auth: true,
            avatar: user.avatar,
            id: user._id,
          })
        );
      }
    } catch (error) {
      console.error("Error syncing auth slice:", error);
    }
  };
  const stay_logged = JSON.parse(localStorage.getItem("stay-logged"));

  const syncUISlice = async () => {
    const res = await axiosInstance.get(`/subscriptions/c/${id}`);
    // console.log(res.data.data.channels);
    dispatch(UIactions.setSubscriptions({ subscriptions: res.data.data.channels }));
  };

  useEffect(() => {
    if (stay_logged) {
      syncAuthSlice();
    }
  }, []);
  useEffect(() => {
    if (id && stay_logged) {
      syncUISlice();
    }
  }, [id]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<Inbox />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/myVideos" element={<UserVideos />} />
        <Route path="/watchHistory" element={<WatchHistory />} />
        <Route path="/myPlaylists" element={<Playlists />} />
        <Route path="/likedVideos" element={<LikedVideos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/appSettings" element={<AppSettings />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/uploadVideo" element={<UploadVideo />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </>
  );
}

export default App;
