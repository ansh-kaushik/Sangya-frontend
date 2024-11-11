import React, { useRef } from "react";
import PageWrapper from "./PageWrapper";
import { Button } from "@mui/material";
import axiosInstance from "../services/axiosInstance";
import * as mediasoupClient from "mediasoup-client";
// import { X } from "@mui/icons-material";

let device;
let producerTransport;
let videoTrack;
let x;
export default function LiveStream() {
  const videoRef = useRef(null); // Reference to the video element

  const init = async () => {
    // Step 1: Get RTP capabilities and load device
    const res = await axiosInstance.get("/stream/connect");
    const rtpCapabilities = res.data.rtpCapabilities;
    device = new mediasoupClient.Device();
    await device.load({ routerRtpCapabilities: rtpCapabilities });

    const res1 = await axiosInstance.post("/stream/addStream");
    console.log(res1.data, "🤣🤣");

    producerTransport = device.createSendTransport(res1.data);
    x = res1.data.dtlsParameters;
    // console.log(res1.data.dtlsParameters, "🤣🤣");

    // Step 2: Connect transport
    producerTransport.on("connect", async ({ dtlsParameters }, callback, errback) => {
      x = dtlsParameters;
      console.log("Transport connected");
      await axiosInstance.post("/stream/connectStream", {
        transportId: producerTransport.id,
        dtlsParameters,
      });
      callback();
    });

    console.log("Transport created and connected.");

    // Step 3: Get user media (video stream)
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoTrack = stream.getVideoTracks()[0];

    // Attach the stream to the video element
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    // Step 4: Produce the video track
    producerTransport.on("produce", async ({ kind, rtpParameters }, callback, errback) => {
      try {
        // Ensure kind is set to 'video' for video tracks
        // console.log("🤣🤣🤣", kind);

        if (!kind) {
          kind = "video"; // This is the correct value since you're producing video
        }

        // Send rtpParameters to the server
        const response = await axiosInstance.post("/stream/broadcast", {
          kind: "video",
          rtpParameters,
        });

        const { id } = await response.data;
        callback({ id });
      } catch (error) {
        console.error("Error during production:", error);
        errback(error);
      }
    });
  };

  const startStream = async () => {
    // await producerTransport.connect();
    await producerTransport.produce({ track: videoTrack });
  };
  return (
    <PageWrapper>
      <video ref={videoRef} controls autoPlay />
      <Button onClick={init}>Start Video</Button>

      <Button onClick={startStream}>Start Stream</Button>
    </PageWrapper>
  );
}
