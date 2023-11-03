import { useEffect, useState, useRef } from "react";
import { HiMenu } from "react-icons/hi-menu";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import UserProfile from "../components/UserProfile";
import Pins from "./Pins";
import { client } from "../client";
import logo from "../assets/logo.png";

const Home = () => {
  return (
    <div className='flex bg-gray-50 md:flex-row h-screen transition-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar />
      </div>
      <div className="flex md:hidden flex-row">
        <HiMenu fontSize={40} className=" cursor-pointer"/>
      </div>
    </div>
  );
};

export default Home;
