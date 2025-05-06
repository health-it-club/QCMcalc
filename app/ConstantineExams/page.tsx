import NavigationBar from "@/AppComponents/navigation/navigationBar";
import ExamPageContent from "./examPageContent";

export default function ConstantineExams() {
  return (
    <div className="flex flex-col items-center">
      <NavigationBar />
      <ExamPageContent />
    </div>
  );
}
