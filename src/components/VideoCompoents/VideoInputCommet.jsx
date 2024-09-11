import { AccountCircleOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

export default function VideoInputCommet() {
  const [flag, setFlag] = useState(false);
  const [comment, setComment] = useState("");
  const handleSubmitComment = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Box component="div" className="mb-4">
        <Box component="form" className="w-full  flex p-4 gap-3 items-center justify-center">
          <Avatar>
            <AccountCircleOutlined />
          </Avatar>
          <TextField
            placeholder="Add a comment.."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            name="user_comment"
            onClick={() => setFlag(true)}
            className="w-full"
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
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={comment == "" ? true : false}
              onSubmit={handleSubmitComment}
              variant="contained"
            >
              Comment
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}
