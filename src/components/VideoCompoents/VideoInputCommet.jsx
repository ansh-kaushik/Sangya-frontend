import { AccountCircleOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function VideoInputCommet() {
  const [flag, setFlag] = useState(false);
  const darkMode = useSelector((state) => state.UI.darkMode);
  const [comment, setComment] = useState("");
  const handleSubmitComment = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Box component="div" className="mb-4 sm:border-none   border-t-2-2 border border-t-black ">
        <Box
          component="form"
          className="w-full  flex p-2 gap-3 items-center justify-center dark:text-white"
        >
          <Avatar>
            <AccountCircleOutlined />
          </Avatar>
          <TextField
            placeholder="Add a comment.."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            name="user_comment"
            onClick={() => setFlag(true)}
            className="w-full dark:text-white "
            id="standard-basic"
            variant="standard"
          />
        </Box>
        {flag && (
          <Box component="div" className="flex gap-3 justify-end ">
            <Button
              type="button"
              onClick={() => {
                setFlag(false);
                setComment("");
              }}
              className="dark:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={comment == "" ? true : false}
              onSubmit={handleSubmitComment}
              variant="contained"
              sx={{
                "&.Mui-disabled": {
                  color: "gray", // Color when disabled
                  backgroundColor: "rgba(255, 255, 255, 0.12)", // Custom background when disabled
                },
              }}
              className="dark:text-white "
            >
              Comment
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}
