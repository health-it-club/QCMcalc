"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropdownMenuButton from "./dropdownMenuButton";
import Link from "next/link";
import { Calculator, GraduationCap, HelpCircle, ExternalLink } from "lucide-react";

export function NavDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DropdownMenuButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl text-white mr-2">
        <DropdownMenuLabel className="text-xs text-zinc-400 font-semibold px-2 py-1.5">
          Navigation
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <DropdownMenuGroup className="space-y-1">
          <Link href="/">
            <DropdownMenuItem className="flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer hover:bg-zinc-800 text-sm font-medium">
              <Calculator className="w-4 h-4 text-blue-400" />
              <span>Calculateur Manuel</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/ConstantineExams">
            <DropdownMenuItem className="flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer hover:bg-zinc-800 text-sm font-medium">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Examens de Constantine</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/HowDoesItWork">
            <DropdownMenuItem className="flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer hover:bg-zinc-800 text-sm font-medium">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <span>Comment ça marche ?</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <Link
          href="https://linktr.ee/Health._it"
          target="_blank"
          rel="noopener noreferrer">
          <DropdownMenuItem className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer hover:bg-zinc-800 text-xs text-zinc-400 hover:text-white">
            <span>Club Health IT</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
