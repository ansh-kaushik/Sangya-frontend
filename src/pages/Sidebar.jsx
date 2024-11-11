import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import { UIactions } from "../store";
import { DarkMode, LightMode, LiveTv, MenuOutlined, Podcasts } from "@mui/icons-material";

export default function Sidebar() {
  const selectedMenu = useSelector((state) => state.UI.selectedMenu);
  const open = useSelector((state) => state.UI.sideBarOpen);
  const darkMode = useSelector((state) => state.UI.darkMode);
  const dispatch = useDispatch();

  const Menus = [
    { title: "Home", icon: <HomeIcon />, link: "" },
    { title: "Subscriptions", icon: <SubscriptionsIcon />, link: "subscriptions" },
    { title: "Your Videos", gap: true, icon: <VideoLibraryIcon />, link: "myVideos" },
    { title: "History", icon: <HistoryIcon />, link: "watchHistory" },
    { title: "Playlists", icon: <PlaylistPlayIcon />, link: "myPlaylists" },
    { title: "Liked Videos", icon: <ThumbUpIcon />, link: "likedVideos" },
    { title: "Live Now", icon: <LiveTv />, link: "live", gap: true },
    { title: "Go Live", icon: <Podcasts />, link: "goLive" },
    // { title: "Settings", icon: <SettingsIcon />, gap: true, link: "appSettings" },
  ];

  return (
    <div
      id="sidebar"
      className={`sm:flex absolute sidebar   ${!open ? "hidden  " : ""}  left-0 z-50 `}
    >
      <div
        className={`${
          open ? "w-56 sm:w-72" : "w-20"
        } h-screen p-5 pt-8 dark:bg-zinc-900 bg-dark-purple   transition-all duration-300 `}
      >
        <div className="flex items-center gap-x-4 pl-2 ">
          <MenuOutlined
            onClick={() => dispatch(UIactions.changeSideBarOpen(!open))}
            className={`cursor-pointer duration-700 ${open && "rotate-[360deg]"}`}
            sx={{ color: "white" }}
          />
          <h1
            className={`text-white dark:text-blue-700 origin-left font-medium text-xl duration-300
              text-shadow: 2px 4px 4px rgb(46 91 173 / 0.6); ${!open && "scale-0"}`}
          >
            SANGYA
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((menu, idx) => (
            <Link key={idx} to={`/${menu.link}`}>
              <li
                key={idx}
                onClick={() => {
                  dispatch(UIactions.setSelectedMenu({ selectedMenu: menu.title }));
                  localStorage.setItem("selectedMenu", menu.title);
                }}
                className={`text-gray-200  text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${
                  menu.gap ? "mt-9" : "mt-2"
                } ${selectedMenu === menu.title ? "bg-light-white" : "bg-transparent"}`}
              >
                {menu.icon}
                <span
                  className={`${!open && "scale-0  "} origin-left text-gray-200 text-sm duration-300`}
                >
                  {menu.title}
                </span>
              </li>
            </Link>
          ))}
          {/* UI THEME MODE */}
          <li
            key={Menus.length}
            onClick={() => dispatch(UIactions.toggleDarkMode())}
            className={`text-gray-200 text-sm sm:hidden flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${"mt-9"}`}
          >
            {darkMode ? <LightMode /> : <DarkMode />}
            <span
              className={`${!open && "scale-0"} origin-left text-gray-200 text-sm duration-300`}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
