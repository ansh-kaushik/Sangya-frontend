import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const VideoCard = ({ thumbnail, title, channel, views, channelImage, uploadTime }) => {
  return (
    <div className="max-w-xs m-4  ">
      <img
        height="180"
        src={thumbnail}
        alt={title}
        className="rounded-xl hover:cursor-pointer hover:rounded-none hover:shadow-2xl transition-all duration-300"
      />
      <div className="p-4 flex justify-between">
        <div className="flex justify-center items-center">
          <img src={channelImage} className="h-8 w-8   rounded-full" alt="channel image" />
        </div>
        <div className="flex-1 pl-2">
          <Typography variant="h7" className="font-semibold text-gray-800">
            {title}
          </Typography>
          <Typography
            variant="body2"
            className="text-gray-600 hover:text-gray-950 hover:cursor-pointer"
          >
            {channel}
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            {views} views | {uploadTime}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
