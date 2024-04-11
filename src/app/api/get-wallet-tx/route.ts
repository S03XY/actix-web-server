import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "../../../../utils/db.utils";

export const GET = async (req: NextRequest) => {
  const walletAddress = req.nextUrl.searchParams.get("walletAddress");

  const connection = await getConnection();
  const walletTxns = await connection
    ?.collection("txn")
    .find({ wallet_address: walletAddress })
    .toArray();

  return NextResponse.json({ status: 200, data: walletTxns });
};
