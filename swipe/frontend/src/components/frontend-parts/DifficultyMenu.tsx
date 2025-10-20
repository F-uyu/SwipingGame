"use client";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Button } from "@/components/ui/button";

export default function DifficultyMenu({
  setDifficulty,
}: {
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <Button
          variant="outline"
          className="w-fit h-12 px-16 bg-grey border-black cursor-pointer"
          onClick={() => setDifficulty("Easy")}
        >
          Easy
        </Button>
        <Button
          variant="outline"
          className="h-12 bg-grey border-black cursor-pointer"
          onClick={() => setDifficulty("Medium")}
        >
          Medium
        </Button>
        <Button
          variant="outline"
          className="h-12 bg-grey border-black cursor-pointer"
          onClick={() => setDifficulty("Hard")}
        >
          Hard
        </Button>
      </div>
    </div>
  );
}
