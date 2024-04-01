import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "../../../../../utils/db.utils";
import { User } from "../../../../../server/schema/user-schema";
import { SiweMessage } from "siwe";
import {
  SignProtocolClient,
  SpMode,
  EvmChains,
  OffChainSignType,
  OffChainRpc,
} from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";

export const POST = async (req: NextRequest) => {
  const { message, signature, name, walletAddress } = await req.json();

  const swieMessage = new SiweMessage(message);
  const field = await swieMessage.verify({ signature });

  if (!field.success) {
    return new Response(null, { status: 500 });
  }

  await getConnection();

  const user = new User({
    name: name,
    walletAddress,
  });

  const doesExits = await User.findOne({ walletAddress, name });

  if (doesExits) {
    return new Response(null, { status: 500 });
  }

  const resp = await user.save();

  return NextResponse.json(resp);
};
