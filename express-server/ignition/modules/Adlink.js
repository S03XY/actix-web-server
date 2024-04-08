const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const AdlinkModule = buildModule("AdlinkModule", (m) => {
  // const name = m.getParameter("name", "Adlink");
  // const symbol = m.getParameter("symbol", "ADL");

  const adlinkv2 = m.contract("AdlinkToken", ["Adlink", "ADL"]);
  return { adlinkv2 };
});

module.exports = AdlinkModule;
