import Hero from "@/components/ui/Hero";
import { generatePageTitle } from "@/src/shared/utils/metadata";

import { Metadata } from "next/types";


export const metadata: Metadata = {
  title: generatePageTitle("Inicio"),
  description: "Aplicación para hacer meeti",
}

export default async function Home() {


  return (
    <>
      <Hero />

    </>
  );
}
