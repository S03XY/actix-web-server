require("@nomicfoundation/hardhat-toolbox");

const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    arbitrum: {
      url: process.env.ARBITRUM,
      accounts: [process.env.DEPLOYER],
    },
    avail: {
      url: process.env.AVAIL,
      accounts: [process.env.DEPLOYER],
    },
    gnosis: {
      url: process.env.GNOSIS,
      accounts: [process.env.DEPLOYER],
    },
    morph: {
      url: process.env.MORPH,
      accounts: [process.env.DEPLOYER],
    },
    neon: {
      url: process.env.NEON,
      accounts: [process.env.DEPLOYER],
    },
  },
  etherscan: {
    apiKey: {
      arbitrum: process.env.ARBITRUM_API,
      avail: process.env.AVAIL_API,
      gnosis: process.env.GNOSIS_API,
    },
    customChains: [
      {
        network: "arbitrum",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
        },
      },
      {
        network: "gnosis",
        chainId: 10200,
        urls: {
          apiURL: "https://gnosis.blockscout.com/api/v2/",
        },
      },
      {
        network: "opdemo",
        chainId: 20240219,
        urls: {
          apiURL: "https://op-demo-explorer.alt.technology/api",
          browserURL: "https://op-demo-explorer.alt.technology",
        },
      },
    ],
  },
};
