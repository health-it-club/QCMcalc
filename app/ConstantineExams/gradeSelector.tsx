"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { getUniqueGrades } from "@/data/exams";

interface GradeSelectorProps {
  selectedGrade: string;
  onChange: (grade: string) => void;
}

export default function GradeSelector({
  selectedGrade,
  onChange,
}: GradeSelectorProps) {
  const [grades, setGrades] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGrades() {
      try {
        const uniqueGrades = await getUniqueGrades();
        setGrades(
          uniqueGrades.length > 0
            ? uniqueGrades
            : [
                "1ère année",
                "2ème année",
                "3ème année",
                "4ème année",
                "5ème année",
                "6ème année",
                "Résidanat",
              ]
        );
      } catch (error) {
        console.error("Error fetching grades:", error);
        // Fallback to default grades if fetch fails
        setGrades([
          "1ère année",
          "2ème année",
          "3ème année",
          "4ème année",
          "5ème année",
          "6ème année",
          "Résidanat",
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchGrades();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center my-3">
        <p>Chargement des années d'études...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mb-1.5">
      <label
        htmlFor="gradeSelector"
        className="text-md md:text-xl font-bold mt-4 mb-2 text-center">
        Année d'étude
      </label>
      <select
        id="gradeSelector"
        value={selectedGrade}
        onChange={handleChange}
        className="w-8/12 p-4 text-sm md:text-xl font-semibold bg-light rounded-full text-center text-dark
        appearance-none 
        [-moz-appearance:textfield] 
        [&::-webkit-inner-spin-button]:appearance-none 
        [&::-webkit-outer-spin-button]:appearance-none
        px-3 
        py-2 
        border-solid
        border-4 
        border-light-200
        focus:outline-none 
        focus:border-blue">
        <option value="">Toutes les années d'étude</option>
        {grades.map((grade) => (
          <option key={grade} value={grade}>
            {grade}
          </option>
        ))}
      </select>
    </div>
  );
}
