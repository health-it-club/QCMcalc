"use client";

import { useState, useEffect } from "react";
import { type ExamPreset } from "@/data/exams";
import { getFilteredExams } from "@/AppComponents/logic/fetchExams";
import YearSelector from "./yearSelector";
import GradeSelector from "./gradeSelector";
import SpecialitySelector from "./specialitySelector";
import SessionSelector from "./sessionSelector";
import TypeSelector from "./typeSelector";
import Background from "@/AppComponents/UI/background";
import PresetQuizForm from "./examForm";

export default function ExamPageContent() {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>("");
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedExam, setSelectedExam] = useState<ExamPreset | null>(null);
  const [filteredExams, setFilteredExams] = useState<ExamPreset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function updateFilteredExams() {
      setLoading(true);
      try {
        console.log("Filtering with:", {
          year: selectedYear,
          grade: selectedGrade,
          speciality: selectedSpeciality,
        });
        const exams = await getFilteredExams(
          selectedYear,
          selectedGrade,
          selectedSpeciality,
          selectedSession,
          selectedType
        );

        console.log("Filtered exams:", exams);
        setFilteredExams(exams);
      } catch (error) {
        console.error("Error filtering exams:", error);
      } finally {
        setLoading(false);
      }
    }
    updateFilteredExams();
  }, [
    selectedYear,
    selectedGrade,
    selectedSpeciality,
    selectedSession,
    selectedType,
  ]);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  const handleGradeChange = (grade: string) => {
    setSelectedGrade(grade);
  };
  const handleSpecialityChange = (speciality: string) => {
    setSelectedSpeciality(speciality);
  };

  const handleSessionChange = (session: string) => {
    setSelectedSession(session);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  const handleSelectExam = (exam: ExamPreset) => {
    setSelectedExam(exam);
  };

  const handleBackToList = () => {
    setSelectedExam(null);
  };

  return (
    <div className="w-full">
      <Background />
      <div className="relative z-10 ">
        {!selectedExam ? (
          <>
            <div className="flex pt-4 justify-center">
              <h1 className="text-xl md:text-2xl font-bold text-center bg-yellow text-dark px-4 py-1 rounded-full">
                Examens De Constantine
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-0">
              <YearSelector
                selectedYear={selectedYear}
                onChange={handleYearChange}
              />
              <GradeSelector
                selectedGrade={selectedGrade}
                onChange={handleGradeChange}
              />{" "}
              <SpecialitySelector
                selectedSpeciality={selectedSpeciality}
                onChange={handleSpecialityChange}
              />
              <SessionSelector
                selectedSession={selectedSession}
                onChange={handleSessionChange}
              />
              <TypeSelector
                selectedType={selectedType}
                onChange={handleTypeChange}
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg md:text-xl font-bold mb-4 text-center">
                {filteredExams.length > 0
                  ? `${filteredExams.length} examen(s) trouvé(s)`
                  : "Aucun examen trouvé"}
              </h2>

              <div className="rounded-md border p-4">
                <div className="grid grid-cols-1 gap-4">
                  {filteredExams.map((exam) => (
                    <div
                      key={exam.id}
                      className="cursor-pointer transition-all duration-300 hover:bg-light-100 p-4 bg-light rounded-lg"
                      onClick={() => handleSelectExam(exam)}>
                      <h3 className="text-lg font-bold text-dark">
                        {exam.name}
                      </h3>
                      <p className="text-sm font-semibold mb-2 text-dark">
                        {exam.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {exam.speciality && (
                          <span className="px-2 py-1 bg-yellow-300 rounded-full text-xs text-dark">
                            {exam.speciality}
                          </span>
                        )}
                        {exam.grade && (
                          <span className="px-2 py-1 bg-yellow-300 rounded-full text-xs text-dark">
                            {exam.grade}
                          </span>
                        )}
                        <span className="px-2 py-1 bg-yellow-300 rounded-full text-xs text-dark">
                          {exam.subject}
                        </span>
                        <span className="px-2 py-1 bg-yellow-300 rounded-full text-xs text-dark">
                          {exam.year}
                        </span>
                      </div>
                      <p className="text-sm text-dark-800">
                        Nombre de questions: {exam.numQuestions}
                      </p>
                      <p className="text-sm text-dark-800">
                        Type de correction:{" "}
                        {exam.testType === "QCSs"
                          ? "QCS (Question à choix simple)"
                          : exam.testType === "allOrNothing"
                          ? "QCM Tout ou Rien"
                          : exam.testType === "partiallyNegative"
                          ? "QCM Partielle"
                          : "QCM Système Américain"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <PresetQuizForm exam={selectedExam} onBack={handleBackToList} />
        )}
      </div>
    </div>
  );
}
