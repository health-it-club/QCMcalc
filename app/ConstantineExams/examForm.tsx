"use client";

import { useState } from "react";
import type { ExamPreset } from "@/data/exams";
import AnswerGrille from "@/AppComponents/logic/AnswerGrille";
import ExamResults from "@/AppComponents/logic/ExamResults";
import { evaluateExam, type ScoringMethod, type ExamEvaluationResult } from "@/lib/qcm-engine";
import { ArrowLeft, Calculator, Clock } from "lucide-react";

interface PresetQuizFormProps {
  exam: ExamPreset;
  onBack: () => void;
}

const SCORING_LABELS: Record<string, string> = {
  QCSs: "QCS (Choix Simple)",
  allOrNothing: "QCM Tout ou Rien",
  partiallyNegative: "Partielle (Constantine)",
  partiallyPositive: "Partielle Américaine",
};

export default function ExamForm({ exam, onBack }: PresetQuizFormProps) {
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [evaluation, setEvaluation] = useState<ExamEvaluationResult | null>(null);

  const numQuestions =
    typeof exam.numQuestions === "string"
      ? parseInt(exam.numQuestions, 10)
      : exam.numQuestions;

  const scoringMethod = (exam.testType as ScoringMethod) || "partiallyNegative";
  const scoringName = SCORING_LABELS[exam.testType] || exam.testType;

  const answeredCount = Object.keys(userAnswers).filter(
    (k) => (userAnswers[Number(k)] || []).length > 0
  ).length;

  const handleCalculate = () => {
    if (answeredCount === 0) {
      if (!confirm("Vous n'avez répondu à aucune question. Calculer quand même la note ?")) {
        return;
      }
    }

    const result = evaluateExam(
      numQuestions,
      scoringMethod,
      exam.correctAnswers,
      userAnswers
    );

    setEvaluation(result);
  };

  const handleReset = () => {
    setEvaluation(null);
    setUserAnswers({});
  };

  if (evaluation) {
    return (
      <ExamResults
        evaluation={evaluation}
        examTitle={exam.name}
        scoringMethodName={scoringName}
        onModifyAnswers={() => setEvaluation(null)}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Exam Header */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-4 sm:p-5 rounded-3xl backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 sm:p-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white transition border border-zinc-700 cursor-pointer active:scale-95 shrink-0 mt-0.5">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {exam.year}
              </span>
              {exam.session && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {exam.session}
                </span>
              )}
              {exam.speciality && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {exam.speciality}
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
              {exam.name}
            </h2>
            <p className="text-[11px] sm:text-xs text-zinc-400">
              Barème : {scoringName}
            </p>
          </div>
        </div>

        {/* Calculate button for tablet/desktop */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={handleCalculate}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 shadow-lg shadow-emerald-500/20 transition cursor-pointer">
            <Calculator className="w-4 h-4" />
            <span>Calculer ma note</span>
          </button>
        </div>
      </div>

      {/* Answer Grille with Mobile Sticky Bottom Calculate Bar */}
      <AnswerGrille
        numQuestions={numQuestions}
        answers={userAnswers}
        onChange={setUserAnswers}
        label="Feuille de Réponse de l'Étudiant"
        badge={`${answeredCount}/${numQuestions} cochées`}
        onCalculate={handleCalculate}
        calculateButtonLabel="Calculer ma note"
      />
    </div>
  );
}
