"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { getUniqueYears } from "@/data/exams";

interface YearSelectorProps {
  selectedYear: string;
  onChange: (year: string) => void;
}

export default function YearSelector({
  selectedYear,
  onChange,
}: YearSelectorProps) {
  const [years, setYears] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchYears() {
      try {
        const uniqueYears = await getUniqueYears();
        setYears(uniqueYears);
      } catch (error) {
        console.error("Error fetching years:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchYears();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center my-3">
        <p>Chargement des années...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center my-3">
      <label
        htmlFor="yearSelector"
        className="text-md md:text-xl font-bold mt-4 mb-2 text-center">
        Année
      </label>
      <select
        id="yearSelector"
        value={selectedYear}
        onChange={handleChange}
        className="w-8/12 p-4 text-sm md:text-xl bg-light rounded-full text-center text-dark
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
        <option value="">Toutes les années</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
