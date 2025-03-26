import Background from "../UI/background";
import CustomButton from "../UI/button";
import NumbreOfQuestions from "./numbreOfQuestions";
import TypeOfCorrection from "./typeOfCorrection";

export default function HeroSection() {
  return (
    <div className="md:w-6/12">
      <Background />
      <div className="relative z-10">
        <NumbreOfQuestions />
        <TypeOfCorrection />
        <CustomButton />
      </div>
    </div>
  );
}
