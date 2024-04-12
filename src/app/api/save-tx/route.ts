import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "../../../../utils/db.utils";

export const POST = async (req: NextRequest) => {
  const { tx, walletAddress, fromChainId, from_chain, destination_chain } =
    await req.json();
  const connection = await getConnection();

  const ads = await connection
    ?.collection("ads")
    .aggregate([{ $sample: { size: 1 } }])
    .toArray();

  const ad = ads![0];

  const insertedData = await connection?.collection("txn").insertOne({
    tx,
    wallet_address: walletAddress,
    associated_ad_id: ad.adId,
    from_chain_id: fromChainId,
    from_chain: from_chain,
    viewed: false,
    points: 0,
    destination_chain: destination_chain,
  });

  return NextResponse.json({
    status: 200,
    data: insertedData,
  });
};
