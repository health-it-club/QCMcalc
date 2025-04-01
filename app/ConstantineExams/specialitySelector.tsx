"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { getUniqueSpecialities } from "@/data/exams";

interface SpecialitySelectorProps {
  selectedSpeciality: string;
  onChange: (speciality: string) => void;
}

export default function SpecialitySelector({
  selectedSpeciality,
  onChange,
}: SpecialitySelectorProps) {
  const [specialities, setSpecialities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpecialities() {
      try {
        const uniqueSpecialities = await getUniqueSpecialities();
        setSpecialities(
          uniqueSpecialities.length > 0
            ? uniqueSpecialities
            : ["Médecine", "Pharmacie", "Chirurgie Dentaire"]
        );
      } catch (error) {
        console.error("Error fetching specialities:", error);
        // Fallback to default specialities if fetch fails
        setSpecialities(["Médecine", "Pharmacie", "Chirurgie Dentaire"]);
      } finally {
        setLoading(false);
      }
    }
    fetchSpecialities();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center my-3">
        <p>Chargement des spécialités...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mb-1.5">
      <label
        htmlFor="specialitySelector"
        className="text-md md:text-xl font-bold mt-4 mb-2 text-center">
        Spécialité
      </label>
      <select
        id="specialitySelector"
        value={selectedSpeciality}
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
        <option value="">Toutes les spécialités</option>
        {specialities.map((speciality) => (
          <option key={speciality} value={speciality}>
            {speciality}
          </option>
        ))}
      </select>
    </div>
  );
}
