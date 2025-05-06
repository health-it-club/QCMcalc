"use client";

import { useState } from "react";
import CustomButton from "../UI/CustomButton";

//Props and state
interface CalculatorProps {
  numQuestions: number;
  testType: string;
}

export default function Calculator({
  numQuestions,
  testType,
}: CalculatorProps) {
  const [correctAnswers, setCorrectAnswers] = useState<
    Record<number, string[]>
  >({});
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [result, setResult] = useState<{
    totalScore: number;
    grade: number;
    countedQuestions: number;
  } | null>(null);

  //Checkbox Handler
  const handleCheckboxChange = (
    questionNumber: number,
    type: string,
    letter: string
  ) => {
    if (type === "Correct") {
      setCorrectAnswers((prev) => {
        const current = prev[questionNumber] || [];
        if (current.includes(letter)) {
          return {
            ...prev,
            [questionNumber]: current.filter((item) => item !== letter),
          };
        } else {
          return {
            ...prev,
            [questionNumber]: [...current, letter],
          };
        }
      });
    } else {
      setUserAnswers((prev) => {
        const current = prev[questionNumber] || [];
        if (current.includes(letter)) {
          return {
            ...prev,
            [questionNumber]: current.filter((item) => item !== letter),
          };
        } else {
          return {
            ...prev,
            [questionNumber]: [...current, letter],
          };
        }
      });
    }
  };

  //Checkbox generation
  const generateCheckboxes = (questionNumber: number, type: string) => {
    const answers =
      type === "Correct"
        ? correctAnswers[questionNumber] || []
        : userAnswers[questionNumber] || [];

    return (
      <div className="flex flex-col gap-1 items-center">
        {["A", "B", "C", "D", "E"].map((letter) => (
          <div key={letter} className="flex items-center gap-1 w-full">
            <input
              type="checkbox"
              id={`${letter}${type}${questionNumber}`}
              className="absolute opacity-0 cursor-pointer h-0 w-0 peer"
              checked={answers.includes(letter)}
              onChange={() =>
                handleCheckboxChange(questionNumber, type, letter)
              }
            />
            <label
              htmlFor={`${letter}${type}${questionNumber}`}
              className="flex justify-center items-center 
              px-5 py-2.5 my-1
              bg-light text-dark
              border-2 border-solid border-dark
              rounded-3xl
              cursor-pointer select-none 
              transition-all duration-300 ease-linear 
              box-border w-full
              peer-checked:bg-blue peer-checked:text-light
              hover:peer-checked:bg-blue-400 hover:bg-light-300">
              {letter}
            </label>
          </div>
        ))}
      </div>
    );
  };

  const arraysEqual = (a: string[], b: string[]) => {
    if (a.length !== b.length) return false;
    return a.every((val) => b.includes(val));
  };

  //The actual Calculator
  const calculateGrade = () => {
    let totalScore = 0;
    let countedQuestions = 0;

    for (let i = 1; i <= numQuestions; i++) {
      const correctAns = correctAnswers[i] || [];
      const userAns = userAnswers[i] || [];

      // Skip if no correct answers defined
      if (correctAns.length === 0) continue;

      // Count this as a valid question
      countedQuestions++;

      let questionScore = 0;
      const numCorrectAnswers = correctAns.length;

      switch (testType) {
        // QCS gives credit if at least one correct answer is selected
        case "QCSs":
          // Check if user has selected at least one correct answer
          if (userAns.some((answer) => correctAns.includes(answer))) {
            questionScore = 1;
          } else {
            questionScore = 0;
          }
          break;

        // allOrNothing requires all correct answers and nothing else
        case "allOrNothing":
          // Check if user selected all correct answers and nothing else
          if (
            correctAns.every((answer) => userAns.includes(answer)) &&
            userAns.every((answer) => correctAns.includes(answer))
          ) {
            questionScore = 1;
          } else {
            questionScore = 0;
          }
          break;

        // Systeme americain
        case "partiallyPositive":
          for (const answer of userAns) {
            if (correctAns.includes(answer)) {
              questionScore += 1 / numCorrectAnswers;
            } else {
              questionScore -= 1 / numCorrectAnswers;
            }
          }
          break;

        // Systeme de constantine
        case "partiallyNegative":
          for (const answer of userAns) {
            if (correctAns.includes(answer)) {
              questionScore += 1 / numCorrectAnswers;
            } else {
              questionScore = 0;
              break;
            }
          }
          break;
      }

      totalScore += Math.max(questionScore, 0);
    }

    // Calculate grade based on counted questions instead of total questions
    const gradePerQuestion = countedQuestions > 0 ? 20 / countedQuestions : 0;
    const grade = totalScore * gradePerQuestion;

    // Les resultats
    setResult({
      totalScore,
      grade,
      countedQuestions, // Added countedQuestions to be consistent with the first component
    });
  };

  //The acutal generation
  return (
    <div className="w-full mx-auto p-1">
      <div id="answerInputs" className="space-y-2 w-full">
        <div id="ctTitle" className="text-center mt-2">
          <h4 className="text-lg md:text-xl font-bold">
            Veuillez entrer les réponses correctes pour chaque question:
          </h4>
        </div>

        {/* Correct answers section */}
        {Array.from({ length: numQuestions }, (_, i) => (
          <div
            key={`correct-${i + 1}`}
            className="answer-group md:gap-2 md:mb-6 flex flex-col md:mx-50">
            <p className="text-base text-center mt-3 mb-2">
              <b>Question {i + 1}</b> <em>(Sélectionnez la bonne réponse)</em>
            </p>
            {generateCheckboxes(i + 1, "Correct")}
          </div>
        ))}

        <div id="userTitle" className="text-center mt-2">
          <h4 className="text-lg md:text-xl font-bold">
            Entrez vos réponses pour chaque question:
          </h4>
        </div>

        {/* User answers section */}
        {Array.from({ length: numQuestions }, (_, i) => (
          <div
            key={`user-${i + 1}`}
            className="answer-group md:gap-2 md:mb-6 flex flex-col md:mx-50">
            <p className="font-base text-center mt-3 mb-2">
              <b>Question {i + 1}</b> <em>(Sélectionnez votre réponse)</em>
            </p>
            {generateCheckboxes(i + 1, "User")}
          </div>
        ))}

        <div className="flex justify-center mt-8 mb-8">
          <CustomButton onClick={calculateGrade}>Calculer ma note</CustomButton>
        </div>

        {/* Results div generation*/}
        {result && (
          <div
            id="result"
            className={`mt-8 py-30 w-full h-full ${
              result.grade >= 10
                ? "bg-green-500"
                : result.grade < 10
                ? "bg-red-500"
                : "bg-blue"
            }`}>
            <h3 className="text-center font-bold text-4xl">
              Votre Note Finale
            </h3>
            <h1 className="text-center font-bold text-5xl my-2">
              {result.grade.toFixed(2)}/20
            </h1>
            <h5 className="text-xl text-center mb-5">
              Nombre de réponses correctes: {result.totalScore.toFixed(2)} sur{" "}
              {
                Object.keys(correctAnswers).filter(
                  (key) => correctAnswers[Number(key)]?.length > 0
                ).length
              }
            </h5>
          </div>
        )}
      </div>
    </div>
  );
}
