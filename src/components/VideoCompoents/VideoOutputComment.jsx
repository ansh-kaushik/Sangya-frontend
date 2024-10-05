import {
  AccountBalanceRounded,
  AccountCircleOutlined,
  AccountCircleTwoTone,
} from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import Description from "./VideoDescription";
import { timeAgo } from "../../services/utils";

export default function VideoOutputComment({ username, datePosted, content, avatar }) {
  return (
    <>
      <Box component="div" className="flex gap-4 mb-5">
        <Avatar>{avatar ? <img src={avatar} /> : <AccountCircleOutlined />}</Avatar>
        <Box component="div" className="flex flex-col justify-end">
          <Typography variant="subtitle1" component="p" sx={{ fontWeight: "bold" }}>
            {username}
            <Typography
              variant="body2"
              component="span"
              className="text-gray-500 "
              sx={{ fontSize: "0.875rem", fontWeight: "normal", ml: 1 }}
            >
              {timeAgo(datePosted)}
            </Typography>
          </Typography>
          <Typography component="div" className="m-0">
            <Description text={content} showBorder={false} />
          </Typography>
        </Box>
      </Box>
    </>
  );
}
