import React from "react";
import { Link } from "react-router-dom";

import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
export default function Footer() {
  return (
    <div className=" sticky bottom-0  flex items-center justify-between space-x-4 p-2 bg-slate-600 text-white shadow-md   ">
      <h1 className="">@2024 Sangya. All Rights Reserved</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">
          <YouTubeIcon />
        </Link>
        <Link to="/about" className="hover:underline">
          <XIcon />
        </Link>
        <Link to="/contact" className="hover:underline">
          <InstagramIcon />
        </Link>
        {/* Add more navigation items as needed */}
      </nav>
    </div>
  );
  //  <div className=" sticky bottom-0 bg-lime-50">Hello</div>;
}
