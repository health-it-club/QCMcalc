import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IconButtonProps {
  onClick?: () => void;
}

export function IconButton({ onClick }: IconButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className="cursor-pointer">
      <MoveLeft />
    </Button>
  );
}
