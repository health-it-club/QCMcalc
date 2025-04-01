"use client";

import type { ChangeEvent } from "react";

//Props
interface NumbreOfQuestionsProps {
  onChange: (value: number) => void;
}

export default function NumbreOfQuestions({
  onChange,
}: NumbreOfQuestionsProps) {
  //Event Handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    onChange(isNaN(value) ? 0 : value);
  };

  //The Render
  return (
    <div
      className="flex flex-col items-center my-6 w-full"
      id="numOfQuestionsDiv">
      <label
        htmlFor="numOfQuestions"
        className="text-md md:text-xl font-bold mt-4 mb-2 mx-1 text-center">
        Nombre total de questions dans le sujet
      </label>
      <input
        type="number"
        min="1"
        max={200}
        step={1}
        required
        name="numOfQuestions"
        id="numQuestions"
        placeholder=""
        inputMode="numeric"
        onChange={handleChange}
        className="w-8/12 p-4 text-xs md:text-xl bg-light rounded-full text-center text-dark
          appearance-none 
          [-moz-appearance:textfield] 
          [&::-webkit-inner-spin-button]:appearance-none 
          [&::-webkit-outer-spin-button]:appearance-none
          px-3 py-2
          border-solid
          border-4 
          border-light-200
          focus:outline-none 
          focus:border-blue"
      />
    </div>
  );
}
