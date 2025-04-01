"use client";

import type { ChangeEvent } from "react";

//Props
interface TypeOfCorrectionProps {
  onChange: (value: string) => void;
}

export default function TypeOfCorrection({ onChange }: TypeOfCorrectionProps) {
  //Event handler
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  //The Render
  return (
    <div className="flex flex-col items-center my-6">
      <label
        htmlFor="typeOfCorrection"
        className="text-md md:text-xl font-bold mt-4 mb-2 text-center">
        Type de Correction
      </label>
      <select
        required
        name="typeOfCorrection"
        id="testType"
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
        <option value="QCSs">QCS(Question à choix simple)</option>
        <option value="allOrNothing">QCM Tout ou Rien</option>
        <option value="partiallyNegative">QCM Partielle</option>
        <option value="partiallyPositive">QCM Système Américain</option>
      </select>
    </div>
  );
}
