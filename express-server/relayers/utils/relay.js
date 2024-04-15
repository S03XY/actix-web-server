const dotenv = require("dotenv");
const {
  createWalletClient,
  http,
  parseEther,
  createPublicClient,
  parseGwei,
} = require("viem");
const { gnosisChiado, arbitrumSepolia, neonDevnet } = require("viem/chains");
const { privateKeyToAccount } = require("viem/accounts");

const { demoAvail } = require("../custom chain/demo-avail");

dotenv.config("../.env");

const Relay = async (chainId, target, data) => {
  console.log(chainId, target, data);
  console.log(getChainFromChainId(chainId).id);

  let chain = getChainFromChainId(chainId);

  const wClient = createWalletClient({
    transport: http(),
    chain,
    account: privateKeyToAccount(`0x${process.env.DEPLOYER}`),
  });

  const pClient = createPublicClient({
    transport: http(),
    chain,
  });

  const transactionReq = await pClient.prepareTransactionRequest({
    to: target,
    data,
    account: privateKeyToAccount(`0x${process.env.DEPLOYER}`),
  });

  const signature = await wClient.signTransaction(transactionReq);

  const hash = await wClient.sendRawTransaction({
    serializedTransaction: signature,
  });

  console.log(hash);
};

module.exports = { Relay };

const getChainFromChainId = (chainId) => {
  switch (chainId) {
    case "10200":
      return gnosisChiado;
    case "421614":
      return arbitrumSepolia;
    case "245022926":
      return neonDevnet;
    case "202402021700":
      return demoAvail;
    case "2710":
      return morphSepolia;
  }
};
