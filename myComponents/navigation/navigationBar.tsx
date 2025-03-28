import React from "react";
import HITlogo from "./logo";
import { lazy } from "react";
import { NavDropdownMenu } from "./navDropdownMenu";

const MarkdownPreview = lazy(() => import("./logo"));

export default function NavigationBar() {
  return (
    <div className="w-full bg-background border-b-1 border-solid lborder-light-800 backdrop-blur-md">
      <nav className="p-4 flex flex-row justify-between items-center my-1">
        <div className="">
          <a href="/">
            <HITlogo />
          </a>
        </div>
        <div
          className="hidden font-semibold text-xs flex-row space-x-6 px-5 font-Inter text-light-200 
          md:flex md:font-bold md:text-[13px]">
          <a href="" className="flex hover:text-light">
            Examens De Constantine
          </a>
          <a href="" className="flex hover:text-light">
            How Does it work
          </a>
          <a href="" className="flex hover:text-light">
            Contactez Nous
          </a>
        </div>
        <div className="md:hidden">
          <NavDropdownMenu />
        </div>
      </nav>
    </div>
  );
}
