import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav';
import CardList from '../components/OpenCardList';

const Home = () => {
    const navigate=useNavigate();
    useEffect(()=>{
        // if (!localStorage.getItem("token")) {
        //     navigate("/");
        // }
    },[])

  return (
    <div className="w-screen h-screen flex bg-slate-950  flex-col ">
      <Nav username={"Shivam"} />
      <div className="py-3 flex w-full justify-around my-2   text-white mt-2">
        <button className="font-semibold md:text-xl cursor-pointer">
          <Link to={"/home/request"}>Bet Request</Link>
        </button>
        <button className="font-semibold md:text-xl cursor-pointer">
          <Link to={"/home"}>Open Bets</Link>
        </button>
        <button className="font-semibold md:text-xl cursor-pointer">
          <Link to={"/home/wins"}>Wins</Link>
        </button>
        <button className="font-semibold md:text-xl cursor-pointer">
          <Link to={"/home/lose"}>Loses</Link>
        </button>
        <button className="font-semibold md:text-xl cursor-pointer">
          <Link to={"/home/history"}>History</Link>
        </button>
      </div>
      <div className="w-full h-full  overflow-y-scroll scroller scroll-smooth bg-slate-950 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}

export default Home
