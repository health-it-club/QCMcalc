import React from "react";
import HITlogo from "./logo";
import { lazy } from "react";
import { NavDropdownMenu } from "./navDropdownMenu";
import Link from "next/link";

const MarkdownPreview = lazy(() => import("./logo"));

export default function NavigationBar() {
  return (
    <div className="w-full bg-dark/5 border-b-1 border-solid lborder-light-800 backdrop-blur-md">
      <nav className="p-4 flex flex-row justify-between items-center my-1">
        <div className="">
          <Link href="/">
            <HITlogo />
          </Link>
        </div>
        <div
          className="hidden font-semibold text-xs flex-row space-x-6 px-5 font-Inter text-light-200 
          md:flex md:font-bold md:text-[13px]">
          <Link href="/ConstantineExams" className="flex hover:text-light">
            Examens De Constantine
          </Link>
          <Link href="/HowDoesItWork" className="flex hover:text-light">
            Comment Ça marche?
          </Link>
          <Link
            href="https://linktr.ee/Health._it"
            target="blank"
            className="flex hover:text-light">
            Contactez Nous
          </Link>
        </div>
        <div className="md:hidden">
          <NavDropdownMenu />
        </div>
      </nav>
    </div>
  );
}
