import { useState, useEffect, useCallback, useRef } from "react";

export default function BirthdayAnimator({ className }) {
  // State for storing all birthday blocks
  const [birthdayBlocks, setBirthdayBlocks] = useState([]);

  // Reference to track cursor position
  const cursorPosition = useRef({ x: 0, y: 0 });

  // Array of border gradient colors for blocks (bright colors that pop against purple)
  const borderColors = [
    'linear-gradient(135deg, #FF36F5, #42C9FF)', // Pink to blue
    'linear-gradient(135deg, #FFC700, #FF85DD)', // Gold to pink
    'linear-gradient(135deg, #00FFF0, #7700FF)', // Teal to purple
    'linear-gradient(135deg, #FF5E7A, #FFB961)', // Coral to orange
    'linear-gradient(135deg, #51F0B0, #8973FF)', // Mint to lavender
    'linear-gradient(135deg, #FFF173, #FF626D)', // Yellow to red
    'linear-gradient(135deg, #C1FF72, #00C3FF)', // Lime to blue
    'linear-gradient(135deg, #FF9CFE, #FFD79C)', // Light pink to peach
  ];

  // Track mouse position
  const handleMouseMove = useCallback((event) => {
    cursorPosition.current = { x: event.clientX, y: event.clientY };
  }, []);

  // Function to create a new block
  const createBlock = useCallback(() => {
    // Use the current cursor position
    const { x, y } = cursorPosition.current;

    // Generate unique id for this birthday block
    const id = `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create a new block with random movement properties
    const newBlock = {
      id,
      x: x - 100, // Center horizontally
      y: y - 25,  // Center vertically
      moveX: (Math.random() - 0.5) * 300, // Random X direction (-150px to 150px)
      moveY: (Math.random() - 0.5) * 300, // Random Y direction (-150px to 150px)
      rotate: (Math.random() - 0.5) * 90,  // Random rotation (-45deg to 45deg)
      borderColor: borderColors[Math.floor(Math.random() * borderColors.length)], // Random border color
    };

    // Add the new block to our state
    setBirthdayBlocks(prevBlocks => [...prevBlocks, newBlock]);

    // Remove the block after animation completes (3 seconds)
    setTimeout(() => {
      setBirthdayBlocks(prevBlocks => prevBlocks.filter(block => block.id !== id));
    }, 3000);
  }, [borderColors]);

  // Handle click to create block
  const handleClick = useCallback(() => {
    createBlock();
  }, [createBlock]);

  // Add mouse tracking event listener
  useEffect(() => {
    // Set up mouse tracking
    document.addEventListener('mousemove', handleMouseMove);

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  // Set up auto-generation of blocks on a timer at cursor position
  useEffect(() => {
    const autoCreateInterval = setInterval(() => {
      createBlock();
    }, 400); // Create a new block every 0.4 seconds

    // Clean up interval on component unmount
    return () => clearInterval(autoCreateInterval);
  }, [createBlock]);

  return (
    <div
      className={className}
      onClick={handleClick}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {/* CSS Animations */}
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
            background: rgba(128, 90, 213, 0.6); /* Blurry purple base */
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

      {/* Render all birthday blocks */}
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