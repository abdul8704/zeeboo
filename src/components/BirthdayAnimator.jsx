import { useState, useEffect, useCallback, useRef } from "react";

export default function BirthdayAnimator({ className }) {
  const [birthdayBlocks, setBirthdayBlocks] = useState([]);
  const cursorPosition = useRef({ x: 0, y: 0 });

  const borderColors = [
    'linear-gradient(135deg, #FF36F5, #42C9FF)',
    'linear-gradient(135deg, #FFC700, #FF85DD)',
    'linear-gradient(135deg, #00FFF0, #7700FF)',
    'linear-gradient(135deg, #FF5E7A, #FFB961)',
    'linear-gradient(135deg, #51F0B0, #8973FF)',
    'linear-gradient(135deg, #FFF173, #FF626D)',
    'linear-gradient(135deg, #C1FF72, #00C3FF)',
    'linear-gradient(135deg, #FF9CFE, #FFD79C)',
  ];

  const isInBottomRightCorner = useCallback(() => {
    const { x, y } = cursorPosition.current;
    const threshold = 120;
    return x > window.innerWidth - threshold && y > window.innerHeight - threshold;
  }, []);

  const handleMouseMove = useCallback((event) => {
    cursorPosition.current = { x: event.clientX, y: event.clientY };
  }, []);

  const createBlock = useCallback(() => {
    const { x, y } = cursorPosition.current;

    const id = `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const newBlock = {
      id,
      x: x - 100,
      y: y - 25,
      moveX: (Math.random() - 0.5) * 300,
      moveY: (Math.random() - 0.5) * 300,
      rotate: (Math.random() - 0.5) * 90,
      borderColor: borderColors[Math.floor(Math.random() * borderColors.length)],
    };

    setBirthdayBlocks(prev => [...prev, newBlock]);

    setTimeout(() => {
      setBirthdayBlocks(prev => prev.filter(block => block.id !== id));
    }, 3000);
  }, [borderColors]);

  const createBlockIfNotInCorner = useCallback(() => {
    if (!isInBottomRightCorner()) {
      createBlock();
    }
  }, [isInBottomRightCorner, createBlock]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    const autoCreateInterval = setInterval(() => {
      createBlockIfNotInCorner();
    }, 400);

    return () => clearInterval(autoCreateInterval);
  }, [createBlockIfNotInCorner]);

  return (
    <div
      className={className}
      onClick={createBlockIfNotInCorner}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <style>
        {`
          @keyframes float-away {
            0% {
              opacity: 0;
              transform: scale(0.2) translate(0, 0) rotate(0deg);
            }
            10% {
              opacity: 1;
              transform: scale(1) translate(0, 0) rotate(0deg);
            }
            100% {
              opacity: 0;
              transform: scale(0.8) translate(var(--moveX), var(--moveY)) rotate(var(--rotate));
            }
          }

          .birthday-block {
            position: absolute;
            padding: 15px 25px;
            border-radius: 15px;
            background: rgba(128, 90, 213, 0.6);
            backdrop-filter: blur(8px);
            color: white;
            font-size: 24px;
            font-weight: bold;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
            box-shadow:
              0 10px 20px rgba(0, 0, 0, 0.3),
              0 0 15px rgba(182, 130, 255, 0.6),
              0 0 30px rgba(255, 255, 255, 0.15);
            user-select: none;
            pointer-events: none;
            will-change: transform, opacity;
            letter-spacing: 0.5px;
            animation: float-away 3s cubic-bezier(0.215, 0.610, 0.355, 1.000) forwards;
            border: 3px solid transparent;
            background-clip: padding-box;
          }

          .birthday-block::before {
            content: '';
            position: absolute;
            top: -3px;
            left: -3px;
            right: -3px;
            bottom: -3px;
            background: var(--border-gradient);
            border-radius: 15px;
            z-index: -1;
            pointer-events: none;
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
          }

          .birthday-block::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 13px;
            background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%);
            pointer-events: none;
            z-index: 1;
          }
        `}
      </style>

      {birthdayBlocks.map(block => (
        <div
          key={block.id}
          className="birthday-block"
          style={{
            left: `${block.x}px`,
            top: `${block.y}px`,
            '--moveX': `${block.moveX}px`,
            '--moveY': `${block.moveY}px`,
            '--rotate': `${block.rotate}deg`,
            '--border-gradient': block.borderColor,
          }}
        >
          Happy Birthday!
        </div>
      ))}
    </div>
  );
}
