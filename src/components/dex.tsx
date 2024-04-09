"use client";

import logo from "@/assets/seahorse.svg";
import Image from "next/image";
import { FaAngleDoubleDown } from "react-icons/fa";

import { IoRefreshCircle } from "react-icons/io5";

import { TbExchange } from "react-icons/tb";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaFileSignature } from "react-icons/fa6";
import { PiBridgeBold } from "react-icons/pi";
import { Chain } from "viem";
import { useAccount, useChains } from "wagmi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const DEX = () => {
  const chains = useChains();
  const router = useRouter();
  const account = useAccount();
  const search = useSearchParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const [destinationChain, setDestinationChain] = useState<Chain>();
  const [inputAmount, setInputAmount] = useState(0);

  const [tab, setTab] = useState(0);

  useEffect(() => {
    const history = search.get("history");
    if (history) {
      setTab(1);
    } else {
      setTab(0);
    }
  }, []);

  return (
    <div className="max-w-[700px] w-full mx-auto ">
      <div className="flex justify-between items-center mt-10">
        <div className="flex justify-start items-center space-x-6">
          <PiBridgeBold
            className="text-[32px] cursor-pointer hover:text-premium-gold"
            onClick={() => {
              router.push("/");
              setTab(0);
            }}
          />
          <FaFileSignature
            className="text-[24px] cursor-pointer hover:text-premium-gold"
            onClick={() => {
              router.push("?history=true");
              setTab(1);
            }}
          />
        </div>
        <ConnectButton chainStatus={"none"} />
      </div>

      {tab === 0 ? (
        <div className="w-full max-w-[500px] mx-auto mt-20">
          <div className="bg-premium-black rounded-md text-white p-4  mx-auto mt-10 w-full shadow-lg shadow-premium-black">
            <div className="flex justify-end items-center">
              <div className="flex justify-center items-center space-x-2 cursor-pointer py-2 rounded-sm relative">
                <p>{account.chain ? account.chain.name : "Connect wallet"}</p>
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
                className="w-full p-2 rounded-md text-premium-gold text-end"
                onChange={(e) => {
                  if (e.target.value) {
                    setInputAmount(Number(e.target.value));
                  } else {
                    setInputAmount(0);
                  }
                }}
              />
            </div>
          </div>

          <div className="flex justify-center items-center py-10">
            <TbExchange className="text-[32px]" />
          </div>

          <div className="bg-premium-black rounded-md text-white p-4  mx-auto w-full shadow-lg shadow-premium-black">
            <div className="flex justify-end items-center ">
              <div
                className="flex justify-center items-center space-x-2 cursor-pointer py-2 rounded-sm relative"
                onClick={(e) => {
                  setShowDropdown(!showDropdown);
                }}
              >
                <p>
                  {destinationChain ? destinationChain.name : "Select Chain"}
                </p>
                <FaAngleDoubleDown />
                {showDropdown && (
                  <Drop
                    chains={[...chains]}
                    callback={(chain) => {
                      setDestinationChain(chain);
                    }}
                  />
                )}
              </div>
            </div>
            <div className="flex space-x-10 items-center justify-center">
              <div className="flex justify-start items-center space-x-2">
                <Image src={logo} alt="token logo" className=" w-[12px]" />
                <p>Adlink</p>
              </div>
              <input
                value={inputAmount !== 0 ? inputAmount : ""}
                type="number"
                className="w-full p-2 rounded-md text-premium-gold text-end"
                disabled
              />
            </div>
          </div>

          <button className="bg-premium-black text-white w-full mt-10 p-4 rounded-md">
            Swap{" "}
          </button>
        </div>
      ) : (
        <div className="">
          {/* <div className="h-[40vh] w-full bg-premium-black mt-10 rounded-lg"></div> */}

          <div className="w-full mt-10 border-collapse  overflow-hidden">
            <div className="sticky top-0 grid grid-cols-[1fr,2fr,2fr,3fr,2fr,1fr] w-full">
              <p className="">Id</p>
              <p className="">Status</p>
              <p className="">Chain</p>
              <p className="">Hash</p>
              <p className=""></p>
              <p className=""></p>
            </div>

            <div className="max-h-[20vh]  overflow-y-scroll ">
              {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((d, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr,2fr,2fr,3fr,2fr,1fr] w-full mt-2"
                >
                  <p>{i + 1}</p>
                  <p>Pending</p>
                  <p>Gnosis chiado</p>
                  <p>0xaa93...575ce0</p>
                  <p className="underline underline-offset-2 text-center">
                    View Ad
                  </p>
                  <p className="underline underline-offset-2 flex justify-center items-center">
                    <IoRefreshCircle className="text-[20px] cursor-pointer" />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const Drop = ({
  chains,
  callback,
}: {
  chains: Chain[];
  callback?: (chain: Chain) => void;
}) => {
  return (
    <div className="bg-white text-premium-black p-2 absolute rounded-lg top-0 left-0 translate-y-[35px]">
      {chains.map((d, i) => (
        <div
          key={i}
          className="w-full whitespace-nowrap py-2 px-4 hover:bg-premium-black hover:text-white rounded-lg cursor-pointer"
          onClick={() => {
            callback && callback(d);
          }}
        >
          {d.name}
        </div>
      ))}
    </div>
  );
};
