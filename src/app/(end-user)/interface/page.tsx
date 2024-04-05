import { SwapModule } from "@/modules/swap";
import { TxTable } from "@/modules/txTable";

const InterfacePage = () => {
  return (
    <div className="fixed h-[100vh] w-full bg-premium-black grid grid-cols-2">
      <div className="h-full w-full flex justify-center items-center">
        <SwapModule />
      </div>
      <div className="p-6 border-l-[1px] border-premium-soft-white/50">
        <h1 className="text-premium-soft-white text-2xl flex justify-between items-center">
          <p>Transaction</p>
          <button className="text-sm bg-white text-premium-black p-2 px-4 rounded-lg" >Claim</button>
        </h1>
        <TxTable />
      </div>
    </div>
  );
};

export default InterfacePage;
