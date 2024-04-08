const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const RelayerModule = buildModule("RelayerModule", (m) => {
  //   const name = m.getParameter("name", "Adlink");
  //   const symbol = m.getParameter("symbol", "ADL");

  const relayer = m.contract("Relayer");
  return { relayer };
});

module.exports = RelayerModule;
