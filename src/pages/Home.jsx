import React from "react";
import SideBar from "../components/Home/SideBar";
import { Outlet } from "react-router-dom";
import "../index.css"; // or import "../App.css"; depending on where you put the CSS

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row h-[90vh] gap-4 overflow-hidden">
      <div className="w-full md:w-1/6 border rounded-xl p-4 border-slate-600 flex flex-col justify-between overflow-y-auto custom-scrollbar">
        <SideBar />
      </div>
      <div className="w-full md:w-5/6 border rounded-xl p-4 border-slate-600 overflow-y-auto custom-scrollbar">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
