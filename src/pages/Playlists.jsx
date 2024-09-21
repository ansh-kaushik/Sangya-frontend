import React, { useEffect, useState } from "react";
import PageWrapper from "./PageWrapper";
import VideoCard from "../components/VideoCompoents/VideoCard";
import { Delete, History, MoreVert } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import thumbnail from "../assets/thumbnail 1.jpg";
import axios from "axios";
import axiosInstance from "../services/axiosInstance";
import { UIactions } from "../store";
import { useNavigate } from "react-router-dom";

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
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const navigate = useNavigate();
  const playlists = useSelector((state) => state.UI.playlists);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    console.log(event.currentTarget);

    setAnchorEl(event.currentTarget);
  };

  // console.log(playlists);

  const userID = useSelector((state) => state.auth.id);
  const disptach = useDispatch();
  const handlePlaylist = (playlist) => {
    setShowAllPlaylists(!showAllPlaylists);
    setSelectedPlaylist(playlist);
  };

  const getAllPlaylists = async () => {
    const res = await axiosInstance.get(`/playlists/user/${userID}`);
    if (res.status === 200) {
      const playlists = res.data.data;
      disptach(UIactions.setPlaylists({ playlists }));
    }
  };
  const handleDeletePlaylist = async (id) => {
    const res = await axiosInstance.delete(`/playlists/${id}`);
    if (res.status == 200) {
      getAllPlaylists();
      // console.log(res);
    }
  };
  const PlayListCard = ({ videosCnt, playlistName, firstVideoImgUrl, playlist }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <div className="relative" onClick={() => handlePlaylist(playlist)}>
          {videosCnt > 0 ? (
            <img
              src={firstVideoImgUrl}
              className={`relative h-44 hover:cursor-pointer rounded-lg
                hover:shadow-lg hover:shadow-orange-300 aspect-video
                bg-red-300 transition-shadow duration-300`}
            />
          ) : (
            <div
              className={`relative h-44 hover:cursor-pointer rounded-lg
                hover:shadow-lg hover:shadow-orange-300 aspect-video
                bg-red-300 transition-shadow duration-300`}
            ></div>
          )}
          <span className="absolute bottom-2 right-2 text-white bg-zinc-800 font-semibold px-3 pb-1 text-center text-sm rounded-lg">
            {videosCnt} video{videosCnt > 1 || videosCnt === 0 ? "s" : ""}
          </span>
        </div>
        <div className="mt-2 flex justify-between">
          <h2 className="fontbold text-normal">{playlistName}</h2>

          <div>
            <Button onClick={handleMenu}>
              <MoreVert />
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)} // Only open when anchorEl is valid
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleDeletePlaylist(playlist._id)}>
                <Delete />
                Delete
              </MenuItem>
            </Menu>
          </div>
        </div>
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
          {playlists.map((p, idx) => (
            <PlayListCard
              key={idx}
              videosCnt={p.videos.length}
              playlistName={p.name}
              firstVideoImgUrl={p.videos.length > 0 ? p.videos[0].thumbnail : ""}
              playlist={p}
            />
          ))}
        </div>
      </div>
    );
  };

  const SinglePlaylist = ({
    firstVideoImgUrl,
    playlistName,
    playlistDescription,
    videosCnt,
    videos,
  }) => {
    return (
      <div className="flex flex-col gap-2  h-full">
        <div className="flex mt-2  gap-4 justify-start items-center">
          <Button onClick={() => setShowAllPlaylists(!showAllPlaylists)}>
            <ArrowBackIcon />
          </Button>
        </div>
        <div className="flex h-full gap-4  px-2 justify-center  ">
          <div className="h-[calc(100vh-200px)] flex flex-col justify-start items-center gap-2 pt-20  w-80   dark:bg-zinc-800 rounded-xl">
            {videosCnt > 0 ? (
              <img src={firstVideoImgUrl} className="h-40 aspect-video rounded-lg mb-10" />
            ) : (
              <div className="h-40 aspect-video rounded-lg mb-10 bg-gray-800"> </div>
            )}
            <h1 className="text-2xl font-bold dark:text-white">{playlistName}</h1>
            <h4 className="font-normal text-sm">{playlistDescription}</h4>
            <h4 className="font-sans text-sm">
              {videosCnt} video{videosCnt > 1 || videosCnt === 0 ? "s" : ""}
            </h4>
          </div>
          <div className="flex-1 p-4  h-[calc(100vh-200px)] overflow-auto  flex flex-col gap-3  ">
            {videosCnt > 0 ? (
              videos.map((v, idx) => (
                <div
                  className="flex gap-4 p-4 rounded-lg hover:cursor-pointer transition duration-150 hover:bg-gray-800 "
                  onClick={() => navigate(`/video/${v._id}`)}
                >
                  <div className="w-2  flex  justify-center items-center">{idx + 1}</div>
                  <img
                    src={v.thumbnail}
                    className="lg:w-36 aspect-video max-w-36 rounded-lg"
                    alt="vidoe sm image"
                  />
                  <div>
                    {" "}
                    <h4 className="font-semibold text-lg">{v.title} </h4>
                    <h5 className="font-normal text-sm ">
                      {" "}
                      Code with c++ . {v.views} Views . 3 days ago
                    </h5>
                  </div>
                </div>
              ))
            ) : (
              <div>No videos </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  // console.log(userID);

  useEffect(() => {
    if (userID) {
      getAllPlaylists();
    }
  }, [userID]);
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
        <SinglePlaylist
          firstVideoImgUrl={selectedPlaylist?.videos[0]?.thumbnail}
          playlistName={selectedPlaylist?.name}
          playlistDescription={selectedPlaylist?.description}
          videosCnt={selectedPlaylist?.videos.length}
          videos={selectedPlaylist?.videos}
        />
      )}
    </PageWrapper>
  );
}
