"use client";

import { useAppSelector } from "@/redux/hooks/hooks";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { GiHandBandage } from "react-icons/gi";

import { MdSubdirectoryArrowRight } from "react-icons/md";
import { ImMagicWand } from "react-icons/im";

export const LoginInterface = () => {
  const userSettings = useAppSelector((state) => state.UserSetting);
  const [formStage, setFormStage] = useState(0);

  return (
    <div className="h-full w-full  flex flex-col justify-center items-center">
      <div className="text-2xl">
        {userSettings.showAdminInterface ? (
          <div className="text-center w-full space-y-2 my-6">
            <div className="flex justify-center items-center space-x-2">
              <div>
                <GiHandBandage />
              </div>
              <p>Hi adlink user</p>
            </div>
            <p>Reach your audience across chain</p>
          </div>
        ) : (
          <div className="text-center w-full space-y-2 my-6">
            <div className="flex justify-center items-center space-x-2">
              <div>
                <GiHandBandage />
              </div>
              <p>Hi adlink user</p>
            </div>
            <p>Get more from your transaction</p>
          </div>
        )}
      </div>

      {formStage !== 0 ? (
        <div>
          <div>
            <button
              className={`flex justify-start items-center space-x-2 hover:text-premium-gold`}
            >
              <MdSubdirectoryArrowRight />
              <p>Already a member</p>
            </button>

            <button
              className={`flex justify-start items-center space-x-2 hover:text-premium-gold`}
            >
              <MdSubdirectoryArrowRight />
              <p>Become a member</p>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-center">{`Let's get you on board.`}</h1>
          <div className="flex flex-col justify-center items-center space-y-4">
            <div className="mt-4">
              <ConnectButton />
            </div>
            <div className="flex justify-between items-center space-x-4 w-full">
              <input
                type="text"
                name=""
                id=""
                placeholder="Some to call you.."
                className="text-lg py-3 px-2 border border-premium-black rounded-lg focus:outline-none w-full text-premium-gold"
              />
              <button className="flex justify-center items-center bg-premium-black text-white p-2 rounded-md">
                <ImMagicWand className="text-[32px]"/>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
