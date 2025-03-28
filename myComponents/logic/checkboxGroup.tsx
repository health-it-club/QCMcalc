"use client";

import { useState } from "react";

//Define component props
interface CheckboxGroupProps {
  questionNumber: number | string;
  type: string;
}

export default function CheckboxGroup({
  questionNumber,
  type,
}: CheckboxGroupProps) {
  //State management
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  //Change handler (Remove if selected, add if not)
  const handleCheckboxChange = (letter: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(letter)) {
        return prev.filter((item) => item !== letter);
      } else {
        return [...prev, letter];
      }
    });
  };

  //The actual checkbox render
  return (
    <div className="flex gap-4">
      {["A", "B", "C", "D", "E"].map((letter) => (
        <div key={letter} className="flex items-center gap-1">
          <input
            type="checkbox"
            id={`${letter}${type}${questionNumber}`}
            className="checkboxInput"
            checked={selectedOptions.includes(letter)}
            onChange={() => handleCheckboxChange(letter)}
          />
          <label
            htmlFor={`${letter}${type}${questionNumber}`}
            className="checkboxLabel">
            {letter}
          </label>
        </div>
      ))}
    </div>
  );
}
