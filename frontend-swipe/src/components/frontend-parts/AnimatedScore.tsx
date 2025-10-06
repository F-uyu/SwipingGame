"use client";
import { useEffect, useState } from "react";
import { useSpring, useSprings, animated, easings } from "@react-spring/web";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import React from "react";
const colors = [
  "#ef4444",
  "#3b82f6",
  "#10b981",
  "#facc15",
  "#ec4899",
  "#8b5cf6",
];

type Props = {
  score: number;
  health: number; // current hearts (e.g., 3)
  maxHealth?: number; // total hearts (e.g., 5)
  hitSignal?: number; // increment this when the player gets hit
};

export default function AnimatedScore({
  score,
  health,
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
  const [heartSprings, api] = useSprings(hearts.length, () => ({
    from: { x: 0, rotate: 0, scale: 1, opacity: 1 },
  }));

  useEffect(() => {
    // short, punchy sequence
    api.start(async (index) => {
      // apply to all hearts (you can target only damaged ones if you track which lost health)
      await api.start({
        to: async (next) => {
          // 1) pop + slight red flash
          await next({
            scale: 1.15,
            rotate: 6,
            x: 3,
            opacity: 0.85,
            config: { duration: 80, easing: easings.easeOutCubic },
          });
          // 2) counter sway
          await next({
            scale: 1.1,
            rotate: -6,
            x: -3,
            opacity: 0.9,
            config: { duration: 80, easing: easings.easeOutCubic },
          });
          // 3) settle with a tiny wobble
          await next({
            scale: 1.03,
            rotate: 2,
            x: 1,
            opacity: 1,
            config: { duration: 90, easing: easings.easeOutCubic },
          });
          // 4) back to idle
          await next({
            scale: 1,
            rotate: 0,
            x: 0,
            opacity: 1,
            config: { duration: 90, easing: easings.easeOutCubic },
          });
        },
      });
      return;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hitSignal]);

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
        <Heart className="text-red-500 w-8 h-8 fill-red-500" />
        <Heart className="text-red-500 w-8 h-8 fill-red-500" />
        <Heart className="text-red-500 w-8 h-8 fill-red-500" />
      </div>
    </animated.div>
  );
}
