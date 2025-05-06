import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      <FlickeringGrid
        className="absolute inset-0 w-full h-full opacity-20"
        squareSize={4}
        gridGap={6}
        color="#6385C4"
        maxOpacity={0.9}
        flickerChance={0.3}
      />
    </div>
  );
}
