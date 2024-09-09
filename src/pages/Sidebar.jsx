import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SettingsIcon from "@mui/icons-material/Settings";
export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Home", src: "Chart_fill", link: "", icon: <HomeIcon /> },
    {
      title: "Subsciptions",
      src: "subscriptions",
      link: "subscriptions",
      icon: <SubscriptionsIcon />,
    },
    { title: "Your Videos", gap: true, icon: <VideoLibraryIcon />, link: "myVideos" },
    { title: "History", icon: <HistoryIcon />, link: "watchHistory" },
    { title: "Playlists", icon: <PlaylistPlayIcon />, link: "myPlaylists" },
    { title: "Liked Videos", icon: <ThumbUpIcon />, link: "likedVideos" },
    { title: "Settings", icon: <SettingsIcon />, gap: true, link: "appSettings" },
  ];

  useEffect(() => {
    function handleMouseEnter(e) {
      e.stopPropagation();
      setOpen(true);
    }
    function handleMouseLeave(e) {
      e.stopPropagation();
      setOpen(false);
    }
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;
    sidebar.addEventListener("mouseenter", handleMouseEnter);
    sidebar.addEventListener("mouseleave", handleMouseLeave);
    // console.log(sidebar);

    return () => {
      sidebar.addEventListener("mouseenter", handleMouseEnter);
      sidebar.addEventListener("mouseleave", handleMouseLeave);
    };
  }, [open]);
  return (
    <div id="sidebar" className="flex  sticky left-0">
      <div
        className={`${
          open ? "w-72" : "w-20"
        }  duration-300 h-screen p-5 pt-8 bg-dark-purple relative `}
      >
        {/* <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-dark-purple ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        /> */}
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png"
            alt=""
            className={`cursor-pointer duration-700 ${open && "rotate-[360deg]"}`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            SANGYA
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((menu, idx) => (
            <Link key={idx} to={`/${menu.link}`}>
              <li
                key={idx}
                className={`text-gray-200 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${
                  menu.gap ? "mt-9" : "mt-2"
                }  ${idx === 0 && "bg-light-white"}`}
              >
                {/* <img src={`./src/assets/${menu.src}.png`} className="w-6 h-6 object-contain" /> */}
                {menu.icon}
                <span className={`${!open && "scale-0"} origin-left  duration-300`}>
                  {menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
