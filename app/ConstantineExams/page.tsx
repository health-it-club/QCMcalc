import ConstantineExamsLanding from "@/myComponents/ConstantineExams/ConstantineExamsLanding";
import NavigationBar from "@/myComponents/navigation/navigationBar";

export default function ConstantineExams() {
  return (
    <div className="flex flex-col items-center">
      <NavigationBar />
      <ConstantineExamsLanding />
    </div>
  );
}
