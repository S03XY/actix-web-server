const express = require("express");
const app = express();

const { ArbitrumRelayer } = require("./relayers/arbitrum.relayer");
const { GnosisRelayer } = require("./relayers/gnosis.relayer");
const { AvailRelayer } = require("./relayers/avail.relayer");
const { MorphRelayer } = require("./relayers/morph.relayer");
const { NeonRelayer } = require("./relayers/neon.relayer");

ArbitrumRelayer();
AvailRelayer();
GnosisRelayer();
MorphRelayer();
NeonRelayer();

app.listen(3001, () => {
  console.log("listening on http://localhost:3001");
});
