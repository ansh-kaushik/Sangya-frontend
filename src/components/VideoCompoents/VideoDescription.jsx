import { Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { timeAgo } from "../../services/utils";

const Description = ({ text, showBorder = true, uploadTime }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const contentRef = useRef(null);
  const maxHeight = 100; // Set this to your desired threshold height in pixels

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setIsButtonVisible(contentHeight > maxHeight);
    }
  }, [text]);

  return (
    <div
      className={` prose relative pb-4 min-w-full  ${showBorder ? "border rounded-xl p-4 bg-gray-200 dark:text-white dark:bg-zinc-800 dark:border-transparent" : ""}`}
    >
      {showBorder && <h4 className=" dark:text-white "> {timeAgo(uploadTime)}</h4>}
      <Typography
        variant="subtitle2"
        ref={contentRef}
        className={`text-gray-700 ${isExpanded ? "" : "line-clamp-3"} dark:text-white mb-2`}
        style={{ maxHeight: isExpanded ? "none" : `${maxHeight}px`, overflow: "hidden" }}
      >
        {text}
      </Typography>
      {isButtonVisible && (
        <Typography
          variant="body2"
          component="p"
          onClick={handleToggle}
          className={`absolute bottom-0 mt-2  text-black-700 font-bold  cursor-pointer hover:cursor-pointer`}
        >
          {isExpanded ? "Show Less" : "Load More"}
        </Typography>
      )}
    </div>
  );
};

export default Description;
