import { NextRequest, NextResponse } from "next/server";
import { verifyMessage } from "viem";
import { getConnection } from "../../../../utils/db.utils";
import { Types } from "mongoose";

export const POST = async (req: NextRequest) => {
  const { msgSignature, schemaId, attestationId, txnId } = await req.json();

  const connection = await getConnection();
  const txnData: any = await connection
    ?.collection("txn")
    .findOne({ _id: new Types.ObjectId(txnId) });

  console.log(txnData);

  const message = {
    attestation_id: attestationId,
    associated_ad_id: txnData.associated_ad_id,
    from_chain: txnData.from_chain,
  };

  await connection?.collection("txn").updateOne(
    { _id: new Types.ObjectId(txnId) },
    {
      $inc: { points: 2 },
      $set: { viewed: true },
    }
  );

  await connection
    ?.collection("ads")
    .updateOne(
      { adId: txnData.associated_ad_id },
      { $inc: { creadits: -2, viewed: 1 } }
    );

  //   const isValid = await verifyMessage({
  //     signature: msgSignature,
  //     address: txnData.wallet_address,
  //     message: JSON.stringify(message),
  //   });

  //   if (!false) {
  //     throw new Error("invalid signature");
  //   }

  return NextResponse.json({});
};
