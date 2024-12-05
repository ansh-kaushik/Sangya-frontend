import React, { useEffect, useRef, useState } from "react";
import PageWrapper from "./PageWrapper";
import { Button } from "@mui/material";
import { io } from "socket.io-client"; // Import socket.io-client for WebSocket connection

const socket = io("https://backend-sangya.onrender.com", {
  transports: ["websocket"], // Ensure WebSocket is used
});

// const socket = io("http://localhost:8000", {
//   transports: ["websocket"], // Ensure WebSocket is used
// });

const room = "live-stream"; // Room name for broadcasting
export default function LiveStream() {
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
    <PageWrapper>
      <div className="mt-2">
        <div className="flex gap-4 mb-2">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 dark:text-white">Live Stream</h2>
          <Button variant="contained" onClick={() => startBroadcast()}>
            {streamStatus ? "Live Now" : "Go Live"}
          </Button>
        </div>
        <div className="w-full aspect-video relative">
          <h4 className="absolute bottom-1 left-1 text-red-600 font-bold">
            Live <span className=" w-2 h-2 bg-red-600 rounded-full inline-block"></span>
          </h4>

          <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "100%" }} />
        </div>
        {/* <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "100%" }} /> */}
      </div>
    </PageWrapper>
  );
}
