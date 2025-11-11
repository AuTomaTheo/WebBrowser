import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
  delay: number;
}

export default function Snow() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = [];
    const numberOfFlakes = 50;

    for (let i = 0; i < numberOfFlakes; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 10 + Math.random() * 20,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 10,
      });
    }

    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute snowflake"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes snowfall {
          0% {
            top: -10%;
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          70% {
            opacity: 0.6;
          }
          100% {
            top: 50vh;
            opacity: 0;
          }
        }

        .snowflake {
          background: white;
          border-radius: 50%;
          animation: snowfall linear infinite;
          box-shadow: 0 0 3px rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </div>
  );
}
