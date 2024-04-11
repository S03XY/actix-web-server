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
import { useAccount, useChains, useSignMessage, useWriteContract } from "wagmi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";

import { AiOutlineLink } from "react-icons/ai";

import {
  SignProtocolClient,
  SpMode,
  EvmChains,
  OffChainSignType,
} from "@ethsign/sp-sdk";
import { writeContract } from "viem/actions";
import { ADAPTER_ABI } from "@/utils/adapter.abi";
import { CONTRACTS } from "@/utils/constant";
import { ADLINK_ABI } from "@/utils/adlink.abi";
import { toast } from "react-toastify";

export const DEX = () => {
  const chains = useChains();
  const router = useRouter();
  const account = useAccount();
  const search = useSearchParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const [destinationChain, setDestinationChain] = useState<Chain>();
  const [inputAmount, setInputAmount] = useState(0);
  const [userTxns, setUserTxns] = useState<any[]>([]);
  const [selectedAdId, setSelectedAdId] = useState("");
  const [showClaimButton, setShowClaimButton] = useState(false);
  const [claimButtonText, setClaimButtonText] = useState("claim");
  const [selectedTxn, setSelectedTxn] = useState<any>();

  const { writeContractAsync } = useWriteContract();

  const [tab, setTab] = useState(0);

  const { signMessageAsync } = useSignMessage();

  useEffect(() => {
    if (tab == 1 && account.address) {
      getWalletTxn();
    }
  }, [tab, account.address]);

  useEffect(() => {
    const history = search.get("history");
    if (history) {
      setTab(1);
    } else {
      setTab(0);
    }
  }, []);

  const getWalletTxn = async () => {
    const response = await fetch(
      `/api/get-wallet-tx?walletAddress=${account.address}`
    );
    const data = await response.json();
    setUserTxns(data.data);
  };

  const claimAd = async () => {
    if (claimButtonText === "dashboard") {
      router.push("/interface");
      return;
    }

    const client = new SignProtocolClient(SpMode.OffChain, {
      signType: OffChainSignType.EvmEip712,
    });
    const schema = process.env.NEXT_PUBLIC_AD_SCHEMA_ID;

    const attestationInfo = await client.createAttestation({
      schemaId: schema!, //schemaInfo.schemaId or other schemaId
      data: { ad_id: selectedAdId, viewed: true, wallet: account.address },
      indexingValue: `${schema!}_index`,
    });

    const signature = await signMessageAsync({
      message: JSON.stringify({
        attestation_id: attestationInfo.attestationId,
        associated_ad_id: selectedAdId,
        from_chain: destinationChain?.name,
      }),
    });

    await fetch("/api/claim-ad", {
      method: "POST",
      body: JSON.stringify({
        msgSignature: signature,
        attestationId: attestationInfo.attestationId,
        schemaId: schema!,
        txnId: selectedTxn._id,
      }),
    });

    setClaimButtonText("dashboard");
  };

  const swap = async () => {
    if (account.address) {
      const targetChainId = destinationChain?.id;
      const targetContract = CONTRACTS[`${destinationChain?.id}`]
        .adlink as string;
      const adapterContract = CONTRACTS[`${account?.chainId}`]
        .adapter as string;
      const adlinkContract = CONTRACTS[`${account?.chainId}`].adlink as string;

      await writeContractAsync({
        abi: ADLINK_ABI,
        address: `0x${adlinkContract.slice(2)}`,
        functionName: "approve",
        args: [adapterContract, inputAmount],
      });

      const signature = await writeContractAsync({
        abi: ADAPTER_ABI,
        address: `0x${adapterContract.slice(2)}`,
        functionName: "relayTokens",
        args: [targetChainId, targetContract, account.address, inputAmount],
      });

      toast(`transaction ${signature}`);

      await fetch("/api/save-tx", {
        method: "POST",
        body: JSON.stringify({
          tx: signature,
          walletAddress: account.address,
          fromChainId: account.chainId,
          from_chain: account.chain?.name,
        }),
      });
    } else {
      alert("connect wallet first");
    }
  };

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

          <button
            className="bg-premium-black flex justify-center items-center space-x-2 w-full mt-10 p-4 rounded-md text-premium-gold"
            onClick={swap}
          >
            <p>Swap</p>
            <BsFillLightningChargeFill />
          </button>
        </div>
      ) : (
        <div className="">
          {selectedAdId !== "" && (
            <div className="h-[40vh] w-full bg-premium-black mt-10 rounded-lg overflow-hidden relative">
              <video
                src={`https://ipfs.io/ipfs/${selectedAdId}`}
                autoPlay
                loop
              ></video>
              {showClaimButton && (
                <button
                  className="bg-premium-black text-white cursor-pointer px-6 py-2 z-10 absolute top-1/2 left-0 right-0 capitalize"
                  onClick={claimAd}
                >
                  {claimButtonText === "dashboard" ? (
                    <div className="flex justify-center items-center space-x-2">
                      <p>{claimButtonText}</p>
                      <AiOutlineLink />
                    </div>
                  ) : (
                    claimButtonText
                  )}
                </button>
              )}
            </div>
          )}

          <div className="w-full mt-10 border-collapse  overflow-hidden">
            <div className="sticky top-0 grid grid-cols-[1fr,2fr,3fr,2fr,1fr] w-full">
              <p className="">Id</p>
              <p className="text-center">Chain</p>
              <p className="text-center">Hash</p>
              <p className=""></p>
              <p className=""></p>
            </div>

            <div className="max-h-[20vh]  overflow-y-scroll ">
              {userTxns.length === 0 ? (
                <div className="mt-10">Empty</div>
              ) : (
                [...userTxns].map((d, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-[1fr,2fr,3fr,2fr,1fr] w-full mt-2 capitalize odd:bg-premium-black odd:text-white p-2 `}
                  >
                    <p>{i + 1}</p>
                    <p className="text-center">{d.from_chain}</p>
                    <p className="text-center">0xaa93...575ce0</p>
                    <p
                      className={`underline underline-offset-2 text-center cursor-pointer ${
                        d.viewed !== false ? "text-red-400" : "text-green-400"
                      }`}
                      onClick={() => {
                        if (d.viewed) {
                          toast("already viewed");
                          return;
                        }
                        setSelectedAdId(d.associated_ad_id);
                        setSelectedTxn(d);
                        setTimeout(() => {
                          setShowClaimButton(true);
                        }, 5000);
                      }}
                    >
                      View Ad
                    </p>
                    <p className="underline underline-offset-2 flex justify-center items-center">
                      <IoRefreshCircle
                        className={`text-[20px] cursor-pointer ${
                          d.viewed !== false ? "text-red-400" : "text-green-400"
                        }`}
                      />
                    </p>
                  </div>
                ))
              )}
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
