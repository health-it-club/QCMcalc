"use client";

import { useState } from "react";
import Background from "../UI/background";
import CustomButton from "../UI/button";
import NumbreOfQuestions from "./numbreOfQuestions";
import TypeOfCorrection from "./typeOfCorrection";
import QuizForm from "../logic/calculator";

export default function MainSection() {
  //State
  const [numQuestions, setNumQuestions] = useState<number>(0); //The number of questions
  const [testType, setTestType] = useState<string>("QCSs"); //Correction Type
  const [showQuiz, setShowQuiz] = useState<boolean>(false); //Displaying the form

  //Upadtes Question number
  const handleNumQuestionsChange = (value: number) => {
    setNumQuestions(value);
  };

  //Updates test type
  const handleTestTypeChange = (value: string) => {
    setTestType(value);
  };

  //Generates the form
  const handleNext = () => {
    if (numQuestions > 0) {
      setShowQuiz(true);
    } else {
      alert("Veuillez entrer un nombre de questions valide");
    }
  };

  //The Render
  return (
    <div className="w-full">
      <Background />
      <div className="relative z-10">
        <NumbreOfQuestions onChange={handleNumQuestionsChange} />
        <TypeOfCorrection onChange={handleTestTypeChange} />
        <div className="mb-8">
          <CustomButton onClick={handleNext} />
        </div>

        {showQuiz && (
          <QuizForm numQuestions={numQuestions} testType={testType} />
        )}
      </div>
    </div>
  );
}
