"use client";

import type { ChangeEvent } from "react";

interface NumbreOfQuestionsProps {
  value: number;
  onChange: (value: number) => void;
}

const PRESETS = [10, 20, 30, 40, 50, 60];

export default function NumbreOfQuestions({
  value,
  onChange,
}: NumbreOfQuestionsProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number.parseInt(e.target.value, 10);
    onChange(isNaN(val) ? 0 : Math.max(0, Math.min(200, val)));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto space-y-3">
      <label
        htmlFor="numQuestions"
        className="text-xs sm:text-sm font-bold text-zinc-300 text-center">
        Nombre total de questions dans l'épreuve
      </label>

      {/* Preset Chips: 3 columns on phone, 6 columns on desktop */}
      <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center justify-center gap-2 w-full">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            className={`py-2.5 sm:py-1.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition active:scale-95 cursor-pointer text-center ${
              value === preset
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-1 ring-blue-400"
                : "bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700/80"
            }`}>
            {preset} QCMs
          </button>
        ))}
      </div>

      {/* Custom input */}
      <div className="w-full max-w-xs pt-1">
        <input
          type="number"
          min="1"
          max={200}
          step={1}
          value={value > 0 ? value : ""}
          onChange={handleChange}
          id="numQuestions"
          placeholder="Ou entrez un nombre (ex: 45)"
          inputMode="numeric"
          className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-center text-white placeholder-zinc-500 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
    </div>
  );
}
