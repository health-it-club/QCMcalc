import HowDoesItWorkLanding from "@/app/HowDoesItWork/HowDoesItWorkLanding";
import NavigationBar from "@/AppComponents/navigation/navigationBar";

export default function HowDoesItWork() {
  return (
    <div className="flex flex-col items-center">
      <NavigationBar />
      <HowDoesItWorkLanding />
    </div>
  );
}
