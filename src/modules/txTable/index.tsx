"use client";

import { useState } from "react";

export const TxTable = () => {
  const [viewAd, setViewAd] = useState(false);

  return (
    <div className="text-white w-full mt-10">
      <div className="space-y-10">
        <div className="flex justify-between items-center">
          <p>
            0x6cb50ace31e7b24f46be34cdc6b084bb945172c940dcfae8b34903e94f5cf6a5{" "}
          </p>

          <p
            className="underline capitalize cursor-pointer"
            onClick={() => {
              setViewAd(true);
            }}
          >
            view ad
          </p>
        </div>

        {viewAd && (
          <div>
            <div className="w-full h-[50vh] border-[1px] border-white rounded-lg">
              s
            </div>
            <div className="flex justify-center items-center bg-white text-premium-black rounded-lg py-4 mt-10 capitalize">
              Claim ad points
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
