import { useEffect, useState } from "react";
import { heartsConfig } from "@/config/livestream-config";

interface Heart {
  id: number;
  left: number;
}

export const HeartAnimation = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: Heart = {
        id: nextId,
        left: Math.random() * 100,
      };
      setHearts((prev) => [...prev, newHeart]);
      setNextId((prev) => prev + 1);

      // Remove coração após animação
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 3000);
    }, heartsConfig.interval);

    return () => clearInterval(interval);
  }, [nextId]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-red-500 animate-float"
          style={{
            left: `${heart.left}%`,
            bottom: "0",
            fontSize: "2rem",
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};
