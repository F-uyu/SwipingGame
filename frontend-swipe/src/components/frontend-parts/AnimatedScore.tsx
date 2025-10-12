"use client";
import { useEffect, useState } from "react";
import { useSpring, useSprings, animated, to } from "@react-spring/web";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import React from "react";
const colors = [
  "#3b82f6",
  "#10b981",
  "#facc15",
  "#ec4899",
  "#8b5cf6",
  "#ef4444",
];

type Props = {
  score: number;
  maxHealth?: number; // total hearts (e.g., 5)
  hitSignal?: number; // increment this when the player gets hit
};

export default function AnimatedScore({
  score,
  maxHealth = 3,
  hitSignal = 0,
}: Props) {
  console.log("rerender");
  const [colorIndex, setColorIndex] = useState(0);

  const hearts = React.useMemo(
    () => Array.from({ length: maxHealth }, (_, i) => i),
    [maxHealth]
  );
  //sign
  const springStyles = useSpring({
    backgroundColor: colors[colorIndex],
    config: { duration: 1200 },
  });
  //sign
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);
  //heart
  const [heartSprings, api] = useSprings(
    hearts.length,
    () => ({
      x: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      config: { tension: 280, friction: 20 },
    }),
    [hearts.length]
  );

  useEffect(() => {
    if (hitSignal === 0) return;
    api.start(() => ({
      to: async (next: any) => {
        await next({
          scale: 1.15,
          rotate: 6,
          x: 3,
          opacity: 0.85,
          config: { duration: 80 },
        });
        await next({
          scale: 1.1,
          rotate: -6,
          x: -3,
          opacity: 0.9,
          config: { duration: 80 },
        });
        await next({
          scale: 1.03,
          rotate: 2,
          x: 1,
          opacity: 1,
          config: { duration: 90 },
        });
        await next({
          scale: 1,
          rotate: 0,
          x: 0,
          opacity: 1,
          config: { duration: 90 },
        });
      },
    }));
  }, [hitSignal, api]);

  return (
    <animated.div
      style={springStyles}
      className="rounded-lg px-6 py-3 shadow-lg flex flex-col items-center text-white"
    >
      <Badge variant="outline" className="text-white border-white mb-1">
        Score
      </Badge>
      <span className="text-2xl font-bold">{score}</span>
      <div className="flex flex-row gap-2 mt-2">
        {hearts.map((i) => {
          const filled = i < maxHealth;

          const transform = to(
            [heartSprings[i].x, heartSprings[i].rotate, heartSprings[i].scale],
            (x, r, s) => `translateX(${x}px) rotate(${r}deg) scale(${s})`
          );

          return (
            <animated.div
              key={i}
              style={{ transform, opacity: heartSprings[i].opacity }}
              className="w-8 h-8"
              title={filled ? "Health" : "Empty"}
            >
              <Heart
                className={
                  filled
                    ? "w-8 h-8 text-red-500 fill-red-500"
                    : "w-8 h-8 text-red-500"
                }
              />
            </animated.div>
          );
        })}
      </div>
    </animated.div>
  );
}
