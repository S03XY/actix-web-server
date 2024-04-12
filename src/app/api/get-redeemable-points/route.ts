import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "../../../../utils/db.utils";

export const GET = async (req: NextRequest) => {
  const walletAddress = req.nextUrl.searchParams.get("walletAddress");

  console.log("wallet address", walletAddress);

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

  return NextResponse.json({ data });
};
