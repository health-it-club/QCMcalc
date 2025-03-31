import MainSection from "@/app/home/MainSection";
import NavigationBar from "@/AppComponents/navigation/navigationBar";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <NavigationBar />
      <MainSection />
    </div>
  );
}
