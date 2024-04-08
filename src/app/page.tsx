import { DEX } from "@/components/dex";
import { TopNavigation } from "@/components/topNavigation";

import dynamic from "next/dynamic";

// const DynamicDex = dynamic(async () => (await import("@/components/dex")).DEX, {
//   ssr: false,
// });

export default function HomePage() {
  return (
    <div>
      <TopNavigation />
      <DEX />
    </div>
  );
}
