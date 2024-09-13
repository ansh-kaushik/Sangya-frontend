// import { AccountBoxOutlined } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, Typography } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ShareIcon from "@mui/icons-material/Share";
import React from "react";

export default function VideoControlPanel() {
  return (
    <div className="flex justify-between p-4">
      <div className="flex  gap-3 justify-center items-center">
        <AccountCircleIcon fontSize="large" />
        <Link underline="none" className="hover:cursor-pointer" onClick={() => navigate("/video")}>
          <Typography variant="h7" className="font-semibold text-gray-800 text-lg">
            Code with C++
          </Typography>
          <Typography
            variant="body2"
            className="text-gray-600 hover:text-gray-950 hover:cursor-pointer"
          >
            1.5M subscribers
          </Typography>
        </Link>
        <button
          type="button"
          className="border rounded-full bg-red-600 text-white px-4 py-2  hover:bg-red-400 transition-all duration-300"
        >
          Subscribe
        </button>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className="  text-black hover:text-blue-600 px-1 py-0 transition-all duration-300"
        >
          <ThumbUpAltIcon />
        </button>
        <button
          type="button"
          className=" bg-slate-40  text-black  hover:text-red-600 transition-all duration-300  "
        >
          <ThumbDownAltIcon />
        </button>
        <button
          type="button"
          className=" text-black ml-3 hover:text-green-600 transition-all duration-300"
        >
          <ShareIcon />
        </button>
      </div>
    </div>
  );
}