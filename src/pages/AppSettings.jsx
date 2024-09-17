import React from "react";
import ReactPlayer from "react-player";
import { toast, ToastContainer } from "react-toastify";

export default function AppSettings() {
  return (
    <>
      {/* <ToastContainer /> */}
      <div>
        {/* <ReactPlayer url="https://www.youtube.com/watch?v=LrSvfI2hMJc" controls={true} /> */}
        <button
          onClick={() =>
            toast.success("Logged in successfully", {
              autoClose: 3000,
              position: toast.POSITION_TOP_CENTER,
            })
          }
        >
          toast
        </button>
      </div>
    </>
  );
}
