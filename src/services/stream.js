// window.onload = () => {
//   document.getElementById("my-button").onclick = () => {
//     init();
//   };
// };

import axiosInstance from "./axiosInstance";

export async function init() {
  const payload = {};
  const res = await axiosInstance.post("/stream/broadcast", payload);
  const transport = createWeb;
}

export function createPeer() {
  const peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.stunprotocol.org",
      },
    ],
  });
  peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);

  return peer;
}

export async function handleNegotiationNeededEvent(peer) {
  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);
  const payload = {
    sdp: peer.localDescription,
  };
  console.log(payload);

  const { data } = await axiosInstance.post("/stream/broadcast", payload);
  const desc = new RTCSessionDescription(data.sdp);
  peer.setRemoteDescription(desc).catch((e) => console.log(e));
}
