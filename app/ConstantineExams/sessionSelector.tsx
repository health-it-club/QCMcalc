"use client";

import { useState } from "react";

interface SessionSelectorProps {
  selectedSession: string;
  onChange: (session: string) => void;
}

export default function SessionSelector({
  selectedSession,
  onChange,
}: SessionSelectorProps) {
  const sessions = ["Normal", "Rattrapage"];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col items-center mb-1.5">
      <label
        htmlFor="sessionSelector"
        className="text-md md:text-xl font-bold mt-4 mb-2 text-center">
        Session
      </label>
      <select
        id="sessionSelector"
        value={selectedSession}
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
        <option value="">Toutes les sessions</option>
        {sessions.map((session) => (
          <option key={session} value={session}>
            {session.charAt(0).toUpperCase() + session.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
