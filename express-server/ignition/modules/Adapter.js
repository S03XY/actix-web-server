const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const hardhat = require("@nomicfoundation/hardhat-toolbox");

const AdapterModule = buildModule("AdapterModule", (m) => {
  const adapter = m.contract("AdlinkAdapter", []);
  return { adapter };
});

module.exports = AdapterModule;
