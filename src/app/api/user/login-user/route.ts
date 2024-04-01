import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "../../../../../utils/db.utils";
import { User } from "../../../../../server/schema/user-schema";

export const GET = async (req: NextRequest) => {
  const url = req.nextUrl;
  const name = url.searchParams.get("name");
  const walletAddress = url.searchParams.get("walletAddress");


  await getConnection();

  const doesExits = await  User.findOne({ $or: [{ walletAddress }, { name }] });

  if (!doesExits) {
    return new Response(null, { status: 500 });
  }

  return NextResponse.json(doesExits);
};

export const POST = async (req: NextRequest) => {
  return Response.json({});
};
