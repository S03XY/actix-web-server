const { defineChain } = require("viem");

const demoAvail = defineChain({
  id: 202402021700,
  name: "Avail",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://op-avail-sepolia.alt.technology"],
      webSocket: ["wss://op-avail-sepolia.alt.technology"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://op-avail-sepolia-explorer.alt.technology",
    },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 5882,
    },
  },
});

module.exports = { demoAvail };
