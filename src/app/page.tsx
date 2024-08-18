import Radar from "@/components/ui/Radar";
import Transponder from "@/components/ui/Transponder";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-black h-screen flex flex-col gap-8 items-center justify-center">
      <Radar />
      <Transponder />
    </main> 
  );
}
