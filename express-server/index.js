const express = require("express");
const app = express();

const { ArbitrumRelayer } = require("./relayers/arbitrum.relayer");

ArbitrumRelayer();

app.listen(3001, () => {
  console.log("listening on http://localhost:3001");
});
