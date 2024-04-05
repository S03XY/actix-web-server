"use client";

import { FaAngleDown } from "react-icons/fa";
import { ImMagicWand } from "react-icons/im";
import { MdOutlineSwapCalls } from "react-icons/md";

export const SwapModule = () => {
  return (
    <div className="w-full max-w-[400px]  border-[1px] border-white rounded-lg  p-6 text-white ">
      <div className="flex justify-between items-center">
        <div className="space-x-4">
          <label htmlFor="fromi">From</label>
          <input
            type="text"
            id="fromi"
            placeholder="Enter amount"
            className="p-2 bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex justify-between items-center space-x-2">
          <p>Arbitrum</p>
          <FaAngleDown />
        </div>
      </div>
      <div className="flex justify-center items-center py-4">
        <MdOutlineSwapCalls />
      </div>
      <div className="flex justify-between items-center">
        <div className="space-x-4">
          <label htmlFor="fromi">To</label>
          <input
            type="text"
            id="fromi"
            placeholder="Enter amount"
            className="p-2 bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex justify-between items-center space-x-2">
          <p>Gnosis</p>
          <FaAngleDown />
        </div>
      </div>

      <button
        className="flex w-full justify-center space-x-4 items-center mt-6  p-2 rounded-md bg-white text-premium-black"
        onClick={() => {}}
      >
        <p>Swap</p>
        <ImMagicWand className="" />
      </button>
    </div>
  );
};
