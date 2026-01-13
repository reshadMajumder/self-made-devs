"use client";

import { Hero } from "@/components/hero";
import { ProgramDetails } from "@/components/program-details";
import IntroCard from "@/components/IntroCard";
import { Journey } from "@/components/journey";
import { Benefits } from "@/components/benefits";
import { CallToAction } from "@/components/call-to-action";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { BigBangScene } from "@/components/big-bang-scene";

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Suspense fallback={null}>
            <BigBangScene />
          </Suspense>
        </Canvas>
      </div>

      <main className="relative z-10">
        <Hero />
        <IntroCard />
        <ProgramDetails />
        <Journey />
        <Benefits />
        <CallToAction />
      </main>
    </>
  );
}
