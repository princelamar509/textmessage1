import { useState, useEffect } from 'react';

const EnhancedGrid = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trailPositions, setTrailPositions] = useState([]);
  const [hoverCount, setHoverCount] = useState({});
  
  // Configuration
  const gridSize = 50;
  const trailLength = 5;
  const maxIntensity = 0.8;
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = Math.floor(event.clientX / gridSize) * gridSize;
      const y = Math.floor(event.clientY / gridSize) * gridSize;
      
      // Update current position
      setMousePos({ x, y });
      
      // Update trail
      setTrailPositions(prev => {
        const newTrail = [{ x, y, id: Date.now() }, ...prev.slice(0, trailLength - 1)];
        return newTrail;
      });
      
      // Update hover count for heat effect
      const cellKey = `${x},${y}`;
      setHoverCount(prev => ({
        ...prev,
        [cellKey]: (prev[cellKey] || 0) + 1
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [gridSize]);

  // Get color based on position
  const getHighlightColor = (x, y) => {
    const hue = Math.abs((x + y) % 360);
    return `hsla(${hue}, 80%, 150%, 3.6)`;
  };

  // Get heat intensity for a cell
  const getHeatIntensity = (x, y) => {
    const cellKey = `${x},${y}`;
    const count = hoverCount[cellKey] || 0;
    return Math.min(count / 20, maxIntensity);
  };

  return (
    <svg
      width="100vw"
      height="100vh"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        opacity: 0.9,
        zIndex: -1,
        userSelect: 'none',
      }}
    >
      {/* Grid lines */}
      {Array.from({ length: Math.ceil(window.innerWidth / gridSize) }, (_, i) => (
        <line
          key={`v${i}`}
          x1={i * gridSize}
          y1={0}
          x2={i * gridSize}
          y2="100vh"
          stroke="gray"
          strokeWidth="0.5"
        />
      ))}
      {Array.from({ length: Math.ceil(window.innerHeight / gridSize) }, (_, i) => (
        <line
          key={`h${i}`}
          x1={0}
          y1={i * gridSize}
          x2="100vw"
          y2={i * gridSize}
          stroke="gray"
          strokeWidth="0.5"
        
        />
      ))}

      {/* Heat map effect */}
      {Object.entries(hoverCount).map(([key, _]) => {
        const [x, y] = key.split(',').map(Number);
        return (
          <rect
            key={key}
            x={x}
            y={y}
            width={gridSize}
            height={gridSize}
            fill="rgba(255, 0, 0, 0.1)"
            style={{
              opacity: getHeatIntensity(x, y),
              transition: 'opacity 0.5s ease-in-out',
               overflow: 'hidden',
               animation: 'pulse 1s infinite'

              
            }}
          />
        );
      })}

      {/* Trail effect */}
      {trailPositions.map(({ x, y, id }, index) => (
        <rect
          key={id}
          x={x}
          y={y}
          width={gridSize}
          height={gridSize}
          fill="none"
          stroke={getHighlightColor(x, y)}
          strokeWidth={2 * (1 - index / trailLength)}
          style={{
            opacity: 1 - (index / trailLength),
            transition: 'all 0.2s cubic-bezier(0.9, 0, 0.7, 1)',
            overflow: 'hidden'
          }}
        />
      ))}

      {/* Current position highlight with pulse effect */}
      <rect
        x={mousePos.x}
        y={mousePos.y}
        width={gridSize}
        height={gridSize}
        fill="none"
        stroke={getHighlightColor(mousePos.x, mousePos.y)}
        strokeWidth="2"
        style={{
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden'
        }}
      >
        <animate
          attributeName="stroke-width"
          values="2;4;2"
          dur="1s"
          repeatCount="indefinite"
          begin="0.2s"
        />
      </rect>
    </svg>
  );
};

export default EnhancedGrid;