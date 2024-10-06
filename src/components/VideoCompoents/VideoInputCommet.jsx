import { AccountCircleOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate, useParams } from "react-router";

export default function VideoInputCommet({ videoId }) {
  const [flag, setFlag] = useState(false);
  const darkMode = useSelector((state) => state.UI.darkMode);
  const { avatar, auth } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  // const { id } = useParams();
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const res = await axiosInstance.post(`/comments/${videoId}`, { content: comment });
    console.log(res);
    if (res.status == 200) {
      setComment("");
    }
  };

  return (
    <>
      <Box component="div" className="mb-4 sm:border-none   border-t-2-2 border border-t-black ">
        <Box
          component="form"
          className="w-full  flex p-2 gap-3 items-center justify-center dark:text-white"
        >
          <Avatar>{avatar ? <img src={avatar} /> : <AccountCircleOutlined />}</Avatar>
          <TextField
            placeholder="Add a comment.."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            name="user_comment"
            onClick={() => {
              if (!auth) {
                navigate("/login");
              }
              setFlag(true);
            }}
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
              type="button"
              disabled={comment == "" ? true : false}
              onClick={handleSubmitComment}
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
