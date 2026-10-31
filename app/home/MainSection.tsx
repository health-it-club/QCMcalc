"use client";

import { useState } from "react";
import Background from "../../AppComponents/UI/background";
import NumbreOfQuestions from "./numbreOfQuestions";
import TypeOfCorrection from "./typeOfCorrection";
import QuizForm from "../../AppComponents/logic/calculator";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

export default function MainSection() {
  const [numQuestions, setNumQuestions] = useState<number>(30);
  const [testType, setTestType] = useState<string>("partiallyNegative");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);

  const handleNext = () => {
    if (numQuestions > 0) {
      setShowQuiz(true);
    } else {
      alert("Veuillez sélectionner un nombre de questions valide (ex: 20, 30, 40).");
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-70px)] flex flex-col justify-center items-center py-4 sm:py-8 px-3 sm:px-4">
      <Background />

      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {!showQuiz ? (
          <div className="space-y-5 sm:space-y-6 text-center animate-in fade-in duration-300">
            {/* Hero Header */}
            <div className="space-y-2 sm:space-y-3 max-w-2xl mx-auto px-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Calculateur de QCM Médicaux</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Calculez votre note d'examen instantanément.
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg mx-auto">
                Grille interactive tactile ergonomique adaptée aux smartphones ou saisie rapide par copié-collé.
              </p>
            </div>

            {/* Inputs Container */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-4 sm:p-8 backdrop-blur-md shadow-2xl space-y-5 sm:space-y-6 text-left">
              <NumbreOfQuestions
                value={numQuestions}
                onChange={setNumQuestions}
              />

              <div className="w-full border-t border-zinc-800" />

              <TypeOfCorrection
                value={testType}
                onChange={setTestType}
              />

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-sm sm:text-base font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/25 active:scale-95 transition cursor-pointer">
                  <span>Ouvrir la feuille de réponse</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between px-1">
              <button
                type="button"
                onClick={() => setShowQuiz(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 transition active:scale-95">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Modifier les paramètres</span>
              </button>

              <span className="text-[11px] text-zinc-400 font-medium">
                {numQuestions} questions
              </span>
            </div>

            <QuizForm
              numQuestions={numQuestions}
              testType={testType}
              onResetParams={() => setShowQuiz(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
