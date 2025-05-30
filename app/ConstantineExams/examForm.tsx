"use client";

import { useState } from "react";
import type { ExamPreset } from "@/data/exams";
import CustomButton from "@/AppComponents/UI/CustomButton";
import { IconButton } from "@/AppComponents/UI/IconButton";

interface PresetQuizFormProps {
  exam: ExamPreset;
  onBack: () => void;
}

// Helper function to parse answer strings into arrays
const parseAnswerSets = (answerString: string): string[][] => {
  if (!answerString) return [[]];
  // Convert "A,B|A,C" into [["A", "B"], ["A", "C"]]
  return answerString.split("|").map((set) => set.split(","));
};

// Helper function to handle both string and array formats of answers
const getAnswerSets = (answer: any): string[][] => {
  if (!answer) return [[]];
  // If it's already an array of arrays, return as is
  if (Array.isArray(answer) && Array.isArray(answer[0]))
    return answer as string[][];
  // If it's a string, parse it ("A,B|C,D" format)
  if (typeof answer === "string")
    return answer.split("|").map((set) => set.split(","));
  // If it's a single array, wrap it
  if (Array.isArray(answer)) return [answer as string[]];
  return [[]];
};

export default function ExamForm({ exam, onBack }: PresetQuizFormProps) {
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [result, setResult] = useState<{
    totalScore: number;
    grade: number;
    countedQuestions: number;
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
    let countedQuestions = 0;

    const numQuestionsInt =
      typeof exam.numQuestions === "string"
        ? Number.parseInt(exam.numQuestions, 10)
        : exam.numQuestions;

    for (let i = 1; i <= numQuestionsInt; i++) {
      const possibleAnswerSets = getAnswerSets(exam.correctAnswers[i]);
      if (possibleAnswerSets[0].length === 0) continue;

      const userAns = userAnswers[i] || [];
      countedQuestions++;
      let questionScore = 0;

      switch (exam.testType) {
        case "QCSs":
          // Accept if any user answer matches any correct answer in any set
          if (
            possibleAnswerSets.some((correctSet) =>
              userAns.some((answer) => correctSet.includes(answer))
            )
          ) {
            questionScore = 1;
          }
          break;

        case "allOrNothing":
          // Accept if user answers exactly match any of the possible answer sets
          if (
            possibleAnswerSets.some(
              (correctSet) =>
                correctSet.length === userAns.length &&
                correctSet.every((answer) => userAns.includes(answer)) &&
                userAns.every((answer) => correctSet.includes(answer))
            )
          ) {
            questionScore = 1;
          }
          break;

        case "partiallyPositive":
          // Calculate partial credit for each answer set and use the highest score
          questionScore = Math.max(
            ...possibleAnswerSets.map((correctSet) => {
              let score = 0;
              for (const answer of userAns) {
                if (correctSet.includes(answer)) {
                  // Add points for correct answers
                  score += 1 / correctSet.length;
                } else {
                  // Subtract points for incorrect answers
                  score -= 1 / correctSet.length;
                }
              }
              return score;
            })
          );
          break;

        case "partiallyNegative":
          // Calculate partial credit but zero out score for any incorrect answer
          questionScore = Math.max(
            ...possibleAnswerSets.map((correctSet) => {
              let score = 0;
              for (const answer of userAns) {
                if (correctSet.includes(answer)) {
                  score += 1 / correctSet.length;
                } else {
                  // Any wrong answer zeroes the score
                  score = 0;
                  break;
                }
              }
              return score;
            })
          );
          break;
      }

      totalScore += Math.max(questionScore, 0);
    }

    const gradePerQuestion = countedQuestions > 0 ? 20 / countedQuestions : 0;
    const grade = totalScore * gradePerQuestion;

    setResult({
      totalScore,
      grade,
      countedQuestions,
    });
  };

  return (
    <div className="w-full p-1">
      <div className="flex items-center mb-4 px-4">
        <IconButton onClick={onBack}></IconButton>
        <h2 className="text-4xl font-bold ml-4">{exam.name}</h2>
      </div>

      <div className="p-4 bg-light rounded-lg">
        <p className="px-2 py-1 text-lg font-semibold text-dark">
          <strong>Description:</strong> {exam.description}
        </p>

        <p className="px-2 py-1 text-base text-dark">
          <strong>Module:</strong> {exam.subject}
        </p>
        <p className="px-2 py-1 text-base text-dark">
          <strong>Nombre de Questions:</strong> {exam.numQuestions}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="flex flex-wrap gap-2 mb-2">
            <p className="p-2 py-1 bg-yellow-300 rounded-full text-sm text-dark">
              {exam.year}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            <p className="p-2 py-1 bg-yellow-300 rounded-full text-sm text-dark">
              {exam.speciality}
            </p>
          </div>
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
      </div>

      <div id="answerInputs" className="space-y-2 w-full">
        <div id="userTitle" className="text-center mt-2">
          <h4 className="text-lg md:text-xl font-bold">
            Entrez vos réponses pour chaque question:
          </h4>
        </div>

        {/* User answers section */}
        {Array.from(
          {
            length:
              typeof exam.numQuestions === "string"
                ? Number.parseInt(exam.numQuestions, 10)
                : exam.numQuestions,
          },
          (_, i) => (
            <div
              key={`user-${i + 1}`}
              className="answer-group md:gap-2 md:mb-6 flex flex-col md:mx-50">
              <p className="font-base text-center mt-3 mb-2">
                <b>Question {i + 1}</b> <em>(Sélectionnez votre réponse)</em>
              </p>
              {generateCheckboxes(i + 1)}
            </div>
          )
        )}

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
              {result.countedQuestions}
            </h5>
          </div>
        )}
      </div>
    </div>
  );
}
