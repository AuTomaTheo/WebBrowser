import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
  delay: number;
  char: string;
  rotation: number;
}

export default function Snow() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = [];
    const numberOfFlakes = 50;
    const snowflakeChars = ['❄', '❅', '❆'];

    for (let i = 0; i < numberOfFlakes; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 10 + Math.random() * 20,
        size: 10 + Math.random() * 15,
        delay: Math.random() * 10,
        char: snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)],
        rotation: Math.random() * 360,
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
            fontSize: `${flake.size}px`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.delay}s`,
            transform: `rotate(${flake.rotation}deg)`,
          }}
        >
          {flake.char}
        </div>
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
          color: white;
          animation: snowfall linear infinite;
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
          user-select: none;
        }
      `}</style>
    </div>
  );
}
