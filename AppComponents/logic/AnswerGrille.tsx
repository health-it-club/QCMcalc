"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ClipboardPaste, Trash2, Keyboard, Check, Sparkles, ChevronRight, Hash } from "lucide-react";
import QuickPasteModal from "./QuickPasteModal";

interface AnswerGrilleProps {
  numQuestions: number;
  answers: Record<number, string[]>;
  onChange: (answers: Record<number, string[]>) => void;
  label?: string;
  badge?: string;
  onCalculate?: () => void;
  calculateButtonLabel?: string;
}

const LETTERS = ["A", "B", "C", "D", "E"];

export default function AnswerGrille({
  numQuestions,
  answers,
  onChange,
  label = "Vos Réponses",
  badge,
  onCalculate,
  calculateButtonLabel = "Calculer ma note",
}: AnswerGrilleProps) {
  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const [isPasteOpen, setIsPasteOpen] = useState(false);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const pagerRef = useRef<HTMLDivElement>(null);

  // Toggle single letter for question with tactile haptic feedback (if supported)
  const toggleLetter = useCallback(
    (qNum: number, letter: string) => {
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate(10);
        } catch {
          // Ignore if blocked
        }
      }

      const current = answers[qNum] || [];
      let updated: string[];
      if (current.includes(letter)) {
        updated = current.filter((l) => l !== letter);
      } else {
        updated = [...current, letter].sort();
      }
      onChange({
        ...answers,
        [qNum]: updated,
      });
    },
    [answers, onChange]
  );

  // Scroll active question into view on mobile
  const scrollToQuestion = (qNum: number) => {
    setActiveQuestion(qNum);
    const elem = questionRefs.current[qNum];
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const key = e.key.toUpperCase();

      if (LETTERS.includes(key)) {
        e.preventDefault();
        toggleLetter(activeQuestion, key);
        return;
      }

      const numMap: Record<string, string> = {
        "1": "A",
        "2": "B",
        "3": "C",
        "4": "D",
        "5": "E",
      };
      if (numMap[key]) {
        e.preventDefault();
        toggleLetter(activeQuestion, numMap[key]);
        return;
      }

      if (e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault();
        setActiveQuestion((prev) => (prev < numQuestions ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveQuestion((prev) => (prev > 1 ? prev - 1 : prev));
      } else if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        onChange({
          ...answers,
          [activeQuestion]: [],
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeQuestion, answers, numQuestions, onChange, toggleLetter]);

  // Answered count
  const answeredCount = Object.keys(answers).filter(
    (key) => (answers[Number(key)] || []).length > 0
  ).length;

  const percentComplete = Math.round((answeredCount / (numQuestions || 1)) * 100);

  const handleApplyPaste = (parsed: Record<number, string[]>) => {
    onChange({
      ...answers,
      ...parsed,
    });
  };

  const handleClearAll = () => {
    if (confirm("Effacer toutes les réponses de cette grille ?")) {
      onChange({});
    }
  };

  return (
    <div className="w-full space-y-3 pb-20 sm:pb-4">
      {/* Container card */}
      <div className="w-full bg-zinc-900/90 border border-zinc-800 rounded-3xl p-3.5 sm:p-6 backdrop-blur-md shadow-xl space-y-4">
        {/* Header with Stats & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-xl font-bold text-white tracking-tight">
                {label}
              </h3>
              {badge && (
                <span className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {badge}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-zinc-400">
                <b>{answeredCount}</b> sur {numQuestions} cochées ({percentComplete}%)
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPasteOpen(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl text-xs font-semibold bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 transition border border-blue-500/20 cursor-pointer active:scale-95">
              <ClipboardPaste className="w-4 h-4" />
              <span>Saisie Rapide</span>
            </button>

            {answeredCount > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="flex items-center justify-center gap-1 px-3 py-2 sm:py-1.5 rounded-xl text-xs text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition border border-zinc-800 cursor-pointer active:scale-95">
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Vider</span>
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${percentComplete}%` }}
          />
        </div>

        {/* Phone Question Navigator Strip (Quick-jump scrollbar for thumbs) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-zinc-500 px-1">
            <span className="flex items-center gap-1">
              <Hash className="w-3 h-3" />
              Accès rapide :
            </span>
            <span>Question {activeQuestion} sur {numQuestions}</span>
          </div>

          <div
            ref={pagerRef}
            className="flex items-center gap-1.5 overflow-x-auto py-1 px-0.5 no-scrollbar touch-pan-x">
            {Array.from({ length: numQuestions }, (_, idx) => {
              const qNum = idx + 1;
              const isFilled = (answers[qNum] || []).length > 0;
              const isActive = activeQuestion === qNum;

              return (
                <button
                  key={qNum}
                  type="button"
                  onClick={() => scrollToQuestion(qNum)}
                  className={`min-w-[34px] h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center shrink-0 select-none ${
                    isActive
                      ? "bg-blue-600 text-white ring-2 ring-blue-400 shadow-md scale-105"
                      : isFilled
                      ? "bg-zinc-800 text-zinc-200 border border-zinc-700"
                      : "bg-zinc-950/60 text-zinc-500 border border-zinc-900"
                  }`}>
                  {qNum}
                </button>
              );
            })}
          </div>
        </div>

        {/* Questions Grid: Single wide column on phone, 2 cols on tablet, 3 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
          {Array.from({ length: numQuestions }, (_, i) => {
            const qNum = i + 1;
            const userChoices = answers[qNum] || [];
            const isAnswered = userChoices.length > 0;
            const isActive = activeQuestion === qNum;

            return (
              <div
                key={qNum}
                ref={(el) => {
                  questionRefs.current[qNum] = el;
                }}
                onClick={() => setActiveQuestion(qNum)}
                className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border transition-all cursor-pointer ${
                  isActive
                    ? "bg-zinc-800/90 border-blue-500 shadow-md ring-1 ring-blue-500/30"
                    : isAnswered
                    ? "bg-zinc-950/70 border-zinc-800 hover:border-zinc-700"
                    : "bg-zinc-950/40 border-zinc-800/60 hover:border-zinc-700"
                }`}>
                {/* Question Number Badge */}
                <div className="flex items-center gap-2 min-w-[50px]">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-1 rounded-lg ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : isAnswered
                        ? "bg-zinc-800 text-zinc-200"
                        : "bg-zinc-900 text-zinc-500"
                    }`}>
                    Q{qNum < 10 ? `0${qNum}` : qNum}
                  </span>
                </div>

                {/* Touch-Friendly Bubble Buttons A, B, C, D, E */}
                <div className="flex items-center gap-1.5 sm:gap-2 flex-1 justify-end">
                  {LETTERS.map((letter) => {
                    const isChecked = userChoices.includes(letter);
                    return (
                      <button
                        key={letter}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveQuestion(qNum);
                          toggleLetter(qNum, letter);
                        }}
                        className={`w-9 h-10 sm:w-8 sm:h-9 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center select-none active:scale-90 touch-manipulation cursor-pointer ${
                          isChecked
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/40 ring-1 ring-blue-400 scale-105"
                            : "bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
                        }`}>
                        {letter}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Sticky Bottom Floating Bar for Thumb Submission */}
      {onCalculate && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-3 px-4 bg-zinc-950/95 border-t border-zinc-800/90 backdrop-blur-xl sm:hidden flex items-center justify-between gap-3 shadow-2xl safe-area-bottom">
          <div className="flex flex-col">
            <span className="text-[11px] text-zinc-400">Progression</span>
            <span className="text-xs font-bold text-white">
              {answeredCount}/{numQuestions} répondue{answeredCount > 1 ? "s" : ""}
            </span>
          </div>

          <button
            type="button"
            onClick={onCalculate}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 font-extrabold text-sm shadow-lg shadow-emerald-500/25 active:scale-95 transition cursor-pointer">
            <span>{calculateButtonLabel}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Saisie Rapide Modal */}
      <QuickPasteModal
        isOpen={isPasteOpen}
        onClose={() => setIsPasteOpen(false)}
        onApply={handleApplyPaste}
        totalQuestions={numQuestions}
        title={`Saisie Rapide - ${label}`}
      />
    </div>
  );
}
