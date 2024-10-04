import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Link,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox,
  Slide,
  Grow,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ShareIcon from "@mui/icons-material/Share";
import { Add, Close, TurnedInNot } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../services/axiosInstance";
import { UIactions } from "../../store";
import axios from "axios";

export default function VideoControlPanel({
  channelName,
  videoTitle,
  videoId,
  subsCnt,
  channelID,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { playlists, subscriptions } = useSelector((state) => state.UI);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const userID = useSelector((state) => state.auth.id);
  console.log(subscriptions);

  const isSub = subscriptions.some((sub) => sub.channel?._id === channelID);
  const dispatch = useDispatch();
  let checkedPlaylists = playlists.filter((playlist) =>
    playlist.videos.some((video) => video._id === videoId)
  );

  checkedPlaylists = checkedPlaylists.map((p) => p._id);
  // Function to open the dialog
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  function SlideTransition(props) {
    return <Grow direction="up" {...props} />;
  }
  // Function to close the dialog
  const handleClose = () => {
    setOpenDialog(false);
    setAddMenuOpen(false);
  };
  const getAllPlaylists = async () => {
    const res = await axiosInstance.get(`/playlists/user/${userID}`);
    if (res.status === 200) {
      const playlists = res.data.data;
      dispatch(UIactions.setPlaylists({ playlists }));
    }
  };
  const handleAddPlaylist = async (e) => {
    e.preventDefault();
    console.log(e.currentTarget);

    const data = new FormData(e.currentTarget);
    const name = data.get("title");
    const description = data.get("description");
    const res = await axiosInstance.post("/playlists", { name, description });
    if (res.status === 201) {
      const playlistId = res.data.data._id;
      const res1 = await axiosInstance.post(`/playlists/${playlistId}/videos`, {
        videoId: videoId,
      });
      getAllPlaylists();
      setSnackbarMessage(`Added to ${name}`);
      setSnackbarOpen(true);
      handleClose();
    }
  };
  const handleCheckboxChange = async (playlistId, checked, playlistName) => {
    // console.log(playlistId);

    if (checked) {
      const res = await axiosInstance.post(`/playlists/${playlistId}/videos`, { videoId: videoId });
      getAllPlaylists();
      setSnackbarMessage(`Added to ${playlistName}`);
    } else {
      const res = await axiosInstance.delete(`/playlists/${playlistId}/videos/${videoId}`, {
        videoId: videoId,
      });
      getAllPlaylists();
      setSnackbarMessage(`Removed from ${playlistName}`);
    }
    setSnackbarOpen((prev) => true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubscribe = async () => {
    const res = await axiosInstance.post(`/subscriptions/${channelID}`);
    console.log(res.data);
    const res1 = await axiosInstance.get(`/subscriptions/c/${userID}`);
    dispatch(UIactions.setSubscriptions({ subscriptions: res1.data.data.channels }));
  };
  useEffect(() => {
    if (userID) {
      getAllPlaylists();
    }
    // console.log(che);
  }, [userID]);
  return (
    <div className="mt-2">
      <div className="mb-2">
        <h2 className="text-2xl dark:text-white font-semibold text-gray-900 leading-tight line-clamp-2">
          {videoTitle}
        </h2>
      </div>
      <div className="flex justify-start sm:justify-between w-full sm:w-auto flex-wrap gap-y-4  mb-2">
        <div className="flex gap-3 w-full sm:w-auto sm:justify-center justify-between items-center">
          <div className="  flex items-center justify-center gap-2">
            <AccountCircleIcon fontSize="large" />
            <Link
              underline="none"
              className="hover:cursor-pointer flex gap-2 justify-center items-center sm:block "
            >
              <Typography
                variant="h7"
                className="font-semibold text-gray-800 dark:text-white text-lg"
              >
                {channelName ? channelName : "Sangya"}
              </Typography>
              <Typography variant="body2" className="text-gray-600 dark:text-white sm:flex gap-1">
                {subsCnt} <span className="hidden sm:block">subscribers</span>
              </Typography>
            </Link>
          </div>
          <button
            onClick={handleSubscribe}
            type="button"
            className={`border rounded-full ${
              isSub
                ? "bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800"
                : "bg-red-600 hover:bg-red-400 dark:bg-red-600"
            }
             text-black dark:text-white  px-4 py-1  transition-all duration-300`}
          >
            {isSub ? "Subscribed" : "Subscribe"}
          </button>
        </div>
        <div className="flex sm:gap-2 gap-4  ml-2 items-center">
          <button
            type="button"
            className="text-black dark:text-white hover:text-blue-600 transition-all duration-300"
          >
            <ThumbUpAltIcon />
          </button>
          <button
            type="button"
            className="text-black dark:text-white hover:text-red-600 transition-all duration-300"
          >
            <ThumbDownAltIcon />
          </button>
          {/* Save button that opens the dialog */}
          <button
            type="button"
            className="text-black dark:text-white bg-gray-200 dark:bg-zinc-800 px-3 dark:hover:bg-zinc-700 rounded-full py-1 hover:text-green-600 transition-all duration-300"
            onClick={handleClickOpen}
          >
            <TurnedInNot sx={{ mr: 1 }} />
            Save
          </button>
          <button
            type="button"
            className="text-black dark:text-white hover:text-green-600 transition-all duration-300"
          >
            <div className="dark:bg-zinc-800 bg-gray-200  rounded-full px-4 py-1">
              <span className="text-base">Share</span>
              <ShareIcon />
            </div>
          </button>
        </div>
      </div>

      {/* Dialog Component */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          Save to ...
          <Button onClick={handleClose} color="primary">
            <Close />
          </Button>
        </DialogTitle>
        <DialogContent>
          {/* <Typography>Do you want to save this video to your playlist?</Typography> */}
          <div className="flex flex-col gap-1 ">
            {playlists.map((playlist, idx) => (
              <FormControlLabel
                key={idx}
                control={
                  <Checkbox
                    checked={checkedPlaylists.includes(playlist._id)}
                    onChange={(e, checked) =>
                      handleCheckboxChange(playlist._id, checked, playlist.name)
                    }
                    color="primary"
                  />
                }
                label={playlist.name}
              />
            ))}
            {addMenuOpen && (
              <Box
                component="form"
                className="flex items-end flex-col gap-3 w-max"
                onSubmit={handleAddPlaylist}
              >
                <TextField type="text " label="Title" name="title" />
                <TextField type="text" label="Description" name="description" />
                <Button type="submit">Create</Button>
              </Box>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          {!addMenuOpen && (
            <Button onClick={() => setAddMenuOpen(true)} color="primary">
              <Add /> Create new playlist
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Snackbar Component */}
      <Snackbar
        open={snackbarOpen}
        TransitionComponent={SlideTransition}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
