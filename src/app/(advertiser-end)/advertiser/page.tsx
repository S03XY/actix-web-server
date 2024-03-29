import { TopNavigation } from "@/components/topNavigation";
import { LoginInterface } from "@/modules/loginInterface";

export default function Home() {
  return (
    <main className="">
      <div className="h-[30vh]">
        <TopNavigation />
      </div>
      <div className="h-[70vh]">
        <LoginInterface />
      </div>
    </main>
  );
}
