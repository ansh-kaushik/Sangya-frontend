import React, { useEffect, useState } from "react";
import PageWrapper from "./PageWrapper";
import { Box, Button, Container, Paper, styled, TextField } from "@mui/material";
import { CloudUpload, Label } from "@mui/icons-material";
import axios from "axios";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UploadVideo() {
  const [videoFileName, setVideoFileName] = useState("video-file");
  const [thumbnail, setThumbnail] = useState();
  const [thumbnailImage, setThumbnailImage] = useState();
  const [videoFile, setVideoFile] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleUploadVideo = (e) => {
    e.preventDefault();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnail);
    const res = axios.post(`${BASE_URL}/videos`, formData, { withCredentials: true });
    // console.log(res);
  };

  return (
    <PageWrapper>
      <Container maxWidth="lg">
        <Box component="div" className="flex  flex-wrap gap-4">
          <Box component="form" className="prose">
            <h1 className="dark:text-white">Upload Video</h1>

            <TextField
              sx={{ mb: 2 }}
              fullWidth
              label="Title"
              placeholder="Title"
              required
              type="text"
              defaultValue={title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></TextField>
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              label="Description"
              placeholder="Video Description"
              required
              type="text"
              multiline
              defaultValue={description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            ></TextField>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUpload />}
              sx={{ m: 2 }}
            >
              Thumbnail
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    setThumbnail(event.target.files[0]);
                    const imgSrc = URL.createObjectURL(file);
                    setThumbnailImage(imgSrc);
                  }
                }}
                single
              />
            </Button>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUpload />}
              sx={{ m: 2 }}
            >
              Video File
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => setVideoFile(event.target.files[0])}
                single
              />
            </Button>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              //   startIcon={<CloudUpload />}
              sx={{ m: 2 }}
              onClick={handleUploadVideo}
              color="secondary"
              disabled={!(videoFile && thumbnail)}
            >
              Upload
            </Button>
          </Box>
          <Box className="prose ">
            <h4 className="py-2 dark:text-white">Thumbnail : {thumbnail && thumbnail.name}</h4>
            {!thumbnailImage ? (
              <div className="h-60 aspect-video bg-slate-200"></div>
            ) : (
              <div className="h-60 aspect-video bg-slate-400 flex  justify-center items-center">
                <img src={thumbnailImage} className="h-60 aspect-auto" alt="thumbnail image" />
              </div>
            )}

            <h4 className="dark:text-white">Video File: {videoFile && videoFile.name}</h4>
          </Box>
        </Box>
      </Container>
    </PageWrapper>
  );
}
