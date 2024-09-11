import {
  AccountBalanceRounded,
  AccountCircleOutlined,
  AccountCircleTwoTone,
} from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import Description from "./VideoDescription";

export default function VideoOutputComment() {
  return (
    <>
      <Box component="div" className="flex gap-4 mb-5">
        <Avatar>
          <AccountCircleOutlined />
        </Avatar>
        <Box component="div" className="flex flex-col justify-end">
          <Typography variant="subtitle1" component="p">
            Rahul Kumar
            <Typography
              variant="body2"
              component="span"
              className="text-gray-500 "
              sx={{ fontSize: "0.875rem", fontWeight: "normal", ml: 1 }}
            >
              10 months ago
            </Typography>
          </Typography>
          <Typography component="div" className="m-0">
            <Description
              text={`"Great video! I really appreciated the clear explanation and step-by-step approach.
                 It made the complex topic much easier to understand. Looking forward to more content like this
                 , keep up the awesome work!"`}
              showBorder={false}
            />
          </Typography>
        </Box>
      </Box>
    </>
  );
}
