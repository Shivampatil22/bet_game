import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
const DetailsCard = ({
  sender,
  senderResp,
  receiver,
  receiverResp,
  description,
  ResolutionDate,
  Wager,
  status,
  BetInvite,
  BetResult,
  Result,
}) => {
  const normal =
    "w-full tbl flex items-start px-5 py-3 my-3 lg:flex-row flex-col justify-evenly";
  const lose =
    "w-full lose flex items-start px-5 py-3 my-3 lg:flex-row flex-col justify-evenly";
  const win =
    "w-full win flex items-start px-5 py-3 my-3 lg:flex-row flex-col justify-evenly";
  return (
    <div
      className={
        (Result == "none" && normal) ||
        (Result == "lose" && lose) ||
        (Result == "win" && win)
      }
    >
      <div className="flex my-2">
        <span className="flex flex-col mx-3  text-white">
          <span className="text-lg font-semibold">Bet Initiator</span>
          <span className="text-lg font-light">{sender}</span>
        </span>
        <span className="flex flex-col mx-3 text-white">
          <span className="text-lg font-semibold">Response</span>
          <span className="text-lg font-light">{senderResp}</span>
        </span>
      </div>
      <div className="flex  my-2">
        <span className="flex flex-col mx-3 text-white">
          <span className="text-lg font-semibold">Bet Receiver</span>
          <span className="text-lg font-light">{receiver}</span>
        </span>
        <span className="flex flex-col mx-3 text-white">
          <span className="text-lg font-semibold">Response</span>
          <span className="text-lg font-light">{receiverResp}</span>
        </span>
      </div>

      <span className="flex flex-col max-h-[12rem] lg:max-w-[38%] mx-3  my-2 text-white">
        <span className="text-lg font-semibold">Description</span>
        <span className="text-lg font-light overflow-y-scroll scroller">
          {description}
        </span>
      </span>
      <div className="flex  my-2">
        <span className="flex flex-col mx-5 text-white">
          <span className="text-lg font-semibold">Date Of Resolution</span>
          <span className="text-lg font-light">{ResolutionDate}</span>
        </span>
        <span className="flex flex-col mx-3  text-white">
          <span className="text-lg font-semibold">Wager</span>
          <span className="text-lg font-light">{Wager}</span>
        </span>
      </div>
      {status == "pending" && (
        <div className="flex lg:flex-col  justify-evenly h-full mx-3 ">
          <button className="text-[3rem] lg:mx-0 mx-4 text-green-600">
            <AiOutlineCheckCircle />
          </button>
          <button className="text-[3rem] text-red-600">
            <RxCrossCircled />
          </button>
        </div>
      )}
      {status == "final" && (
        <div className="flex flex-col mx-3">
          <div className="text-white font-semibold text-lg">
            Was this Bet Result in your Favour?
          </div>
          <div className="flex justify-around my-3">
            <button className="text-xl mx-3 bg-blue-600 text-white font-semibold py-1 px-2 rounded-md  ">
              YES
            </button>
            <button className="text-xl bg-red-600 text-white font-semibold py-1 px-2 rounded-md  ">
              NO
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsCard;
