import HowDoesItWorkLanding from "@/myComponents/HowDoesItwork/HowDoesItWorkLanding";
import NavigationBar from "@/myComponents/navigation/navigationBar";

export default function HowDoesItWork() {
  return (
    <div className="flex flex-col items-center">
      <NavigationBar />
      <HowDoesItWorkLanding />
    </div>
  );
}
