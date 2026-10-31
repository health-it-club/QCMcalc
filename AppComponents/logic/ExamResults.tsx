"use client";

import { useState } from "react";
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  RotateCcw,
  Edit3,
  Printer,
  ChevronRight,
  Filter,
} from "lucide-react";
import type { ExamEvaluationResult } from "@/lib/qcm-engine";

interface ExamResultsProps {
  evaluation: ExamEvaluationResult;
  examTitle?: string;
  scoringMethodName?: string;
  onModifyAnswers: () => void;
  onReset: () => void;
}

export default function ExamResults({
  evaluation,
  examTitle = "Résultats de l'évaluation",
  scoringMethodName,
  onModifyAnswers,
  onReset,
}: ExamResultsProps) {
  const [filter, setFilter] = useState<"all" | "wrong" | "partial" | "correct">(
    "all"
  );

  const {
    grade,
    totalScore,
    countedQuestions,
    correctCount,
    partialCount,
    wrongCount,
    unansweredCount,
    questions,
  } = evaluation;

  // Grade color and mention
  let mention = "Ajourné";
  let gradeColor = "text-rose-400";
  let gradeBg = "bg-rose-500/10 border-rose-500/20";
  let strokeColor = "#f43f5e";

  if (grade >= 16) {
    mention = "Très Bien - Admis";
    gradeColor = "text-emerald-400";
    gradeBg = "bg-emerald-500/10 border-emerald-500/20";
    strokeColor = "#10b981";
  } else if (grade >= 14) {
    mention = "Bien - Admis";
    gradeColor = "text-teal-400";
    gradeBg = "bg-teal-500/10 border-teal-500/20";
    strokeColor = "#14b8a6";
  } else if (grade >= 12) {
    mention = "Assez Bien - Admis";
    gradeColor = "text-blue-400";
    gradeBg = "bg-blue-500/10 border-blue-500/20";
    strokeColor = "#3b82f6";
  } else if (grade >= 10) {
    mention = "Passable - Admis";
    gradeColor = "text-amber-400";
    gradeBg = "bg-amber-500/10 border-amber-500/20";
    strokeColor = "#f59e0b";
  }

  // Filtered list
  const filteredQuestions = questions.filter((q) => {
    if (filter === "correct") return q.status === "correct";
    if (filter === "partial") return q.status === "partial";
    if (filter === "wrong")
      return q.status === "wrong" || q.status === "unanswered";
    return true;
  });

  // Circular gauge calculation
  const circleRadius = 48;
  const circumference = 2 * Math.PI * circleRadius;
  const percentage = Math.min(100, Math.max(0, (grade / 20) * 100));
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6 pb-20 sm:pb-6">
      {/* Hero Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-4 sm:p-8 backdrop-blur-md shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 relative z-10">
          {/* Left Details */}
          <div className="text-center sm:text-left space-y-2.5 w-full sm:w-auto">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${gradeBg} ${gradeColor}`}>
              <Award className="w-4 h-4" />
              {mention}
            </span>

            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              {examTitle}
            </h2>

            {scoringMethodName && (
              <p className="text-xs sm:text-sm text-zinc-400">
                Barème : <span className="text-zinc-200 font-medium">{scoringMethodName}</span>
              </p>
            )}

            <p className="text-[11px] sm:text-xs text-zinc-500">
              {countedQuestions} questions • Score brut : {totalScore.toFixed(2)} pts
            </p>

            {/* Quick Actions for phone */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                type="button"
                onClick={onModifyAnswers}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-700 transition border border-zinc-700 active:scale-95 cursor-pointer">
                <Edit3 className="w-4 h-4 text-blue-400" />
                <span>Modifier mes réponses</span>
              </button>

              <button
                type="button"
                onClick={onReset}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-700 transition border border-zinc-700 active:scale-95 cursor-pointer">
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>Recommencer</span>
              </button>
            </div>
          </div>

          {/* Right Circular Gauge */}
          <div className="relative flex flex-col items-center justify-center shrink-0">
            <svg className="w-32 h-32 sm:w-36 sm:h-36 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r={circleRadius}
                stroke="#27272a"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r={circleRadius}
                stroke={strokeColor}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-3xl sm:text-4xl font-black tracking-tight ${gradeColor}`}>
                {grade.toFixed(2)}
              </span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                sur 20
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                {percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* 2x2 Metric Cards on Phone */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-6 pt-5 border-t border-zinc-800">
          <div className="p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800 flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white">{correctCount}</div>
              <div className="text-[11px] text-zinc-400">Correctes</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800 flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white">{partialCount}</div>
              <div className="text-[11px] text-zinc-400">Partielles</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800 flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-rose-500/10 text-rose-400">
              <XCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white">{wrongCount}</div>
              <div className="text-[11px] text-zinc-400">Erreurs</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800 flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-zinc-500/10 text-zinc-400">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white">{unansweredCount}</div>
              <div className="text-[11px] text-zinc-400">Non répondues</div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-4 sm:p-6 backdrop-blur-md shadow-xl space-y-3.5">
        {/* Header & Filter Pills */}
        <div className="space-y-2 pb-3 border-b border-zinc-800">
          <h3 className="text-base sm:text-lg font-bold text-white">
            Analyse détaillée par question
          </h3>

          {/* Horizontally scrollable filter pills on phone */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition shrink-0 ${
                filter === "all"
                  ? "bg-zinc-800 text-white shadow"
                  : "bg-zinc-950 text-zinc-400"
              }`}>
              Toutes ({questions.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("wrong")}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition shrink-0 ${
                filter === "wrong"
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                  : "bg-zinc-950 text-zinc-400"
              }`}>
              Fautes ({wrongCount + unansweredCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter("partial")}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition shrink-0 ${
                filter === "partial"
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                  : "bg-zinc-950 text-zinc-400"
              }`}>
              Partielles ({partialCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter("correct")}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition shrink-0 ${
                filter === "correct"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : "bg-zinc-950 text-zinc-400"
              }`}>
              Correctes ({correctCount})
            </button>
          </div>
        </div>

        {/* Questions Detailed List */}
        <div className="space-y-2.5">
          {filteredQuestions.length === 0 ? (
            <div className="p-8 text-center text-zinc-400 text-xs">
              Aucune question dans cette catégorie.
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const formattedCorrect = q.correctAnswers
                .map((set) => set.join(", "))
                .join(" OU ");

              const formattedUser =
                q.userAnswers.length > 0 ? q.userAnswers.join(", ") : "—";

              let badgeStyle = "bg-rose-500/10 text-rose-400 border-rose-500/30";
              let statusLabel = "0.0 pt";
              if (q.status === "correct") {
                badgeStyle = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
                statusLabel = "+1.0 pt";
              } else if (q.status === "partial") {
                badgeStyle = "bg-amber-500/10 text-amber-400 border-amber-500/30";
                statusLabel = `+${q.score.toFixed(2)} pt`;
              } else if (q.status === "unanswered") {
                badgeStyle = "bg-zinc-800 text-zinc-400 border-zinc-700";
                statusLabel = "Non répondue";
              }

              return (
                <div
                  key={q.questionNumber}
                  className="p-3 sm:p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs sm:text-sm text-zinc-200">
                      Question {q.questionNumber < 10 ? `0${q.questionNumber}` : q.questionNumber}
                    </span>
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${badgeStyle}`}>
                      {statusLabel}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                    <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800/80">
                      <div className="text-[10px] text-zinc-500 font-sans mb-0.5">Votre choix :</div>
                      <div
                        className={`font-bold ${
                          q.status === "correct"
                            ? "text-emerald-400"
                            : q.status === "partial"
                            ? "text-amber-400"
                            : "text-rose-400"
                        }`}>
                        {formattedUser}
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800/80">
                      <div className="text-[10px] text-zinc-500 font-sans mb-0.5">Corrigé :</div>
                      <div className="font-bold text-white">{formattedCorrect}</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
