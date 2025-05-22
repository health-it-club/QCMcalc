"use client";

import { useState } from "react";

interface TypeSelectorProps {
  selectedType: string;
  onChange: (type: string) => void;
}

export default function TypeSelector({
  selectedType,
  onChange,
}: TypeSelectorProps) {
  const types = ["clinique", "theorique"];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col items-center mb-1.5">
      <label
        htmlFor="typeSelector"
        className="text-md md:text-xl font-bold mt-4 mb-2 text-center">
        Type
      </label>
      <select
        id="typeSelector"
        value={selectedType}
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
        <option value="">Tous les types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
