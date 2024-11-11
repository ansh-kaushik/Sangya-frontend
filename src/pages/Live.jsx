import React from "react";
import PageWrapper from "./PageWrapper";
import LiveVideoCard from "../components/VideoCompoents/LiveVideoCard";
import { useSelector } from "react-redux";

export default function Live() {
  const homePageVideos = useSelector((state) => state.UI.homePageVideos);
  return (
    <>
      <PageWrapper>
        <div className="">
          <h1 className="text-2xl font-bold text-white dark:text-blue-700 mb-4 flex items-center">
            Live Now
            <span
              className="ml-2 w-2 h-2 bg-red-600 rounded-full inline-block"
              style={{ transform: "translateY(4px)" }}
            ></span>
          </h1>
          {homePageVideos.length === 0 && (
            <p className="text-white dark:text-blue-700">No live streams .</p>
          )}
        </div>
        <div className="flex flex-wrap gap-1 dark:text-white dark:bg-zinc-900  justify-start items-start overflow-y-auto ">
          {homePageVideos &&
            homePageVideos.map((videoDetails, idx) => (
              <LiveVideoCard
                channelID={videoDetails.channelID}
                id={videoDetails.id}
                key={idx}
                description={videoDetails.description}
                channelImage={videoDetails.channelImage}
                thumbnail={videoDetails.thumbnail}
                url={videoDetails.url}
                title={videoDetails.title}
                channel={videoDetails.channel}
                views={videoDetails.views}
                uploadTime={videoDetails.uploadTime}
              />
            ))}
        </div>
      </PageWrapper>
    </>
  );
}
