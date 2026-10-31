"use client";

import { useState } from "react";
import { parseAnswersText } from "@/lib/qcm-engine";
import { ClipboardPaste, Check, X, Sparkles, AlertCircle } from "lucide-react";

interface QuickPasteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (parsedAnswers: Record<number, string[]>) => void;
  totalQuestions: number;
  title?: string;
  subtitle?: string;
}

export default function QuickPasteModal({
  isOpen,
  onClose,
  onApply,
  totalQuestions,
  title = "Saisie Rapide des Réponses",
  subtitle = "Collez vos réponses sous n'importe quel format (ex: 1: AC, 2: B...)",
}: QuickPasteModalProps) {
  const [rawText, setRawText] = useState("");

  if (!isOpen) return null;

  const parsed = parseAnswersText(rawText, totalQuestions);
  const detectedCount = Object.keys(parsed).length;

  const handleApply = () => {
    onApply(parsed);
    onClose();
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setRawText(text);
    } catch {
      // Clipboard access denied or unsupported, user can manually paste into textarea
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full sm:max-w-lg bg-zinc-900 border-t sm:border border-zinc-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Mobile handle indicator */}
        <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <ClipboardPaste className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">{title}</h3>
              <p className="text-xs text-zinc-400">{subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition active:scale-95">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-3 overflow-y-auto">
          {/* Prominent One-Tap Paste button on phone */}
          <button
            type="button"
            onClick={handlePasteClipboard}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-blue-400 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition active:scale-98">
            <Sparkles className="w-4 h-4" />
            <span>Coller automatiquement du presse-papier</span>
          </button>

          <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/80 text-[11px] text-zinc-400 space-y-0.5 font-mono">
            <div>• <span className="text-zinc-200">1: A,B, 2: C, 3: D,E</span> (avec numéros)</div>
            <div>• <span className="text-zinc-200">AC, B, DE, A, C</span> (séparé par virgules ou retours)</div>
          </div>

          <div className="relative">
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Exemple:&#10;1: A, C&#10;2: B&#10;3: D, E"
              rows={5}
              className="w-full p-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl text-white placeholder-zinc-500 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
            />
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between text-xs px-1">
            <div className="flex items-center gap-1.5">
              {detectedCount > 0 ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  {detectedCount} question{detectedCount > 1 ? "s" : ""} détectée{detectedCount > 1 ? "s" : ""} / {totalQuestions}
                </span>
              ) : rawText.trim() ? (
                <span className="text-amber-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Aucune réponse reconnue (A-E requis)
                </span>
              ) : (
                <span className="text-zinc-500">Prêt à recevoir du texte</span>
              )}
            </div>

            {rawText && (
              <button
                type="button"
                onClick={() => setRawText("")}
                className="text-zinc-400 hover:text-zinc-200 underline text-xs">
                Effacer
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 bg-zinc-950/90 border-t border-zinc-800 pb-6 sm:pb-4 safe-area-bottom">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 sm:flex-none px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white rounded-xl hover:bg-zinc-800 transition text-center">
            Annuler
          </button>
          <button
            type="button"
            disabled={detectedCount === 0}
            onClick={handleApply}
            className={`flex-1 sm:flex-none px-6 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 active:scale-95 ${
              detectedCount > 0
                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30 cursor-pointer"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
            }`}>
            <Check className="w-4 h-4" />
            <span>Appliquer ({detectedCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
