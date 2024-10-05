import React from "react";
import PageWrapper from "./PageWrapper";
import { useSelector } from "react-redux";
import VideoCard from "../components/VideoCompoents/VideoCard";
import BgNoResults from "../assets/bgnoresults.svg";
export default function SearchResults() {
  const { searchResultVideos } = useSelector((state) => state.UI);
  console.log(searchResultVideos);

  return (
    <PageWrapper>
      {searchResultVideos.length > 0 ? (
        <div className="flex  flex-wrap gap-1 dark:text-white dark:bg-zinc-900  justify-start items-start overflow-y-auto ">
          {searchResultVideos.map((videoDetails, idx) => (
            <VideoCard
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
      ) : (
        <div className="flex flex-col justify-center text-center items-center gap-4">
          <img src={BgNoResults} />
          <h3 className="text-xl md:text-2xl font-bold">No results found</h3>
          <h4 className="text-sm font-bold text-gray-400">Try changing the keywords</h4>
        </div>
      )}
    </PageWrapper>
  );
}
