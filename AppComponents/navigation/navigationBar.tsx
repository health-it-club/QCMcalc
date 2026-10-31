"use client";

import React from "react";
import HITlogo from "./logo";
import { NavDropdownMenu } from "./navDropdownMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, GraduationCap, HelpCircle, ExternalLink } from "lucide-react";

export default function NavigationBar() {
  const pathname = usePathname();

  const navLinks = [
    {
      href: "/",
      label: "Calculateur",
      icon: Calculator,
      isActive: pathname === "/",
    },
    {
      href: "/ConstantineExams",
      label: "Examens de Constantine",
      icon: GraduationCap,
      isActive: pathname?.startsWith("/ConstantineExams"),
    },
    {
      href: "/HowDoesItWork",
      label: "Comment ça marche ?",
      icon: HelpCircle,
      isActive: pathname?.startsWith("/HowDoesItWork"),
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/80 border-b border-zinc-800/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-36 md:w-44 transition group-hover:opacity-90">
            <HITlogo />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition ${
                  link.isActive
                    ? "bg-zinc-800/90 text-white font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}>
                <Icon className={`w-4 h-4 ${link.isActive ? "text-blue-400" : "text-zinc-500"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <Link
            href="https://linktr.ee/Health._it"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition ml-2">
            <span>Health IT Club</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
          </Link>
        </nav>

        {/* Mobile dropdown */}
        <div className="md:hidden">
          <NavDropdownMenu />
        </div>
      </div>
    </header>
  );
}
