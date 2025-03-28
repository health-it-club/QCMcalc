"use client";

import { useState } from "react";
import CustomButton from "../UI/button";

//Props and state
interface QuizFormProps {
  numQuestions: number;
  testType: string;
}

export default function QuizForm({ numQuestions, testType }: QuizFormProps) {
  const [correctAnswers, setCorrectAnswers] = useState<
    Record<number, string[]>
  >({});
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [result, setResult] = useState<{
    totalScore: number;
    grade: number;
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
      <div className="flex gap-4">
        {["A", "B", "C", "D", "E"].map((letter) => (
          <div key={letter} className="flex items-center gap-1">
            <input
              type="checkbox"
              id={`${letter}${type}${questionNumber}`}
              className="checkboxInput"
              checked={answers.includes(letter)}
              onChange={() =>
                handleCheckboxChange(questionNumber, type, letter)
              }
            />
            <label
              htmlFor={`${letter}${type}${questionNumber}`}
              className="checkboxLabel">
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

    for (let i = 1; i <= numQuestions; i++) {
      const correctAns = correctAnswers[i] || [];
      const userAns = userAnswers[i] || [];
      let questionScore = 0;
      const numCorrectAnswers = correctAns.length;

      if (numCorrectAnswers === 0) continue; // Skip if no correct answers defined

      switch (testType) {
        //QCSs et tt ou rien sont la meme chose
        case "QCSs":
        case "allOrNothing":
          if (arraysEqual(correctAns, userAns)) {
            questionScore = 1;
          } else {
            questionScore = 0;
          }
          break;

        //Systeme americain
        case "partiallyPositive":
          for (const answer of userAns) {
            if (correctAns.includes(answer)) {
              questionScore += 1 / numCorrectAnswers;
            } else {
              questionScore -= 1 / numCorrectAnswers;
            }
          }
          break;

        //Systeme de constantine
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

      //Nombre de questions corrected
      totalScore += Math.max(questionScore, 0);
    }

    //La note sur 20
    const gradePerQuestion = 20 / numQuestions;
    const grade = totalScore * gradePerQuestion;

    //Les resultats
    setResult({
      totalScore,
      grade,
    });
  };

  //The acutal generation
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div id="answerInputs" className="space-y-8">
        <div id="ctTitle" className="mt-8">
          <h4 className="text-lg md:text-xl font-bold">
            Veuillez entrer les réponses correctes pour chaque question:
          </h4>
        </div>

        {/* Correct answers section */}
        {Array.from({ length: numQuestions }, (_, i) => (
          <div
            key={`correct-${i + 1}`}
            className="answer-group space-y-2 p-4 rounded-lg">
            <p className="font-medium">
              <b>Question {i + 1}</b> <em>(Sélectionnez la bonne réponse)</em>
            </p>
            {generateCheckboxes(i + 1, "Correct")}
          </div>
        ))}

        <div id="userTitle" className="mt-8">
          <h4 className="text-lg md:text-xl font-bold">
            Entrez vos réponses pour chaque question:
          </h4>
        </div>

        {/* User answers section */}
        {Array.from({ length: numQuestions }, (_, i) => (
          <div
            key={`user-${i + 1}`}
            className="answer-group space-y-2 p-4 rounded-lg">
            <p className="font-medium">
              <b>Question {i + 1}</b> <em>(Sélectionnez votre réponse)</em>
            </p>
            {generateCheckboxes(i + 1, "User")}
          </div>
        ))}

        <div className="flex justify-center mt-8">
          <CustomButton onClick={calculateGrade}>Calculer ma note</CustomButton>
        </div>

        {/* Results div generation*/}
        {result && (
          <div id="result" className="mt-8 p-6 rounded-lg">
            <h4 className="text-xl font-bold mb-2">Résultats</h4>
            <h5 className="text-lg mb-1">
              Nombre de réponses correctes: {result.totalScore.toFixed(2)} sur{" "}
              {numQuestions}
            </h5>
            <h5 className="text-lg font-bold">
              Votre note finale: {result.grade.toFixed(2)}/20
            </h5>
          </div>
        )}
      </div>
    </div>
  );
}
