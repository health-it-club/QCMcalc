"use client";

import { useState } from "react";
import type { ExamPreset } from "@/data/exams";
import CustomButton from "@/AppComponents/UI/CustomButton";
import { IconButton } from "@/AppComponents/UI/IconButton";

interface PresetQuizFormProps {
  exam: ExamPreset;
  onBack: () => void;
}

export default function ExamForm({ exam, onBack }: PresetQuizFormProps) {
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [result, setResult] = useState<{
    totalScore: number;
    grade: number;
  } | null>(null);

  const handleCheckboxChange = (questionNumber: number, letter: string) => {
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
  };

  const generateCheckboxes = (questionNumber: number) => {
    const answers = userAnswers[questionNumber] || [];

    return (
      <div className="flex flex-col gap-1 items-center">
        {["A", "B", "C", "D", "E"].map((letter) => (
          <div key={letter} className="flex items-center gap-1 w-full">
            <input
              type="checkbox"
              id={`${letter}User${questionNumber}`}
              className="absolute opacity-0 cursor-pointer h-0 w-0 peer"
              checked={answers.includes(letter)}
              onChange={() => handleCheckboxChange(questionNumber, letter)}
            />
            <label
              htmlFor={`${letter}User${questionNumber}`}
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

  const calculateGrade = () => {
    let totalScore = 0;

    for (let i = 1; i <= exam.numQuestions; i++) {
      const correctAns = exam.correctAnswers[i] || [];
      const userAns = userAnswers[i] || [];
      let questionScore = 0;
      const numCorrectAnswers = correctAns.length;

      if (numCorrectAnswers === 0) continue; // Skip if no correct answers defined

      switch (exam.testType) {
        case "QCSs":
        case "allOrNothing":
          if (arraysEqual(correctAns, userAns)) {
            questionScore = 1;
          } else {
            questionScore = 0;
          }
          break;
        case "partiallyPositive":
          for (const answer of userAns) {
            if (correctAns.includes(answer)) {
              questionScore += 1 / numCorrectAnswers;
            } else {
              questionScore -= 1 / numCorrectAnswers;
            }
          }
          break;
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

    const gradePerQuestion = 20 / exam.numQuestions;
    const grade = totalScore * gradePerQuestion;

    setResult({
      totalScore,
      grade,
    });
  };

  return (
    <div className="w-full p-1">
      <div className="flex justify-between items-center mb-4 px-4">
        <IconButton onClick={onBack}></IconButton>
        <span></span>
        <h2 className="text-4xl font-bold">{exam.name}</h2>
      </div>

      <div className="p-4 bg-light rounded-lg">
        <p className="px-2 py-1 text-lg font-semibold text-dark">
          <strong>Description:</strong> {exam.description}
        </p>
        <p className="px-2 py-1 text-base text-dark">
          <strong>Année:</strong> {exam.year}
        </p>
        <p className="px-2 py-1 text-base text-dark">
          <strong>Module:</strong> {exam.subject}
        </p>
        <p className="px-2 py-1 text-sm text-dark">
          <strong>Nombre de questions:</strong> {exam.numQuestions}
        </p>
        <div className="flex flex-wrap gap-2 mb-2">
          <p className="p-2 py-1 bg-yellow-300 rounded-full text-sm text-dark">
            {exam.testType === "QCSs"
              ? "QCS (Question à choix simple)"
              : exam.testType === "allOrNothing"
              ? "QCM Tout ou Rien"
              : exam.testType === "partiallyNegative"
              ? "QCM Partielle"
              : "QCM Système Américain"}
          </p>
        </div>
      </div>

      <div id="answerInputs" className="space-y-2 w-full">
        <div id="userTitle" className="text-center mt-2">
          <h4 className="text-lg md:text-xl font-bold">
            Entrez vos réponses pour chaque question:
          </h4>
        </div>

        {/* User answers section */}
        {Array.from({ length: exam.numQuestions }, (_, i) => (
          <div
            key={`user-${i + 1}`}
            className="answer-group md:gap-2 md:mb-6 flex flex-col md:mx-50">
            <p className="font-base text-center mt-3 mb-2">
              <b>Question {i + 1}</b> <em>(Sélectionnez votre réponse)</em>
            </p>
            {generateCheckboxes(i + 1)}
          </div>
        ))}

        <div className="flex justify-center mt-8 mb-8">
          <CustomButton onClick={calculateGrade}>Calculer ma note</CustomButton>
        </div>

        {/* Results div generation*/}
        {result && (
          <div
            id="result"
            className={`mt-8 py-30 w-full ${
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
              {exam.numQuestions}
            </h5>
          </div>
        )}
      </div>
    </div>
  );
}
