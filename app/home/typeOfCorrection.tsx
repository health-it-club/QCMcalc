"use client";

interface TypeOfCorrectionProps {
  value: string;
  onChange: (value: string) => void;
}

const SYSTEMS = [
  {
    id: "partiallyNegative",
    title: "Partielle (Constantine)",
    desc: "Toute erreur annule la question (0 pt). Points partiels pour les bonnes réponses.",
    badge: "Recommandé Faculté",
  },
  {
    id: "allOrNothing",
    title: "Tout ou Rien",
    desc: "1 pt si la combinaison exacte est trouvée, 0 pt sinon.",
    badge: "Standard",
  },
  {
    id: "partiallyPositive",
    title: "Système Américain",
    desc: "+ pour chaque bonne réponse, - pour chaque mauvaise réponse.",
    badge: "Pénalité",
  },
  {
    id: "QCSs",
    title: "QCS (Choix Unique)",
    desc: "1 pt dès qu'au moins une réponse juste est cochée.",
    badge: "Simple",
  },
];

export default function TypeOfCorrection({
  value,
  onChange,
}: TypeOfCorrectionProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto space-y-3">
      <label className="text-xs sm:text-sm font-bold text-zinc-300 text-center">
        Mode de correction & Barème
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
        {SYSTEMS.map((sys) => {
          const isSelected = value === sys.id;
          return (
            <div
              key={sys.id}
              onClick={() => onChange(sys.id)}
              className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all active:scale-[0.98] ${
                isSelected
                  ? "bg-zinc-800/90 border-blue-500 shadow-md ring-1 ring-blue-500/30"
                  : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
              }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs sm:text-sm text-white">
                  {sys.title}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-800 text-zinc-400"
                  }`}>
                  {sys.badge}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 leading-relaxed">
                {sys.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
