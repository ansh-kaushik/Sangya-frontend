import { Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";

const Description = ({ text, showBorder = true }) => {
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
      className={` prose relative pb-4  ${showBorder ? "border rounded-xl p-4 bg-gray-200" : ""}`}
    >
      <Typography
        variant="subtitle2"
        ref={contentRef}
        className={`text-gray-700 ${isExpanded ? "" : "line-clamp-3"} mb-2`}
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
