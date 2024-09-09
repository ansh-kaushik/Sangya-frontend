import React from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function PageWrapper({ children }) {
  return (
    <div className="flex  h-screen overflow-hidden">
      <Sidebar />
      <div className=" relative flex-1 h-full">
        <Header />
        {/* main */}
        {children}
        <Footer />
      </div>
    </div>
    // <div className="flex flex-col min-h-screen">
    //   <div className="flex flex-1">
    //     <Sidebar />
    //     <div className="flex-1 flex flex-col overflow-y-auto">
    //       <Header />
    //       {/* main */}
    //       <div className="flex-1 overflow-y-auto">{children}</div>
    //     </div>
    //   </div>
    //   <Footer />
    // </div>
  );
}
