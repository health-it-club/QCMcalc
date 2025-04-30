import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropdownMenuButton from "./dropdownMenuButton";
import Link from "next/link";

export function NavDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DropdownMenuButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-3.5">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/ConstantineExams">
            <DropdownMenuItem>Examens de Constantine</DropdownMenuItem>
          </Link>
          <Link href="/HowDoesItWork">
            <DropdownMenuItem>How Does it Work</DropdownMenuItem>
          </Link>
          <Link href="https://linktr.ee/Health._it" target="blank">
            <DropdownMenuItem>Contactez Nous</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
