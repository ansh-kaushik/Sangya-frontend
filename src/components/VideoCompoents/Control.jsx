import React from "react";
import "./Control.css";
import { styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import {
  FastForwardOutlined,
  FastRewindRounded,
  PauseCircleFilled,
  PlayArrowSharp,
  SkipNextRounded,
  VolumeUpOutlined,
} from "@mui/icons-material";

// Define the styled PrettoSlider
const PrettoSlider = styled(Slider)(({ theme }) => ({
  height: "20px",
  color: "#9556CC",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#9556CC",
    border: "2px solid currentColor",
    marginTop: -3,
    marginLeft: -12,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: "inherit",
    },
  },
  "& .MuiSlider-track": {
    height: 5,
    borderRadius: 4,
    width: "100%",
  },
  "& .MuiSlider-rail": {
    height: 5,
    borderRadius: 4,
  },
  "& .MuiSlider-valueLabel": {
    left: "calc(-50% + 4px)",
  },
}));

const VolumeSlider = styled(Slider)(({ theme }) => ({
  width: "100px",
  color: "#9556CC",
}));

const BottomIcon = styled(IconButton)(({ theme }) => ({
  color: "#999",
  padding: "12px 8px",

  "&:hover": {
    color: "#fff",
  },
}));

const Control = () => {
  return (
    <div className="control_Container">
      {/* Header */}
      <div className="top_container">
        <h2>Video Player</h2>
      </div>

      {/* Mid */}
      <div className="mid__container">
        <div className="icon__btn">
          <FastRewindRounded fontSize="medium" />
        </div>

        <div className="icon__btn">
          <PauseCircleFilled fontSize="medium" />
        </div>

        <div className="icon__btn">
          <FastForwardOutlined fontSize="medium" />
        </div>
      </div>

      {/* Bottom */}
      <div className="bottom__container">
        <div className="slider__container">
          <PrettoSlider defaultValue={30} aria-label="pretto slider" />
        </div>

        <div className="control__box">
          <div className="inner__controls">
            <div className="icon__btn">
              <PlayArrowSharp fontSize="medium" />
            </div>
            <div className="icon__btn">
              <SkipNextRounded fontSize="medium" />
            </div>
            <div className="icon__btn">
              <VolumeUpOutlined fontSize="medium" />
            </div>

            <VolumeSlider />
            <span>5/20</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Control;
