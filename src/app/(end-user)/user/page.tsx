import { TopNavigation } from "@/components/topNavigation";
import { LoginInterface } from "@/modules/loginInterface";

export default function UserPage() {
  return (
    <div>
      <div className="h-[30vh]">
        <TopNavigation />
      </div>
      <div className="h-[70vh]">
        <LoginInterface />
      </div>
    </div>
  );
}
