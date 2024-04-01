"use client";

import { useAppSelector } from "@/redux/hooks/hooks";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { GiHandBandage } from "react-icons/gi";

import { MdSubdirectoryArrowRight } from "react-icons/md";
import { ImMagicWand } from "react-icons/im";
import { SiweMessage, generateNonce } from "siwe";

import { useAccount, useSignMessage } from "wagmi";

export const LoginInterface = () => {
  const userSettings = useAppSelector((state) => state.UserSetting);
  const [formStage, setFormStage] = useState(0);
  const [newMember, setNewMember] = useState(true);
  const [userName, setUserName] = useState("");

  const account = useAccount();
  const { signMessageAsync } = useSignMessage();

  const increaseStage = () => {
    setFormStage((prev) => (prev += 1));
  };

  const decreaseStage = () => {
    setFormStage((prev) => (prev -= 1));
  };

  const registerUser = async () => {
    if (!userName) {
      return;
    }
    const message = new SiweMessage({
      domain: window.location.host,
      address: account.address,
      statement: `Welcome to adlink ${userName}`,
      uri: window.location.origin,
      version: "1",
      chainId: account.chainId,
      nonce: generateNonce(),
    });

    const signature = await signMessageAsync({
      message: message.prepareMessage(),
    });

    await fetch("/api/user/create-user", {
      method: "POST",
      body: JSON.stringify({
        signature,
        message,
        name: userName,
        walletAddress: account.address,
      }),
    });
  };
  const login = async () => {
    const response = await fetch(
      `/api/user/login-user?walletAddress=${account.address}`
    );
    const data = await response.json();

    if (!data) return alert("please create a new account");

    const message = new SiweMessage({
      domain: window.location.host,
      address: account.address,
      statement: `Welcome back ${data.name}`,
      uri: window.location.origin,
      version: "1",
      chainId: account.chainId,
      nonce: generateNonce(),
    });

    const signature = await signMessageAsync({
      message: message.prepareMessage(),
    });
  };

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

      {formStage === 0 ? (
        <div>
          <div>
            <button
              className={`flex justify-start items-center space-x-2 hover:text-premium-gold`}
              onClick={() => {
                setNewMember(false);
                increaseStage();
              }}
            >
              <MdSubdirectoryArrowRight />
              <p>Already a member</p>
            </button>

            <button
              className={`flex justify-start items-center space-x-2 hover:text-premium-gold`}
              onClick={() => {
                setNewMember(true);
                increaseStage();
              }}
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
            {account.isConnected && (
              <div className="flex justify-between items-center space-x-4 w-full">
                {newMember && (
                  <input
                    value={userName}
                    type="text"
                    name=""
                    id=""
                    placeholder="Something to call you.."
                    className="text-lg py-3 px-2 border border-premium-black rounded-lg focus:outline-none w-full text-premium-gold"
                    onChange={(e) => {
                      e.target.value
                        ? setUserName(e.target.value)
                        : setUserName("");
                    }}
                  />
                )}
                <button
                  className="flex w-full justify-center items-center bg-premium-black text-white p-2 rounded-md"
                  onClick={() => {
                    if (newMember) {
                      registerUser();
                    } else {
                      login();
                    }
                  }}
                >
                  <ImMagicWand className="text-[32px]" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
