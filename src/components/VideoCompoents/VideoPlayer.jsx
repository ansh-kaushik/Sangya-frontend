import {
  Box,
  Container,
  createTheme,
  Menu,
  MenuItem,
  Slider,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import {
  ClosedCaption,
  ClosedCaptionOff,
  Fullscreen,
  FullscreenExit,
  Settings,
  VolumeMute,
  VolumeOff,
} from "@mui/icons-material";
import screenfull from "screenfull";

const qualities = ["144p", "360p", "480p", "720p", "1080p"];
export default function VideoPlayer({ url, title }) {
  const playerRef = useRef(null);
  const playerRef1 = useRef(null);
  const [curQuality, setCurQuality] = useState("360p");
  const [anchorEl, setAnchorEl] = useState(null);
  const conatinerRef = useRef(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const timeoutRef = useRef(null); // To store the timeout ID
  const showOverlay = () => {
    setIsOverlayVisible(true);
    resetTimeout(); // Reset timeout when mouse moves
  };
  const handleMenu = (e) => {
    // setAnchorEl(e.currentTarget);
    if (videoState.fullScreen) {
      setAnchorEl(conatinerRef.current); // Use the container ref for full-screen mode
    } else {
      setAnchorEl(e.currentTarget); // Use the event target for normal mode
    }
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };
  const toggleFullScreen = () => {
    setVideoState((prev) => ({ ...prev, fullScreen: !prev.fullScreen }));
    if (screenfull.isEnabled) {
      if (screenfull.isFullscreen) {
        screenfull.exit();
      } else {
        screenfull.request(playerRef1.current);
      }
    }
  };
  // Function to hide the overlay
  const hideOverlay = () => {
    setIsOverlayVisible(false);
  };

  // Function to reset the timeout
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    document.body.style.cursor = "default"; // Ensure cursor is visible initially
    timeoutRef.current = setTimeout(() => {
      document.body.style.cursor = "none"; // Hide cursor after 4 seconds
    }, 5000);
    timeoutRef.current = setTimeout(hideOverlay, 4000); // 3000ms = 3 seconds
  };
  const [videoState, setVideoState] = useState({
    playing: false,
    mute: false,
    captions: false,
    inputVolume: 60,
    showVolumeBar: false,
    fullScreen: false,
    curTime: 0,
    duration: 0,
  });

  const togglePlayingState = () => {
    setVideoState((state) => ({ ...state, playing: !state.playing }));
  };
  const toggleMuteState = () => {
    setVideoState((prevState) => ({ ...prevState, mute: !prevState.mute }));
  };
  const toggleCaptions = () => {
    setVideoState((prev) => ({ ...prev, captions: !prev.captions }));
  };
  const toggleFullSreen = () => {
    setVideoState((prev) => ({ ...prev, fullScreen: !prev.fullScreen }));
  };
  const handleMouseEnter = () => {
    setVideoState((prev) => ({ ...prev, showVolumeBar: true }));
  };

  const handleMouseLeave = () => {
    setVideoState((prev) => ({ ...prev, showVolumeBar: false }));
  };
  const handleMouseClick = () => {
    setVideoState((prev) => ({ ...prev, showVolumeBar: !prev.showVolumeBar }));
  };
  const handleClickFullscreen = () => {
    toggleFullScreen();
  };
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };
  useEffect(() => {
    // Function to handle keydown events
    const handleKeyDown = (event) => {
      if (!isFocused) return;

      if (event.key === "Escape") {
        // Check if the key pressed is 'Esc'
        setVideoState((prev) => ({ ...prev, fullScreen: false })); // Toggle the state
      }
      if (event.key === " ") {
        event.preventDefault();
        setVideoState((prev) => ({ ...prev, playing: !prev.playing }));
      }
      if (event.key === "f") {
        if (
          document.activeElement.tagName !== "INPUT" &&
          document.activeElement.tagName !== "TEXTAREA"
        ) {
          toggleFullScreen();
        }
        // toggleFullScreen();
      }
      if (event.key === "ArrowRight") {
        const newTime = Math.min(videoState.curTime + 5, videoState.duration);
        setVideoState((prev) => ({ ...prev, curTime: newTime }));
        playerRef.current.seekTo(newTime, "seconds"); // Seek forward 5 seconds
      }

      if (event.key === "ArrowLeft") {
        const newTime = Math.max(videoState.curTime - 5, 0);
        setVideoState((prev) => ({ ...prev, curTime: newTime }));
        playerRef.current.seekTo(newTime, "seconds"); // Seek backward 5 seconds
      }
      if (event.key === "ArrowUp") {
        const newVolume = Math.min(videoState.inputVolume + 10, 100); // Increase volume by 0.1, max is 1
        setVideoState((prev) => ({ ...prev, inputVolume: newVolume }));
        playerRef.current.volume = newVolume; // Update the video volume
      }

      if (event.key === "ArrowDown") {
        const newVolume = Math.max(videoState.inputVolume - 10, 0); // Decrease volume by 0.1, min is 0
        setVideoState((prev) => ({ ...prev, inputVolume: newVolume }));
        playerRef.current.volume = newVolume; // Update the video volume
      }
    };

    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [videoState]);
  //   console.log(videoState);

  useEffect(() => {
    // Add event listeners for mouse movement
    window.addEventListener("mousemove", showOverlay);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("mousemove", showOverlay);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOverlayVisible]);
  //   console.log(isOverlayVisible);
  // console.log(url.curQuality);

  useEffect(() => {
    // Function to handle clicks outside the component
    const handleClickOutside = (event) => {
      // Check if the click is outside the player component
      if (playerRef.current && !playerRef.current.contains(event.target)) {
        setIsFocused(false); // Set focus to false
      } else {
        setIsFocused(true);
      }
    };

    // Add event listener for document clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={playerRef1}
      className=" flex flex-col w-full  h-full relative shadow-slate-200 shadow-lg"
    >
      <div className="flex-1">
        <div className="player__wrapper h-full flex react-player ">
          <ReactPlayer
            // playing={true}
            ref={playerRef}
            className="player h-full"
            url={typeof url === "object" ? url[curQuality] : url}
            width="100%"
            height="100%"
            volume={videoState.inputVolume / 100}
            playing={videoState.playing}
            muted={videoState.mute}
            // fullScreen={videoState.fullScreen}
            onDuration={(value) => setVideoState((prev) => ({ ...prev, duration: value }))}
            onProgress={(progress) =>
              setVideoState((prev) => ({ ...prev, curTime: progress.playedSeconds }))
            }
            // controls={true}
            // muted={true}
          />
        </div>
      </div>
      {isOverlayVisible && (
        <div
          style={{
            backgroundImage: "linear-gradient(to top, rgba(50, 50, 50, 1) , rgba(0, 0, 0, 0) 12%)",
          }}
          className="overlay-div  flex flex-col justify-between  w-full h-full absolute inset-0 text-white shadow-lg transition-transform duration-700"
        >
          <div className="overlay-header w-full">
            {videoState.fullScreen && (
              <Typography
                component="div"
                className={`${videoState.fullScreen ? "p-3" : "py-2 px-1"}`}
                variant={`${videoState.fullScreen ? "h4" : "h5"}`}
              >
                {title}
              </Typography>
            )}
          </div>
          <div
            className="overlay-middle w-full h-full "
            onClick={() => setVideoState((prev) => ({ ...prev, playing: !prev.playing }))}
          >
            {/* <Typography component="div" className=" p-4" variant="h5">
            Pause/Play Symbol
          </Typography> */}
          </div>
          <div className=" flex w-full justify-center  items-center flex-col">
            {/* progress bar */}
            {/* <Box sx={{ width: "95%" }}> */}

            <Slider
              sx={{
                width: "98%",
                ml: "25px",
                mr: "20px",
                height: "4px",
              }}
              // aria-label="Volume"
              size="small"
              color="#ee2400"
              max={videoState.duration}
              aria-valuetext="hello"
              valueLabelDisplay="auto"
              defaultValue={0}
              valueLabelFormat={(value) => formatDuration(value)}
              value={videoState.curTime - 0.2}
              onChange={(e) => {
                setVideoState((prev) => ({ ...prev, curTime: e.target.value }));
                playerRef.current.seekTo(e.target.value);
              }}
            />

            {/* </Box> */}
            <div className="overlay-footer w-full flex justify-between p-2 text-l ">
              {/* pimrary conrtols */}

              <div className="controls-main flex gap-2">
                <div>
                  {!videoState.playing ? (
                    <PlayArrowIcon onClick={togglePlayingState} className="hover:cursor-pointer" />
                  ) : (
                    <PauseIcon onClick={togglePlayingState} className="hover:cursor-pointer" />
                  )}
                </div>
                <div>
                  <SkipNextIcon className="hover:cursor-pointer" />
                </div>
                <div
                  className="flex justify-center items-center gap-1"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {!videoState.mute ? (
                    <VolumeUpIcon onClick={toggleMuteState} className="hover:cursor-pointer" />
                  ) : (
                    <VolumeOff onClick={toggleMuteState} className="hover:cursor-pointer" />
                  )}
                  {/* {console.log(videoState.mute)} */}
                  {videoState.showVolumeBar && (
                    <Slider
                      size="sm"
                      min={0}
                      max={100}
                      defaultValue={60}
                      sx={{ width: "60px", mr: "20px" }}
                      value={videoState.inputVolume}
                      onChange={(e) =>
                        setVideoState((prev) => ({ ...prev, inputVolume: e.target.value }))
                      }

                      // className={`range-input bg-gray-200 rounded-full transition-all duration-300 ${!videoState.showVolumeBar && "scale-0"}`}
                    />
                  )}
                </div>
                <div>
                  {formatDuration(videoState.curTime)} / {formatDuration(videoState.duration)}
                </div>
              </div>
              {/* pimrary conrtols */}

              {/* secondaray controls */}
              <div className="controls-secondary flex gap-2">
                <div>
                  {videoState.captions ? (
                    <ClosedCaption onClick={toggleCaptions} className="hover:cursor-pointer" />
                  ) : (
                    <ClosedCaptionOff onClick={toggleCaptions} className="hover:cursor-pointer" />
                  )}
                </div>
                <div ref={conatinerRef}>
                  <Settings onClick={handleMenu} className="hover:cursor-pointer" />
                  <Menu
                    // id="menu-settings"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    // keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    container={conatinerRef.current}
                  >
                    {qualities.map((q, idx) => {
                      return (
                        <MenuItem
                          selected={curQuality === q}
                          key={idx}
                          onClick={() => {
                            setCurQuality(q);
                            setAnchorEl(null);
                          }}
                        >
                          {q}
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </div>
                <div>
                  {!videoState.fullScreen ? (
                    <Fullscreen
                      onClick={() => {
                        toggleFullSreen();
                        //   toggleFullScreenButton();
                        handleClickFullscreen();
                      }}
                      className="hover:cursor-pointer"
                    />
                  ) : (
                    <FullscreenExit
                      onClick={() => {
                        toggleFullSreen();
                        screenfull.toggle();

                        //   toggleFullScreenButton();
                      }}
                      className="hover:cursor-pointer"
                    />
                  )}
                </div>
              </div>
              {/* secondaray controls */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
/// do font size large
