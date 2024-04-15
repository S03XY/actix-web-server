"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { IoRefreshCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import { useAccount, useSignMessage } from "wagmi";

export const InterfaceModule = () => {
  const [walletTxns, setWalletTxns] = useState<any[]>([]);
  const [redeemablePoints, setRedeemablePoints] = useState<number>(0);

  const { signMessageAsync } = useSignMessage();

  const account = useAccount();

  useEffect(() => {
    if (account.address) {
      getWalletTransactions();
    }
  }, [account.address]);

  const getWalletTransactions = async () => {
    const response = await fetch(
      `/api/get-wallet-tx?walletAddress=${account.address}`
    );

    const data = await response.json();

    const response_one = await fetch(
      `http://localhost:3000/api/get-redeemable-points?walletAddress=${account.address}`
    );

    const data_one = await response_one.json();

    let sum = 0;

    data_one.data.forEach((d: any) => {
      sum += d.total;
    });

    setRedeemablePoints(sum);
    setWalletTxns(data.data);
  };

  const redeemPoints = async () => {
    if (redeemablePoints === 0) {
      toast("You dont have enough credits to redeem");
      return;
    } else if (!account.address) {
      toast("Connect wallet");
      return;
    }

    const msgSignature = await signMessageAsync({
      message: `claiming ${redeemablePoints}`,
    });

    const response = await fetch("/api/redeem-points", {
      method: "POST",
      body: JSON.stringify({
        walletAddress: account.address,
        msgSignature: msgSignature,
      }),
    });

    const data = await response.json();

    toast(`Woohoo! got an airdrop ${data.airdropTx} check your wallet`);
  };

  return (
    <div className="max-w-[700px] mx-auto">
      <div className="flex justify-between items-center mt-10">
        <div className="flex justify-start items-center space-x-6"></div>
        <ConnectButton chainStatus={"none"} />
      </div>

      <div className="flex justify-between items-center mt-10">
        <p className="capitalize">redeemable points: {redeemablePoints}</p>

        <button
          className="hover:bg-premium-black hover:text-white p-2 px-4 rounded-lg"
          onClick={redeemPoints}
        >
          Claim
        </button>
      </div>

      <div>
        <div className="w-full mt-10 border-collapse  overflow-hidden">
          <div className="sticky top-0 grid grid-cols-[1fr,1fr,2fr,2fr,2fr,1fr,1fr] w-full">
            <p className="">Claimed</p>
            <p className="text-center">Status</p>
            <p className="text-center">Source</p>
            <p className="text-center">Destination</p>
            <p className="text-center">Source Hash</p>
            <p className="text-center">Point</p>
            <p className=""></p>
          </div>

          <div className="max-h-[50vh]  overflow-y-scroll  ">
            {[...walletTxns].map((d, i) => (
              <div
                key={i}
                className="grid  grid-cols-[1fr,1fr,2fr,2fr,2fr,1fr,1fr] w-full mt-2 odd:bg-premium-black odd:text-white py-2 px-2"
              >
                <p>{i + 1}</p>
                <p className="text-center capitalize">
                  {d.viewed === true ? "viewed" : `Pending`}
                </p>
                <p className="text-center capitalize">{d.from_chain}</p>
                <p className="text-center capitalize">{d.destination_chain}</p>
                <p className="text-center">{`${d.tx.slice(0, 4)}...${d.tx.slice(
                  d.tx.length - 4,
                  d.tx.length
                )}`}</p>
                <p className="text-center">{d.points}</p>
                <p className="text-center flex justify-center items-center">
                  <IoRefreshCircle className="text-[20px] cursor-pointer" />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};



// Hey Rory,

// I hope this email finds you well. I won two prizes in the Framework Hackathon from XMTP and Dynamic, but I haven't received anything in my wallet. Could you please check what is wrong?

// My EthGlobal ID is prishankofficial@gmail.com.

// Thank you.