import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = ({ username }) => {
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    navigate("/");
  }
  const CreateBet=()=>{
    navigate("/createBet");
  }
  return (
    <div className=" w-full py-4 bg-slate-950 text-white flex flex-col px-3">
      <div className="flex w-full justify-between md:px-6 items-center">
        <span className="flex sm:flex-row flex-col items-start">
          <button
          className="text-white font-bold md:mr-6 mr-2 text-xl"
          onClick={()=>{navigate("/home")}}>Home</button>
          <span className="md:text-2xl text-md font-bold">
            Welcome,{username}
          </span>
        </span>

        <span>
          <button
            className="bg-purple-800 md:text-xl text-sm md:px-2 px-1 py-1 font-bold rounded-md md:mx-10 mx-2"
            onClick={() => {
              CreateBet();
            }}
          >
            Create Bet
          </button>
          <button
            className="bg-red-600 md:text-lg text-sm px-2 py-1 font-bold rounded-md"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        </span>
      </div>
    </div>
  );
};

export default Nav;
