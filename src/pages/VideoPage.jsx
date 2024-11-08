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
import { useParams } from "react-router";
import axiosInstance from "../services/axiosInstance";
import { videoActions } from "../store";
import { AccountCircleRounded, Close, CloseSharp } from "@mui/icons-material";
import { timeAgo } from "../services/utils";

const videoDetails = {
  thumbnail: "./src/assets/thumbnail 1.jpg",
  title: "C++ Tutorial for Beginners 2024",
  views: 200,
  channel: "Code In C++",
  channelImage: "./src/assets/channel_icon.png",
  uploadTime: "7 days ago",
};

const MobileCommentSection = ({ commentSectionOpen, setCommentSectionOpen, comments, videoId }) => {
  return (
    <>
      {commentSectionOpen ? (
        <div
          className={`pt-4 absolute w-full left-0 bottom-safe 
                   dark:bg-zinc-800  bg-gray-200  sm:bg-inherit rounded-xl
                    hover:cursor-pointer min-h-fit max-h-[70%] flex flex-col justify-end 
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
              {!commentSectionOpen && (
                <span className="text-sm text-slate-500"> {comments.length}</span>
              )}
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
            {comments.map((com, idx) => (
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
          <VideoInputComment videoId={videoId} />
        </div>
      ) : (
        <div
          onClick={() => setCommentSectionOpen(true)}
          className=" hover:cursor-pointer bg-gray-200 dark:bg-zinc-800 rounded-xl p-3"
        >
          <h5 className="mb-2">
            Comments{" "}
            <span className="text-blue-700 dark:text-blue-400 text-xs">{comments.length}</span>
          </h5>
          {/* top comment */}
          <div className="flex gap-2 items-center ">
            {/* <h6>Rahul Kumar</h6> */}
            {comments.length > 0 && comments[0].owner[0].avatar ? (
              <img src={comments[0].owner[0].avatar} className="w-7  rounded-full" />
            ) : (
              <div className=" w-full p-2 text-sm bg-gray-300">Add a comment</div>
            )}
            <p className="text-sm">{comments.length > 0 && comments[0].content}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default function VideoPage() {
  const { title, url, channel, channelImage, description, channelID, uploadedAt } = useSelector(
    (state) => state.video
  );
  const commentRef = useRef(null);

  // console.log(timeAgo(uploadedAt));

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const [subsCnt, setSubsCnt] = useState(0);
  const [videoComments, setVideoComments] = useState([]);
  const [commentSectionOpen, setCommentSectionOpen] = useState(false);
  const { id } = useParams();
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
          channelImage: data.owner?.avatar,
          channel: data.owner?.username,
          channelID: data.owner?._id,
        })
      );
    }
    const data = res.data;
  };

  // const handleClick = () => {
  //   const safeAreaInsetBottom = getComputedStyle(commentRef.current).paddingBottom;

  //   // console.log("Safe Area Inset Bottom:", safeAreaInsetBottom);
  //   // alert("Safe Area Inset Bottom:", safeAreaInsetBottom);
  // };

  useEffect(() => {
    if (channelID) {
      getChannelSubs();
      addToWatchHistory();
    }
  }, [channelID]);
  useEffect(() => {
    getVideoByID();
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
              <Description uploadTime={uploadedAt} text={description ? description : ""} />
            </div>
            {/* Comment input and comments */}
            {windowWidth < 640 ? (
              <MobileCommentSection
                videoId={id}
                comments={videoComments}
                commentSectionOpen={commentSectionOpen}
                setCommentSectionOpen={setCommentSectionOpen}
              />
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
