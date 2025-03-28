import MainSection from "@/myComponents/home/MainSection";
import NavigationBar from "@/myComponents/navigation/navigationBar";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <NavigationBar />
      <MainSection />
    </div>
  );
}
