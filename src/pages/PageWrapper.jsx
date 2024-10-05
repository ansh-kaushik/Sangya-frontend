import React from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { UIactions } from "../store";
import SearchComponent from "../components/SearchComponent";

export default function PageWrapper({ children }) {
  const darkMode = useSelector((state) => state.UI.darkMode);
  const sidebarOpen = useSelector((state) => state.UI.sideBarOpen);
  const dispatch = useDispatch();
  return (
    <>
      <div className={`${darkMode ? "dark" : ""}`}>
        <SearchComponent />
        <div className="flex h-screen dark:bg-zinc-900 relative">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content */}
          <div className="flex-1 h-full overflow-y-auto relative  sm:ml-20">
            <Header />
            <div className=" dark:text-white ">
              {/* main content */}
              {children}
            </div>
            <Footer />
          </div>
          {/* Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-40 transition-opacity duration-300"
              onClick={() => dispatch(UIactions.changeSideBarOpen(false))}
            ></div>
          )}
        </div>
      </div>
    </>
  );
}
