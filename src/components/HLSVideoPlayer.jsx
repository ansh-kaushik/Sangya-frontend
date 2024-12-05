import {
  Box,
  Button,
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

import { io } from "socket.io-client";
const room = "live-stream";
const socket = io("http://localhost:8000", {
  transports: ["websocket"], // Ensure WebSocket is used
});
const qualities = ["144p", "360p", "480p", "720p", "1080p"];
export default function HLSVideoPlayer({ url, title }) {
  // const playerRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [streamStatus, setStreamStatus] = useState(false); // Use a ref for persistent peer connection
  const startBroadcast = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideoRef.current.srcObject = stream;

      const pc = peerConnectionRef.current;

      // Add tracks to PeerConnection
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      // Create and send offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("offer", offer, room);
    } catch (error) {
      console.error("Error starting broadcast:", error);
    }
    setStreamStatus(true);
  };
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

  useEffect(() => {
    // Create PeerConnection
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // Save PeerConnection in ref
    peerConnectionRef.current = pc;

    // ICE Candidate handling
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", event.candidate, room);
      }
    };

    // Remote stream handling
    pc.ontrack = (event) => {
      console.log("Remote track received:", event.streams[0]);
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    // Room join
    socket.emit("join-room", room);

    // Signaling Handlers
    socket.on("offer", async (offer) => {
      try {
        console.log("Offer received:", offer);
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("answer", answer, room);
      } catch (error) {
        console.error("Error handling offer:", error);
      }
    });

    socket.on("answer", async (answer) => {
      try {
        console.log("Answer received:", answer);
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      } catch (error) {
        console.error("Error handling answer:", error);
      }
    });

    socket.on("ice-candidate", (candidate) => {
      console.log("ICE candidate received:", candidate);
      pc.addIceCandidate(new RTCIceCandidate(candidate)).catch((error) => {
        console.error("Error adding ICE candidate:", error);
      });
    });

    return () => {
      pc.close();
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <video ref={remoteVideoRef} autoPlay playsInline muted />
    </div>
  );
}
/// do font size large
