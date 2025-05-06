import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function DropdownMenuButton() {
  return (
    <Button variant="outline" size="icon">
      <Menu />
    </Button>
  );
}
