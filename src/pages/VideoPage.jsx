import React, { useEffect, useRef, useState } from "react";
import PageWrapper from "./PageWrapper";
import { Container, IconButton, Typography } from "@mui/material";
import VideoControlPanel from "../components/VideoCompoents/VideoControlPanel";
import Description from "../components/VideoCompoents/VideoDescription";
import VideoInputComment from "../components/VideoCompoents/VideoInputCommet";
import VideoOutputComment from "../components/VideoCompoents/VideoOutputComment";
import VideoCard from "../components/VideoCompoents/VideoCard";
import VideoPlayer from "../components/VideoCompoents/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { videoActions } from "../store";
import { AccountCircleRounded, Close, CloseSharp } from "@mui/icons-material";

const videoDetails = {
  thumbnail: "./src/assets/thumbnail 1.jpg",
  title: "C++ Tutorial for Beginners 2024",
  views: 200,
  channel: "Code In C++",
  channelImage: "./src/assets/channel_icon.png",
  uploadTime: "7 days ago",
};

const MobileCommentSection = ({ commentSectionOpen, setCommentSectionOpen }) => {
  return (
    <>
      {commentSectionOpen ? (
        <div
          className={`pt-4 absolute w-full left-0 bottom-safe 
                   dark:bg-zinc-800  bg-gray-200  sm:bg-inherit rounded-xl
                    hover:cursor-pointer h-[70%] flex flex-col justify-end 
                   `}
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex justify-between p-2  ">
            <Typography
              component={commentSectionOpen ? "h6" : "p"}
              variant={commentSectionOpen ? "h6" : "p"}
              className="px-4"
            >
              Comments
              {!commentSectionOpen && <span className="text-sm text-slate-500"> 131</span>}
            </Typography>
            <IconButton
              onClick={() => {
                setCommentSectionOpen(false);
                // handleClick();
              }}
            >
              <CloseSharp />
            </IconButton>
          </div>

          <ul className=" overflow-auto px-3">
            {Array.from({ length: 10 }, (_, idx) => (
              <li key={idx}>
                <VideoOutputComment key={idx} />
              </li>
            ))}
          </ul>
          <VideoInputComment />
        </div>
      ) : (
        <div
          onClick={() => setCommentSectionOpen(true)}
          className=" hover:cursor-pointer bg-gray-200 dark:bg-zinc-800 rounded-xl p-3"
        >
          <h5 className="mb-2">
            Comments <span className="text-blue-700 dark:text-blue-400 text-xs">1.5K</span>
          </h5>
          {/* top comment */}
          <div className="flex gap-1 items-center ">
            {/* <h6>Rahul Kumar</h6> */}
            <AccountCircleRounded />
            <p className="text-sm">This song is awesome! I loved it.</p>
          </div>
        </div>
      )}
    </>
  );
};
export default function VideoPage() {
  const { title, url, channel, channelImage, description, channelID } = useSelector(
    (state) => state.video
  );
  const commentRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();
  const [subsCnt, setSubsCnt] = useState(0);
  const [commentSectionOpen, setCommentSectionOpen] = useState(false);
  const { id } = useParams();
  const getChannelSubs = async () => {
    const res = await axiosInstance.get(`/subscriptions/s/${channelID}`);
    const subs = res.data.data.subscribers;
    // console.log(subs, "🤣🤣🤣");
    setSubsCnt(subs.length);
  };
  const getVideoByID = async () => {
    const res = await axiosInstance.get(`/videos/${id}`);
    // console.log(res.data.data.owner.avatar);
    if (res.status === 200) {
      const data = res.data.data;
      dispatch(
        videoActions.setVideoDetails({
          title: data.title,
          description: data.description,
          url: data.videoFile,
          channelImage: data.owner?.avatar,
          channel: data.owner?.username,
          channelID: data.owner?._id,
        })
      );
    }
    const data = res.data;
  };

  const handleClick = () => {
    const safeAreaInsetBottom = getComputedStyle(commentRef.current).paddingBottom;

    console.log("Safe Area Inset Bottom:", safeAreaInsetBottom);
    alert("Safe Area Inset Bottom:", safeAreaInsetBottom);
  };

  useEffect(() => {
    if (channelID) {
      getChannelSubs();
    }
  }, [channelID]);
  useEffect(() => {
    getVideoByID();
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

  return (
    <PageWrapper>
      {/* Container for the main content */}
      <div className="px-auto px-4 pt-4">
        <div className="flex  flex-col lg:flex-row ">
          {/* Main content area */}
          <div className="  relaitve w-full lg:min-w-[70%] flex lg:flex-row flex-col  flex-wrap">
            {/* Video player */}
            <div className="w-full  aspect-[16/9] flex">
              <div className=" aspect-[16/9]  flex">
                <VideoPlayer title={title} url={url} />
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
              <Description text={description ? description : "46K Views 11 months ago"} />
            </div>
            {/* Comment input and comments */}
            {windowWidth < 640 ? (
              <MobileCommentSection
                commentSectionOpen={commentSectionOpen}
                setCommentSectionOpen={setCommentSectionOpen}
              />
            ) : (
              <div className=" p-4 w-full  ">
                <Typography component="h1" variant="h5">
                  131 Comments
                </Typography>
                <VideoInputComment />
                <ul>
                  {Array.from({ length: 40 }, (_, idx) => (
                    <li key={idx}>
                      <VideoOutputComment key={idx} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar for video suggestions */}
          <div className="bg-white-500 flex flex-col flex-wrap  gap-4">
            {Array.from({ length: 5 }, (_, idx) => (
              <VideoCard
                key={idx}
                sidebar={true}
                channelImage={videoDetails.channelImage}
                thumbnail={"../src/assets/thumbnail 1.jpg"}
                title={videoDetails.title}
                views={videoDetails.views}
                channel={videoDetails.channel}
                uploadTime={videoDetails.uploadTime}
              />
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
