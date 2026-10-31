"use client";

import { CustomAccodion } from "@/AppComponents/UI/CustomAccordion";
import Background from "../../AppComponents/UI/background";
import { BookOpen, CheckCircle, Calculator, HelpCircle, Sparkles } from "lucide-react";

export default function HowDoesItWorkLanding() {
  const steps = [
    {
      num: "01",
      icon: BookOpen,
      title: "Choisissez votre mode",
      desc: "Sélectionnez un examen officiel de la faculté dans les annales de Constantine, ou créez votre propre épreuve personnalisée.",
    },
    {
      num: "02",
      icon: CheckCircle,
      title: "Remplissez la grille interactive",
      desc: "Cochez vos réponses lettre par lettre (A à E) au clavier ou à la souris, ou collez directement vos notes avec la Saisie Rapide.",
    },
    {
      num: "03",
      icon: Calculator,
      title: "Obtenez votre analyse sur 20",
      desc: "Calcul instantané selon le barème officiel (Partielle Constantine, Tout ou Rien, etc.) avec détail des erreurs et points partiels.",
    },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-80px)] py-10 px-4">
      <Background />

      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-12">
        {/* Hero Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guide d'utilisation</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Comment fonctionne QCMcalc ?
          </h1>
          <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
            QCMcalc est une plateforme développée par l'équipe du club Health IT, permettant aux étudiants en médecine de calculer avec exactitude leur note aux QCMs et d'accéder aux annales passées.
          </p>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm relative overflow-hidden flex flex-col justify-between space-y-4 shadow-xl">
                <span className="text-4xl font-black text-zinc-800 font-mono select-none absolute top-4 right-4">
                  {st.num}
                </span>

                <div className="space-y-3">
                  <div className="p-3 w-fit rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {st.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-800">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white">
              Foire Aux Questions (FAQ)
            </h2>
          </div>

          <CustomAccodion />
        </div>
      </div>
    </div>
  );
}
