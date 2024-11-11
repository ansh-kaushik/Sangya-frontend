import React from "react";
import { Card, CardContent, CardMedia, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { videoActions } from "../../store";
import { timeAgo } from "../../services/utils";

const LiveVideoCard = ({
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
    navigate(`/live/${id}`);
  };

  return (
    <div
      className={`   ${sidebar ? "flex   items-center my-0 mx-2 w-full" : "m-4 md:w-1/4 lg:w-1/5"} `}
    >
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className={`rounded-xl hover:cursor-pointer hover:rounded-lg  ${sidebar ? "w-1/4 rounded-none" : "w-full"}  
          transition-all duration-300 aspect-video dark:hover:shadow-lg dark:hover:shadow-orange-300 `}
          onClick={() => handleVideoPage({ title, url, channelImage, channel, views, description })}
          // style={{ objectFit: "cover" }}
        />
        <span className="absolute bottom-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          LIVE
        </span>
      </div>
      <div className={`flex justify-start  gap-2 ${sidebar ? "px-2 py-3" : "p-4"}`}>
        <div className="min-w-fit">
          {!sidebar && (
            <div className="">
              <img
                src={channelImage}
                className="h-8 md:h-10  rounded-full aspect-square"
                alt="channel image"
              />
            </div>
          )}
        </div>
        <div>
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
        </div>
      </div>
    </div>
  );
};

export default LiveVideoCard;
