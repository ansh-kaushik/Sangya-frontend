import React, { useState } from "react";
import PageWrapper from "./PageWrapper";
import VideoCard from "../components/VideoCompoents/VideoCard";
import { History } from "@mui/icons-material";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import thumbnail from "../assets/thumbnail 1.jpg";

const videoDetails = {
  thumbnail: "./src/assets/thumbnail 1.jpg",
  title: "C++ Tutorial for Beginners 2024",
  views: 200,
  channel: "Code In C++",
  channelImage: "./src/assets/channel_icon.png",
  uploadTime: "7 days ago",
};

export default function Playlists() {
  const { auth } = useSelector((state) => state.auth);
  const [showAllPlaylists, setShowAllPlaylists] = useState(true);
  const handlePlaylist = () => {
    setShowAllPlaylists(!showAllPlaylists);
  };
  const PlayListCard = () => {
    return (
      <div onClick={handlePlaylist}>
        <div className="relative h-44 hover:cursor-pointer rounded-lg hover:shadow-lg hover:shadow-orange-300 aspect-video bg-red-300 transition-shadow duration-300">
          <span className="absolute  bottom-1  right-1"> 6 videos</span>
        </div>
        <div>Playlist name</div>
      </div>
    );
  };
  const AllPlaylists = () => {
    return (
      <div className="flex flex-col h-full">
        {/* Non-scrollable heading */}
        <div className="flex mt-2  gap-4 justify-start items-center">
          <h2 className=" p-4 text-xl">Playlists</h2>
        </div>
        <div className="p-4 flex flex-wrap  gap-4">
          {Array.from({ length: 5 }, (_, idx) => (
            <PlayListCard />
          ))}
        </div>
      </div>
    );
  };

  const SinglePlaylist = () => {
    return (
      <div className="flex flex-col gap-2  h-full">
        <div className="flex mt-2  gap-4 justify-start items-center">
          <Button onClick={() => setShowAllPlaylists(!showAllPlaylists)}>
            <ArrowBackIcon />
          </Button>
        </div>
        <div className="flex h-full gap-4  px-2 justify-center  ">
          <div className="h-[calc(100vh-200px)] flex flex-col justify-center items-center  w-80   dark:bg-zinc-800 rounded-xl">
            <div>this will have latest video image</div>
            <h1 className="text-2xl font-bold dark:text-white">Playlist 1 </h1>
            <h4 className="font-normal text-sm">this is my first playlist</h4>
            <h4 className="font-sans text-sm">6 videos</h4>
          </div>
          <div className="flex-1 p-4  h-[calc(100vh-200px)] overflow-auto  flex flex-col gap-3  ">
            {Array.from({ length: 20 }, (_, idx) => (
              <div className="flex gap-4 ">
                <div className="w-2  flex justify-center items-center">{idx + 1}</div>
                <img
                  src={thumbnail}
                  className="lg:w-36 aspect-video max-w-36"
                  alt="vidoe sm image"
                />
                <div>
                  {" "}
                  <h4 className="font-semibold text-lg">Code in c++ </h4>
                  <h5 className="font-normal text-sm "> Code with c++ . 17M Views . 3 days ago</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  return (
    <PageWrapper>
      {!auth ? (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-100 dark:bg-zinc-900 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 dark:text-white">
            Please log in to manage your playlists
          </h2>
          <p className="text-gray-500 mb-6">
            You need to be signed in to create or upload videos to your playlist.
          </p>
        </div>
      ) : showAllPlaylists ? (
        <AllPlaylists />
      ) : (
        <SinglePlaylist />
      )}
    </PageWrapper>
  );
}
