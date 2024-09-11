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
  const [kills, setKills] = useState(0);

  const handleRefreshKills = async (e) => {
    e.preventDefault();
    let prevKills = localStorage.getItem("kills");
    console.log(prevKills);

    if (prevKills === null || prevKills === undefined) prevKills = 0;
    const newKills = await getNewKills();
    localStorage.setItem("kills", parseInt(prevKills) + newKills);
    setKills(localStorage.getItem("kills"));
  };

  useEffect(() => {
    let prevKills = localStorage.getItem("kills");
    if (prevKills === undefined || prevKills === null) prevKills = 0;
    setKills(prevKills);
  }, []);
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
      </Routes>
    </>
  );
}

export default App;
