import React, { useEffect, useRef, useState } from "react";
import PageWrapper from "./PageWrapper";
import { Button, Container, IconButton, Typography } from "@mui/material";
import VideoControlPanel from "../components/VideoCompoents/VideoControlPanel";
import Description from "../components/VideoCompoents/VideoDescription";
import VideoInputComment from "../components/VideoCompoents/VideoInputCommet";
import VideoOutputComment from "../components/VideoCompoents/VideoOutputComment";
import VideoCard from "../components/VideoCompoents/VideoCard";
import VideoPlayer from "../components/VideoCompoents/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import axiosInstance from "../services/axiosInstance";
import { UIactions, videoActions } from "../store";
import { AccountCircleRounded, Close, CloseSharp } from "@mui/icons-material";
import { timeAgo } from "../services/utils";
import LiveChat from "../components/VideoCompoents/LiveChat";
import * as mediasoupClient from "mediasoup-client";

const videoDetails = {
  thumbnail: "./src/assets/thumbnail 1.jpg",
  title: "C++ Tutorial for Beginners 2024",
  views: 200,
  channel: "Code In C++",
  channelImage: "./src/assets/channel_icon.png",
  uploadTime: "7 days ago",
};

export default function LiveVideoPage() {
  const { title, url, channel, channelImage, description, channelID, uploadedAt, views } =
    useSelector((state) => state.video);
  const commentRef = useRef(null);
  const dispatch = useDispatch();
  // console.log(views);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  let device = useRef(null); // Use useRef to persist the device object across renders
  let y = useRef(null);
  let x;
  let consumerTransport;
  let consumer;
  const [subsCnt, setSubsCnt] = useState(0);
  const [videoComments, setVideoComments] = useState([]);
  const [commentSectionOpen, setCommentSectionOpen] = useState(false);
  const { id } = useParams();
  const { sidebarVideos } = useSelector((state) => state.UI);
  const videoRef = useRef(null); // Reference to the video element
  // console.log(homePageVideos);

  //  **************************************************

  // *******************************************

  const addToWatchHistory = async () => {
    try {
      const res = await axiosInstance.post(`/watchHistory/add`, {
        videoId: id,
      });
    } catch (er) {
      console.log(er);
    }
  };
  const getChannelSubs = async () => {
    const res = await axiosInstance.get(`/subscriptions/s/${channelID}`);
    const subs = res.data.data.subscribers;

    setSubsCnt(subs.length);
  };
  const getVideoComments = async () => {
    const res = await axiosInstance.get(`/comments/${id}`);
    if (res.status == 200) {
      setVideoComments(res.data.data.comments);
    }
    // console.log(res.data.data);
  };
  const getVideoByID = async () => {
    const res = await axiosInstance.get(`/videos/${id}`);
    // console.log(res.data.data.owner.avatar);
    if (res.status === 200) {
      const data = res.data.data;
      // console.log(data);

      dispatch(
        videoActions.setVideoDetails({
          title: data.title,
          uploadedAt: data.createdAt,
          description: data.description,
          url: data.videoFile,
          views: data.views,
          channelImage: data.owner?.avatar,
          channel: data.owner?.username,
          channelID: data.owner?._id,
        })
      );
    }
    const data = res.data;
  };

  const addView = async () => {
    try {
      const res = await axiosInstance.patch(`/videos/addView/${id}`);
      // console.log("🤣🤣".res);
    } catch (er) {
      console.log(er);
    }
  };

  const getSidebarVideos = async () => {
    const res = await axiosInstance.get(`/videos`);
    let videos = res.data.videos;
    // console.log(videos);
    videos = videos.map((video) => ({
      id: video._id,
      thumbnail: video.thumbnail,
      title: video.title,
      views: video.views,
      url: video.videoFile,
      description: video.description,
      channel: video.owner?.username || "Sangya",
      channelID: video.owner?._id || "undefined",
      channelImage: video.owner?.avatar || "./src/assets/channel_icon.png",
      uploadTime: video.createdAt,
    }));
    videos = videos.filter((v) => v.id !== id);
    // console.log(videos);

    // console.log(Array.isArray(videos));

    dispatch(UIactions.setSideBarVideos({ sidebarVideos: videos }));
  };

  const initMediasoupDevice = async () => {
    try {
      // Step 1: Fetch RTP Capabilities from the server
      const res = await axiosInstance.get("stream/connect");

      // Step 2: Create a Mediasoup Device and load it with RTP capabilities
      device.current = new mediasoupClient.Device();
      console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
      console.log("💥💥", res.data.rtpCapabilities);
      y.current = res.data.rtpCapabilities;
      await device.current.load({ routerRtpCapabilities: y.current });
      console.log(device.current.rtpCapabilities);
      // console.log(device.current);
      // console.log("Mediasoup device initialized and loaded with RTP capabilities");
    } catch (error) {
      console.error("Error initializing Mediasoup device:", error);
    }
  };

  const createConsumerTransport = async () => {
    try {
      // Step 1: Request consumer transport options from the server
      const { data } = await axiosInstance.post("/stream/createConsumerTransport");

      if (!device.current || !device.current.loaded) {
        console.error("Device is not loaded");
        return;
      }

      console.log(device.current);

      // Step 2: Create a WebRTC transport on the client for consuming
      consumerTransport = device.current.createRecvTransport(data);
      x = data.dtlsParameters;
      console.log("✅✅", consumerTransport);

      // Step 3: Handle the transport's connection process
      consumerTransport.on("connect", async ({ dtlsParameters }, callback, errback) => {
        try {
          // Step 4: Send DTLS parameters to the server to complete transport connection

          x = dtlsParameters;
          const res1 = await axiosInstance.post("/stream/connectConsumerTransport", {
            transportId: consumerTransport.id,
            dtlsParameters,
          });
          // console.log("1️⃣1️⃣", res1.data);
          callback();
        } catch (error) {
          console.error("Error connecting consumer transport:", error);
          errback(error);
        }
      });

      console.log("Consumer transport created and connected");
    } catch (error) {
      console.error("Error creating consumer transport:", error);
    }
  };

  const consumeStream = async () => {
    try {
      // Step 1: Request to create a consumer on the server with client RTP capabilities
      if (!consumerTransport) {
        console.error("Consumer transport is not initialized");
        return;
      }

      if (!device.current || !device.current.loaded) {
        console.error("Device is not loaded");
        return;
      }

      console.log(y.current);

      const { data } = await axiosInstance.post("/stream/consume", {
        transportId: consumerTransport.id, // The transport created in Step 2
        rtpCapabilities: y.current,
      });
      console.log("✅✅✅", data);

      const consumerParams = data;
      if (consumerParams.error) {
        console.error("Error creating consumer:", consumerParams.error);
        return;
      }

      // Step 2: Create the consumer on the client with the received parameters
      consumer = await consumerTransport.consume({
        id: consumerParams.consumerId,
        producerId: consumerParams.producerId,
        kind: consumerParams.kind,
        rtpParameters: consumerParams.rtpParameters,
      });

      // Step 3: Attach the consumer's track to a video element to start playback
      const { track } = consumer;
      console.log("🤣🤣🤣", track);

      const videoElement = document.getElementById("video"); // Add a <video> element with this ID to your HTML
      if (videoRef.current) {
        videoRef.current.srcObject = new MediaStream([track]);
        // videoElement.play();
      }
      // videoElement.srcObject = new MediaStream([track]);

      console.log("Consumer created and media playing");
    } catch (error) {
      console.error("Error consuming stream:", error);
    }
  };
  const handleViewStream = async () => {
    consumeStream();
  };

  useEffect(() => {
    getSidebarVideos();
  }, [id]);
  useEffect(() => {
    if (channelID) {
      getChannelSubs();
      addToWatchHistory();
    }
  }, [channelID]);
  useEffect(() => {
    getVideoByID();
    addView();
    getVideoComments();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const hh = () => {
    if (device.current && device.current.loaded) {
      console.log(device.current.rtpCapabilities);
    } else {
      console.error("Device is not loaded");
    }
  };
  useEffect(() => {
    initMediasoupDevice();
    // console.log(device.current);

    // createConsumerTransport();
    // consumeStream();
  }, []);
  return (
    <PageWrapper>
      {/* Container for the main content */}
      <div className="px-auto px-4 pt-4">
        <div className="flex  flex-col lg:flex-row ">
          {/* Main content area */}
          <div className="  relaitve w-full lg:min-w-[70%] flex lg:flex-row flex-col  flex-wrap">
            {/* Video player */}
            <div className="w-full  aspect-[16/9] flex">
              <div className=" aspect-[16/9]   flex">
                {/* <VideoPlayer title={title} url={url} /> */}
                <Button onClick={handleViewStream}>start viewing </Button>
                <Button onClick={createConsumerTransport}>Create transpport </Button>
                <Button onClick={hh}>check </Button>
                <video id="video" ref={videoRef} controls />
              </div>
            </div>
            {/* Video control panel */}
            <div className="w-full  ">
              <VideoControlPanel
                subsCnt={subsCnt}
                videoId={id}
                videoTitle={title}
                channelImage={channelImage}
                channelName={channel}
                channelID={channelID}
              />
            </div>
            {/* Video description */}
            <div className="w-full mb-2 ">
              <Description
                uploadTime={uploadedAt}
                views={views}
                text={description ? description : ""}
              />
              {/* <video id="video" autoPlay /> */}
            </div>
            {/* Comment input and comments */}
            {windowWidth < 640 ? (
              <LiveChat videoId={id} />
            ) : (
              <div className=" p-4 w-full  ">
                <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
                  {videoComments.length} {`Comment${videoComments.length > 1 ? "s" : ""}`}
                </Typography>

                <VideoInputComment videoId={id} />
                <ul>
                  {videoComments.map((com, idx) => (
                    <li key={idx}>
                      <VideoOutputComment
                        key={idx}
                        username={com.owner[0].username}
                        datePosted={com.createdAt}
                        avatar={com.owner[0].avatar}
                        content={com.content}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar for video suggestions */}
          <div className="bg-white-500 flex flex-col flex-wrap  gap-4">
            {sidebarVideos &&
              sidebarVideos.map((video, idx) => (
                <VideoCard
                  id={video.id}
                  key={idx}
                  sidebar={true}
                  url={video.url}
                  channelImage={video.channelImage}
                  thumbnail={video.thumbnail}
                  title={video.title}
                  views={video.views}
                  channel={video.username}
                  description={video.description}
                  uploadTime={video.uploadTime}
                />
              ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
