// pages/game.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import HandModel from "../models/HandModel";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
export default function HandScreen({
  setScore,
  difficulty,
  setHealth,
  setHitSignal,
}: {
  setScore: (fn: (prev: number) => number) => void;
  setHealth: (fn: (prev: number) => number) => void;
  setHitSignal: (fn: (prev: number) => number) => void;
  difficulty: string;
}) {
  return (
    <div className="h-[100vh] w-[100vw]">
      <Canvas>
        <ambientLight intensity={3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <OrbitControls />
        <HandModel
          difficulty={difficulty}
          setScore={setScore}
          setHealth={setHealth}
          setHitSignal={setHitSignal}
        />
      </Canvas>
    </div>
  );
}
