import { headers } from "next/headers";
import { SwitchComponent } from "./switchComponent";

import { GiSeahorse } from "react-icons/gi";
import Seahorse from "@/assets/seahorse.svg";
import Image from "next/image";

export const TopNavigation = () => {
  const header = headers();
  const path = header.get("next-url");

  return (
    <div className="h-full  bg-premium-black flex justify-center items-center text-white flex-col">
      <div className="flex-1 flex justify-center items-center flex-col space-y-2">
        <div className="text-center flex justify-center items-center space-x-4">
          {/* <GiSeahorse className="text-[64px]" /> */}
          <Image src={Seahorse} alt="" className="text-[64px]" />
          <p className="text-2xl ">Adlink</p>
        </div>
        <h3 className="text-center text-lg capitalize">
          Make your transactions a treat
        </h3>
      </div>

      <SwitchComponent />
    </div>
  );
};
