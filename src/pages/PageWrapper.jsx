import React from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useSelector } from "react-redux";

export default function PageWrapper({ children }) {
  const darkMode = useSelector((state) => state.UI.darkMode);
  console.log(darkMode);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex   h-screen dark:bg-zinc-900 ">
        <Sidebar />
        <div className=" relative flex-1 h-full overflow-y-auto">
          <Header />
          <div className="overflow-y-auto dark:text-white  ">
            {/* main */}
            {children}
          </div>
          <Footer />
        </div>
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
