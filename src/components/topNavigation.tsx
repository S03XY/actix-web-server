import Logo from "@/assets/seahorse.svg";
import Image from "next/image";

export const TopNavigation = () => {
  return (
    <div>
      <div className="bg-premium-black flex flex-col justify-center items-center p-2 text-white space-y-2 shadow-lg shadow-slate-900">
        <Image src={Logo} alt="Logo" />
        <p className="text-lg">Adlink</p>
      </div>
      <div className="flex justify-center items-center p-2 py-4 border-[1px] border-premium-black">Get more from your transaction</div>
    </div>
  );
};
