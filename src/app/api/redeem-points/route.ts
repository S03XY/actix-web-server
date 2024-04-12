import { NextRequest, NextResponse } from "next/server";
import {
  createPublicClient,
  createWalletClient,
  http,
  parseEther,
  verifyMessage,
} from "viem";
import { getConnection } from "../../../../utils/db.utils";
import { arbitrum, arbitrumSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

export const POST = async (req: NextRequest) => {
  const { msgSignature, walletAddress } = await req.json();

  const connection = await getConnection();

  const data = await connection
    ?.collection("txn")
    .aggregate([
      {
        $match: {
          wallet_address: walletAddress,
          viewed: true, // Filter documents where viewed is false
        },
      },
      {
        $group: {
          _id: "$_id",
          total: { $sum: "$points" },
        },
      },
    ])
    .toArray();

  if (data && data.length > 0) {
    const isVerified = verifyMessage({
      message: `claiming ${data[0].total}`,
      signature: msgSignature,
      address: walletAddress,
    });

    if (!isVerified) {
      throw new Error("Invalid signature");
    }

    const pc = createPublicClient({
      transport: http(),
      chain: arbitrumSepolia,
    });

    const wc = createWalletClient({
      transport: http(),
      chain: arbitrumSepolia,
      account: privateKeyToAccount(`0x${process.env.NEXT_PUBLIC_AIRDROPPER!}`),
    });

    const airdropTx = await wc.sendTransaction({
      to: walletAddress,
      value: parseEther("0.000001"),
    });

    // console.log("waiting for rece")
    // await pc.waitForTransactionReceipt({ hash: airdropTx });

    await connection?.collection("txn").bulkWrite([
      {
        updateMany: {
          filter: { points: { $eq: 2 } },
          update: { $set: { points: 0 } },
        },
      },
    ]);

    return NextResponse.json({ airdropTx });
  } else {
    throw new Error("invalid claim");
  }
};
