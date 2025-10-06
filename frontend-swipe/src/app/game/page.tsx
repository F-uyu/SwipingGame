"use client";
import React from "react";
import DifficultyMenu from "@/components/frontend-parts/DifficultyMenu";
import HandScreen from "../../components/frontend-parts/HandScreen";
import AnimatedScore from "../../components/frontend-parts/AnimatedScore";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSpring, animated } from "@react-spring/web";

function Game() {
  console.log("rerender");
  const [score, setScore] = React.useState(0);
  const [difficulty, setDifficulty] = React.useState<string>("");
  return (
    <div className="relative w-screen h-screen">
      {difficulty === "" ? (
        <DifficultyMenu setDifficulty={setDifficulty} />
      ) : (
        <>
          {/* Centered, vertical Score display */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
            <AnimatedScore score={score} />
          </div>
          {/* Game Canvas */}
          <HandScreen difficulty={difficulty} setScore={setScore} />
        </>
      )}
    </div>
  );
}

export default Game;
