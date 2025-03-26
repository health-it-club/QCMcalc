import HeroSection from "@/myComponents/home/heroSection";
import NavigationBar from "@/myComponents/navigation/navigationBar";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <NavigationBar />
      <HeroSection />
    </div>
  );
}
