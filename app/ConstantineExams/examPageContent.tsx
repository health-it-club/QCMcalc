"use client";

import { useState, useEffect, useMemo } from "react";
import { type ExamPreset } from "@/data/exams";
import { fetchExams } from "@/AppComponents/logic/fetchExams";
import Background from "@/AppComponents/UI/background";
import PresetQuizForm from "./examForm";
import {
  Search,
  GraduationCap,
  ArrowRight,
  X,
  ChevronRight,
  BookOpen,
} from "lucide-react";

export default function ExamPageContent() {
  const [exams, setExams] = useState<ExamPreset[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState<ExamPreset | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedSession, setSelectedSession] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      try {
        const data = await fetchExams();
        setExams(data);
      } catch (err) {
        console.error("Failed to load exams:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  const uniqueYears = useMemo(() => {
    const set = new Set(exams.map((e) => e.year?.toString()).filter(Boolean));
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [exams]);

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const matchesName = exam.name?.toLowerCase().includes(query);
        const matchesSubject = exam.subject?.toLowerCase().includes(query);
        const matchesSpeciality = exam.speciality?.toLowerCase().includes(query);
        const matchesYear = exam.year?.toString().includes(query);
        if (!matchesName && !matchesSubject && !matchesSpeciality && !matchesYear) {
          return false;
        }
      }

      if (selectedYear !== "all" && exam.year?.toString() !== selectedYear) return false;
      if (selectedGrade !== "all" && exam.grade !== selectedGrade) return false;
      if (selectedSession !== "all" && exam.session !== selectedSession) return false;
      if (selectedType !== "all" && exam.type !== selectedType) return false;

      return true;
    });
  }, [exams, searchQuery, selectedYear, selectedGrade, selectedSession, selectedType]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedYear("all");
    setSelectedGrade("all");
    setSelectedSession("all");
    setSelectedType("all");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedYear !== "all" ||
    selectedGrade !== "all" ||
    selectedSession !== "all" ||
    selectedType !== "all";

  return (
    <div className="w-full min-h-[calc(100vh-70px)] py-4 sm:py-8 px-3 sm:px-4">
      <Background />

      <div className="relative z-10 w-full max-w-5xl mx-auto space-y-4 sm:space-y-6">
        {!selectedExam ? (
          <>
            {/* Header */}
            <div className="text-center space-y-2 sm:space-y-3 max-w-2xl mx-auto px-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Faculté de Médecine de Constantine</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Annales & Examens Passés
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400">
                Sélectionnez votre épreuve pour corriger vos réponses selon le barème officiel.
              </p>
            </div>

            {/* Filter and Search Bar - Mobile Friendly */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-3 sm:p-5 backdrop-blur-md shadow-xl space-y-3">
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Rechercher (ex: Chimie, Cardio, 2025)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-3 text-zinc-400 hover:text-white p-0.5">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Horizontal Scroll Filter Chips for Phone */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 text-xs touch-pan-x">
                <span className="text-zinc-500 text-[11px] font-semibold shrink-0">Année :</span>
                <button
                  type="button"
                  onClick={() => setSelectedYear("all")}
                  className={`px-3 py-1.5 rounded-xl transition font-bold shrink-0 ${
                    selectedYear === "all"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-zinc-800/90 text-zinc-400"
                  }`}>
                  Toutes
                </button>
                {uniqueYears.map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setSelectedYear(yr)}
                    className={`px-3 py-1.5 rounded-xl transition font-bold shrink-0 ${
                      selectedYear === yr
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-zinc-800/90 text-zinc-400"
                    }`}>
                    {yr}
                  </button>
                ))}

                <div className="w-[1px] h-4 bg-zinc-800 shrink-0 mx-1" />

                <span className="text-zinc-500 text-[11px] font-semibold shrink-0">Session :</span>
                {["all", "Normal", "Rattrapage"].map((sess) => (
                  <button
                    key={sess}
                    type="button"
                    onClick={() => setSelectedSession(sess)}
                    className={`px-3 py-1.5 rounded-xl transition font-bold shrink-0 ${
                      selectedSession === sess
                        ? "bg-purple-600 text-white shadow-sm"
                        : "bg-zinc-800/90 text-zinc-400"
                    }`}>
                    {sess === "all" ? "Toutes" : sess}
                  </button>
                ))}

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="ml-auto text-amber-400 hover:text-amber-300 text-xs font-semibold shrink-0 pl-2">
                    Effacer
                  </button>
                )}
              </div>
            </div>

            {/* Results Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
                <span>
                  <b>{filteredExams.length}</b> sujet{filteredExams.length > 1 ? "s" : ""} disponible{filteredExams.length > 1 ? "s" : ""}
                </span>
              </div>

              {loading ? (
                <div className="p-12 text-center text-zinc-400 text-xs">
                  <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-3" />
                  Chargement des sujets...
                </div>
              ) : filteredExams.length === 0 ? (
                <div className="p-8 text-center bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                  <p className="text-zinc-300 font-semibold text-sm">Aucun examen ne correspond à votre recherche.</p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-3 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 text-white hover:bg-zinc-700 transition">
                    Effacer les filtres
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredExams.map((exam) => (
                    <div
                      key={exam.id}
                      onClick={() => setSelectedExam(exam)}
                      className="group p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-blue-500/50 hover:bg-zinc-800/80 transition-all duration-200 cursor-pointer backdrop-blur-sm flex flex-col justify-between gap-3 shadow-lg active:scale-[0.99]">
                      <div>
                        {/* Badges row */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {exam.year}
                          </span>
                          {exam.session && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                              {exam.session}
                            </span>
                          )}
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {exam.numQuestions} QCMs
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-400 transition leading-snug">
                          {exam.name}
                        </h3>

                        <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                          {exam.description || `Examen de ${exam.subject}`}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-zinc-800/80 text-xs">
                        <span className="text-zinc-500 text-[11px] font-medium">
                          {exam.testType === "partiallyNegative"
                            ? "Partielle Constantine"
                            : exam.testType === "allOrNothing"
                            ? "Tout ou Rien"
                            : "QCS"}
                        </span>

                        <span className="flex items-center gap-1 text-blue-400 font-bold group-hover:translate-x-1 transition text-xs">
                          <span>Commencer</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <PresetQuizForm
            exam={selectedExam}
            onBack={() => setSelectedExam(null)}
          />
        )}
      </div>
    </div>
  );
}
