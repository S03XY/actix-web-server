require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
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
  etherscan: {},
};
