import React, { useEffect, useState } from "react";
import PageWrapper from "./PageWrapper";
import VideoCard from "../components/VideoCompoents/VideoCard";
import { useSelector } from "react-redux";
// import axios from "axios";
import axiosInstance from "../services/axiosInstance";

const videoDetails = {
  thumbnail: "./src/assets/thumbnail 1.jpg",
  title: "C++ Tutorial for Beginners 2024",
  views: 200,
  channel: "Code In C++",
  channelImage: "./src/assets/channel_icon.png",
  uploadTime: "7 days ago",
};

export default function Subscriptions() {
  const subs = useSelector((state) => state.UI.subscriptions);
  const [subsVideos, setSubsVideos] = useState([]);
  // console.log(subs);

  const getSubsVideos = async () => {
    const res = await axiosInstance.get("/videos/subsVideos");
    // console.log(res.data);

    setSubsVideos(res.data.videos);
  };

  useEffect(() => {
    getSubsVideos();
  }, [subs]);
  // console.log(subsVideos[0].createdAt);

  return (
    <PageWrapper>
      <div className="flex flex-col md:flex-row w-full">
        {/* Sidebar with fixed width */}
        <div className="w-auto p-3 bg-gray-200 dark:bg-zinc-800">
          <h2 className="text-xl font-semibold md:mb-4">Subscriptions</h2>
          <ul className="  flex gap-3 md:overflow-y-auto md:flex-col md:overflow-x-clip overflow-x-auto md:max-w-56 md:min-w-48">
            {subs.map((sub, idx) => (
              <li
                key={idx}
                className=" dark:hover:bg-gray-500 hover:bg-gray-200 rounded cursor-pointer  flex   gap-4 items-center justify-start"
              >
                <img className="h-10 w-10 rounded-full" src={sub.channel.avatar} />
                <span className="hidden sm:block">{sub.channel.username}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-4 relative">
          {/* Fixed heading */}
          <h2 className="text-lg font-semibold mb-4">Latest Videos</h2>

          {/* Scrollable content */}
          <div className=" h-[calc(80vh-40px)]">
            <div className="flex  flex-wrap gap-2">
              {subsVideos.length > 0 &&
                subsVideos.map((_, idx) => (
                  <VideoCard
                    key={idx}
                    channelImage={_.owner.avatar}
                    thumbnail={_.thumbnail}
                    title={_.title}
                    views={_.views}
                    channel={_.owner.username}
                    uploadTime={_.createdAt}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
