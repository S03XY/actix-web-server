"use client";

import logo from "@/assets/seahorse.svg";
import Image from "next/image";
import { FaAngleDoubleDown } from "react-icons/fa";

import { TbExchange } from "react-icons/tb";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaFileSignature } from "react-icons/fa6";
import { PiBridgeBold } from "react-icons/pi";

export const DEX = () => {
  return (
    <div className="max-w-[700px] w-full mx-auto ">
      <div className="flex justify-between items-center mt-10">
        <div className="flex justify-start items-center space-x-6">
          <PiBridgeBold className="text-[32px] cursor-pointer hover:text-premium-gold" />
          <FaFileSignature className="text-[24px] cursor-pointer hover:text-premium-gold" />
        </div>
        <ConnectButton />
      </div>

      <div className="w-full max-w-[500px] mx-auto mt-20">
        <div className="bg-premium-black rounded-md text-white p-4  mx-auto mt-10 w-full shadow-lg shadow-premium-black">
          <div className="flex justify-end items-center">
            <div className="flex justify-center items-center space-x-2 cursor-pointer py-2 rounded-sm">
              <p>Chains</p>
              <FaAngleDoubleDown />
            </div>
          </div>
          <div className="flex space-x-10 items-center justify-center">
            <div className="flex justify-start items-center space-x-2">
              <Image src={logo} alt="token logo" className=" w-[12px]" />
              <p>Adlink</p>
            </div>
            <input
              type="number"
              className="w-full p-2 rounded-md text-premium-gold"
            />
          </div>
        </div>

        <div className="flex justify-center items-center py-10">
          <TbExchange className="text-[32px]" />
        </div>

        <div className="bg-premium-black rounded-md text-white p-4  mx-auto w-full shadow-lg shadow-premium-black">
          <div className="flex justify-end items-center ">
            <div className="flex justify-center items-center space-x-2 cursor-pointer py-2 rounded-sm">
              <p>Chains</p>
              <FaAngleDoubleDown />
            </div>
          </div>
          <div className="flex space-x-10 items-center justify-center">
            <div className="flex justify-start items-center space-x-2">
              <Image src={logo} alt="token logo" className=" w-[12px]" />
              <p>Adlink</p>
            </div>
            <input
              type="number"
              className="w-full p-2 rounded-md text-premium-gold"
            />
          </div>
        </div>

        <button className="bg-premium-black text-white w-full mt-10 p-4 rounded-md">
          Swap{" "}
        </button>
      </div>
    </div>
  );
};
