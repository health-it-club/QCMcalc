"use client";

import { useState } from "react";
import AnswerGrille from "./AnswerGrille";
import ExamResults from "./ExamResults";
import { evaluateExam, type ScoringMethod, type ExamEvaluationResult } from "@/lib/qcm-engine";
import { KeyRound, UserCheck, ArrowRight, ArrowLeft, Calculator as CalcIcon } from "lucide-react";

interface CalculatorProps {
  numQuestions: number;
  testType: string;
  onResetParams?: () => void;
}

const SCORING_NAMES: Record<string, string> = {
  QCSs: "QCS (Choix Simple)",
  allOrNothing: "QCM Tout ou Rien",
  partiallyNegative: "Partielle (Constantine)",
  partiallyPositive: "Partielle Américaine",
};

export default function Calculator({
  numQuestions,
  testType,
  onResetParams,
}: CalculatorProps) {
  const [activeTab, setActiveTab] = useState<"answers" | "key">("answers");
  const [correctAnswers, setCorrectAnswers] = useState<Record<number, string[]>>({});
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [evaluation, setEvaluation] = useState<ExamEvaluationResult | null>(null);

  const scoringMethod = (testType as ScoringMethod) || "partiallyNegative";
  const scoringName = SCORING_NAMES[testType] || testType;

  const keyCount = Object.keys(correctAnswers).filter(
    (k) => (correctAnswers[Number(k)] || []).length > 0
  ).length;

  const answersCount = Object.keys(userAnswers).filter(
    (k) => (userAnswers[Number(k)] || []).length > 0
  ).length;

  const handleCalculate = () => {
    if (keyCount === 0) {
      alert("Veuillez renseigner la clé de correction (onglet 'Clé de Correction').");
      setActiveTab("key");
      return;
    }

    const result = evaluateExam(
      numQuestions,
      scoringMethod,
      correctAnswers,
      userAnswers
    );

    setEvaluation(result);
  };

  const handleResetAll = () => {
    setEvaluation(null);
    setCorrectAnswers({});
    setUserAnswers({});
    if (onResetParams) {
      onResetParams();
    }
  };

  if (evaluation) {
    return (
      <ExamResults
        evaluation={evaluation}
        examTitle={`Examen Personnalisé (${numQuestions} Questions)`}
        scoringMethodName={scoringName}
        onModifyAnswers={() => setEvaluation(null)}
        onReset={handleResetAll}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Tab Switcher - Phone Ergonomic (50/50 split) */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-1.5 rounded-2xl backdrop-blur-md shadow-lg">
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("answers")}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition active:scale-95 cursor-pointer ${
              activeTab === "answers"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                : "text-zinc-400 hover:text-white"
            }`}>
            <UserCheck className="w-4 h-4 shrink-0" />
            <span>Vos Réponses</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeTab === "answers" ? "bg-blue-700 text-white" : "bg-zinc-800 text-zinc-400"
              }`}>
              {answersCount}/{numQuestions}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("key")}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition active:scale-95 cursor-pointer ${
              activeTab === "key"
                ? "bg-amber-600 text-white shadow-md shadow-amber-500/25"
                : "text-zinc-400 hover:text-white"
            }`}>
            <KeyRound className="w-4 h-4 shrink-0" />
            <span>Corrigé / Clé</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeTab === "key" ? "bg-amber-700 text-white" : "bg-zinc-800 text-zinc-400"
              }`}>
              {keyCount}/{numQuestions}
            </span>
          </button>
        </div>
      </div>

      {/* Grille View */}
      {activeTab === "answers" ? (
        <AnswerGrille
          numQuestions={numQuestions}
          answers={userAnswers}
          onChange={setUserAnswers}
          label="Vos Réponses Étudiant"
          badge={`${answersCount}/${numQuestions} cochées`}
          onCalculate={handleCalculate}
          calculateButtonLabel="Calculer ma note"
        />
      ) : (
        <AnswerGrille
          numQuestions={numQuestions}
          answers={correctAnswers}
          onChange={setCorrectAnswers}
          label="Clé de Correction Officielle"
          badge={`${keyCount}/${numQuestions} définies`}
          onCalculate={() => setActiveTab("answers")}
          calculateButtonLabel="Valider la clé"
        />
      )}

      {/* Desktop/Tablet Calculate Footer */}
      <div className="hidden sm:flex items-center justify-between p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-400">
        <div>
          Barème : <b className="text-zinc-200">{scoringName}</b>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === "answers" ? (
            <button
              type="button"
              onClick={() => setActiveTab("key")}
              className="text-amber-400 hover:underline flex items-center gap-1 font-semibold">
              Renseigner la clé de correction
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveTab("answers")}
              className="text-blue-400 hover:underline flex items-center gap-1 font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" />
              Retourner à mes réponses
            </button>
          )}

          <button
            type="button"
            onClick={handleCalculate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 font-extrabold hover:from-emerald-400 hover:to-teal-400 transition shadow-lg shadow-emerald-500/20 cursor-pointer">
            <CalcIcon className="w-4 h-4" />
            <span>Calculer ma note</span>
          </button>
        </div>
      </div>
    </div>
  );
}
