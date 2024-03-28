import { headers } from "next/headers";
import { SwitchComponent } from "./switchComponent";

export const TopNavigation = () => {
  const header = headers();
  const path = header.get("next-url");

  return (
    <div className="h-[30vh] bg-premium-black flex justify-center items-center text-white flex-col">
      <div className="flex-1 flex justify-center items-center flex-col space-y-2">
        <h1 className="text-center text-2xl">Adlink</h1>
        <h3 className="text-center text-lg capitalize">
          Get more for transacting
        </h3>
      </div>

      <SwitchComponent />
    </div>
  );
};
