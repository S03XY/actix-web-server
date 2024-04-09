import { ConnectButton } from "@rainbow-me/rainbowkit";
import { IoRefreshCircle } from "react-icons/io5";

export const InterfaceModule = () => {
  return (
    <div className="max-w-[700px] mx-auto">
      <div className="flex justify-between items-center mt-10">
        <div className="flex justify-start items-center space-x-6"></div>
        <ConnectButton chainStatus={"none"} />
      </div>

      <div className="flex justify-between items-center mt-10">
        <p className="capitalize">redeemable points: 20</p>

        <button className="hover:bg-premium-black hover:text-white p-2 px-4 rounded-lg">Claim</button>
      </div>

      <div>
        <div className="w-full mt-10 border-collapse  overflow-hidden">
          <div className="sticky top-0 grid grid-cols-[1fr,1fr,2fr,2fr,2fr,1fr,1fr] w-full">
            <p className="">Claimed</p>
            <p className="text-center">Status</p>
            <p className="text-center">Source</p>
            <p className="text-center">Destination</p>
            <p className="text-center">Source Hash</p>
            <p className="text-center">Point</p>
            <p className=""></p>
          </div>

          <div className="max-h-[50vh]  overflow-y-scroll  ">
            {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((d, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr,1fr,2fr,2fr,2fr,1fr,1fr] w-full mt-2 odd:bg-premium-black odd:text-white py-2 px-2"
              >
                <p>{i + 1}</p>
                <p className="text-center">Pending</p>
                <p className="text-center">Gnosis chiado</p>
                <p className="text-center">Gnosis chiado</p>
                <p className="text-center">0xaa93...575ce0</p>
                <p className="text-center">1</p>
                <p className="text-center flex justify-center items-center">
                  <IoRefreshCircle className="text-[20px] cursor-pointer" />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
