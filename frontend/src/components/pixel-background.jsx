'use client'

import { useEffect, useState } from 'react'

interface DitherRow {
  y: number
  opacity: number
  density: number
}

export default function PixelBackground() {
  const [sparkles, setSparkles] = useState < { x: number; y: number }[] > ([])

  // Create dithering pattern rows with varying density
  const ditherRows: DitherRow[] = Array.from({ length: 20 }, (_, i) => ({
    y: i * 5,
    opacity: 0.15 - i * 0.005,
    density: Math.max(0.1, 1 - i * 0.05),
  }))

  useEffect(() => {
    // Create random sparkles
    const newSparkles = Array.from({ length: 15 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setSparkles(newSparkles)

    // Animate sparkles
    const interval = setInterval(() => {
      setSparkles((prev) =>
        prev.map((sparkle) => ({
          x: sparkle.x,
          y: (sparkle.y + 0.1) % 100,
        }))
      )
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#6b21a8] via-[#ec4899] to-[#fb923c]"
        style={{ imageRendering: 'pixelated' }}
      />

      {/* Dithering pattern layers */}
      {ditherRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="absolute w-full"
          style={{
            top: `${row.y}%`,
            height: '5%',
            opacity: row.opacity,
          }}
        >
          {Array.from({ length: Math.floor(100 * row.density) }, (_, i) => (
            <div
              key={i}
              className="absolute bg-black w-1 h-1"
              style={{
                left: `${(i / row.density) * 100}%`,
                opacity: 0.2,
              }}
            />
          ))}
        </div>
      ))}

      {/* Sparkles */}
      {sparkles.map((sparkle, index) => (
        <div
          key={index}
          className="absolute w-1 h-1 bg-white animate-twinkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            opacity: 0.8,
          }}
        />
      ))}

      {/* Content container */}
      <div className="relative z-10">
        {/* Your content here */}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.3;
          }
        }
        .animate-twinkle {
          animation: twinkle 2s infinite;
        }
      `}</style>
    </div>
  )
}
