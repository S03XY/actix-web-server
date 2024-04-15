const {
  createPublicClient,
  http,
  parseEther,
  formatEther,
  parseUnits,
  createWalletClient,
  parseGwei,
} = require("viem");
const { arbitrumSepolia, gnosisChiado, neonDevnet } = require("viem/chains");
const { Relay } = require("../relayers/utils/relay");

const dotenv = require("dotenv");
const abi = require("../ignition/deployments/chain-421614/artifacts/RelayerModule#Relayer.json");
const adlinkabi = require("../ignition/deployments/chain-421614/artifacts/AdlinkModule#AdlinkToken.json");

const { encodeFunctionData } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");

dotenv.config({ path: "../.env" });

const NeonRelayer = async () => {
  const pubClient = createPublicClient({
    transport: http(),
    chain: neonDevnet,
  });

  // test

  // const wClient = createWalletClient({
  //   transport: http(),
  //   chain: gnosisChiado,
  //   account: privateKeyToAccount(`0x${process.env.DEPLOYER}`),
  // });

  // const pClient = createPublicClient({
  //   transport: http(),
  //   chain: gnosisChiado,
  // });

  // const transactionReq = await pClient.prepareTransactionRequest({
  //   to: "0x87Db43f0118d85eca6E13d546363CC155f6cC1f7",
  //   data,
  //   account: privateKeyToAccount(`0x${process.env.DEPLOYER}`),
  // });

  // const signature = await wClient.signTransaction(transactionReq);

  // const hash = await wClient.sendRawTransaction({
  //   serializedTransaction: signature,
  // });

  // console.log(hash);

  // testend

  pubClient.watchContractEvent({
    abi: abi.abi,
    address: process.env.NEON_RELAYER_CONTRACT,
    eventName: "ERelay",
    onLogs: async (logs) => {
      // console.log("event logs", logs);

      await Relay(
        logs[0].args.chainId.toString(),
        logs[0].args.target,
        logs[0].args.data
      );
      //   switch (logs[0].args.chainId.toString()) {
      //     case "10200":
      //       await Relay(
      //         logs[0].args.chainId.toString(),
      //         logs[0].args.target,
      //         logs[0].args.data
      //       );

      //       break;

      //     case "421614":
      //       await Relay(
      //         logs[0].args.chainId.toString(),
      //         logs[0].args.target,
      //         logs[0].args.data
      //       );

      //       break;

      //     case "421614":
      //       await Relay(
      //         logs[0].args.chainId.toString(),
      //         logs[0].args.target,
      //         logs[0].args.data
      //       );

      //       break;

      //     default:
      //       console.log(
      //         "chain id not supported",
      //         logs[0].args.chainId.toString()
      //       );
      //   }
    },
  });
};

module.exports = { NeonRelayer };
