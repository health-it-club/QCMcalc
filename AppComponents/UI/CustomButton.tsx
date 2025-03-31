"use client";

import type React from "react";

import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

interface CustomButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function CustomButton({
  onClick,
  children = "Suivant",
}: CustomButtonProps) {
  return (
    <div className="flex justify-center">
      <InteractiveHoverButton onClick={onClick} className="text-md">
        {children}
      </InteractiveHoverButton>
    </div>
  );
}
