import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  return NextResponse.json({ 1: 1 });
};
