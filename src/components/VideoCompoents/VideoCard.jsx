import React from "react";
import { Card, CardContent, CardMedia, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { videoActions } from "../../store";
import { timeAgo } from "../../services/utils";

const VideoCard = ({
  id,
  thumbnail,
  title,
  channel,
  views,
  channelImage,
  uploadTime,
  sidebar,
  url,
  description,
  channelID,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleVideoPage = ({ title, url, channelImage, channel, views, description }) => {
    dispatch(
      videoActions.setVideoDetails({
        title,
        url,
        channelImage,
        channel,
        views,
        description,
        channelID,
      })
    );
    navigate(`/video/${id}`);
  };
  return (
    <div
      className={`w-full aspect-video  md:w-1/4 lg:w-1/5 ${sidebar ? "flex   items-center my-0 mx-2" : "m-4"} `}
    >
      <img
        src={thumbnail}
        alt={title}
        className={`rounded-xl hover:cursor-pointer hover:rounded-lg  transition-all duration-300 aspect-video dark:hover:shadow-lg dark:hover:shadow-orange-300 `}
        onClick={() => handleVideoPage({ title, url, channelImage, channel, views, description })}
        // style={{ objectFit: "cover" }}
      />
      <div className={`flex justify-start  gap-2 ${sidebar ? "px-2 py-3" : "p-4"}`}>
        {/* <div className={` flex justify-start  gap-2   ${sidebar ? "" : ""}`}> */}
        <div className="min-w-fit">
          {/* div for channel logo */}
          {!sidebar && (
            <div className="">
              <img src={channelImage} className="h-8  rounded-full" alt="channel image" />
            </div>
          )}
        </div>
        {/* sd */}
        {/* sd */}
        <div>
          {/* div for channel title , name and view */}
          <Link
            underline="none"
            className="hover:cursor-pointer   "
            onClick={() =>
              handleVideoPage({ title, url, channelImage, channel, views, description })
            }
          >
            <h4 className="font-semibold dark:text-white mb-1 text-black  ">{title}</h4>
          </Link>
          <h5
            className={`text-sm font-normal text-gray-600 hover:text-gray-950 dark:text-white dark:hover:text-blue-200
                 hover:cursor-pointer  `}
          >
            {channel}
          </h5>
          <h5 className="text-gray-500 text-sm dark:text-white">
            {views} views | {timeAgo(uploadTime)}
          </h5>
          {/* </div> */}
          {/*  */}
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
