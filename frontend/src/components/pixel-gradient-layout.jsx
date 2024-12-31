'use client'

import { useEffect, useState } from 'react'

interface PixelGradientLayoutProps {
  children: React.ReactNode
  from?: string
  via?: string
  to?: string
}

export default function PixelGradientLayout({
  children,
  from = '#6b21a8', // Default purple
  via = '#ec4899',  // Default pink
  to = '#fb923c'    // Default orange
}: PixelGradientLayoutProps) {
  const [sparkles, setSparkles] = useState < Array < { x: number; y: number; size: number } >> ([])

  // Create dithering rows with specific densities
  const ditherRows = Array.from({ length: 12 }, (_, i) => ({
    y: i * 8.33, // Evenly space rows across viewport
    opacity: 0.15 - (i * 0.01),
    density: Math.max(0.2, 1 - (i * 0.08)),
    offset: i % 2 === 0 ? 0 : 0.5 // Alternate row offsets for checkered pattern
  }))

  useEffect(() => {
    // Initialize sparkles with random positions and sizes
    const newSparkles = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() < 0.3 ? 2 : 1 // 30% chance of being a larger sparkle
    }))
    setSparkles(newSparkles)

    // Animate sparkles
    const interval = setInterval(() => {
      setSparkles(prev => prev.map(sparkle => ({
        ...sparkle,
        y: (sparkle.y + 0.05) % 100, // Slow, continuous downward movement
        x: sparkle.x + (Math.random() - 0.5) * 0.1 // Slight horizontal wobble
      })))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Base gradient background */}
      <div
        className="fixed inset-0 transition-colors duration-1000"
        style={{
          background: linear - gradient(to bottom, ${ from }, ${ via }, ${ to }),
          imageRendering: 'pixelated'
        }}
      />

      {/* Dithering pattern */}
      <div className="fixed inset-0">
        {ditherRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="absolute w-full"
            style={{
              top: ${row.y}%,
          height: '8.33%',
        opacity: row.opacity,
            }}
          >
        {Array.from({ length: Math.floor(100 * row.density) }, (_, i) => (
          <div
            key={i}
            className="absolute bg-black w-1 h-1"
            style={{
              left: ${(i / row.density) + row.offset}%,
          opacity: 0.2,
                }}
              />
            ))}
      </div>
        ))}
    </div>

      {/* Animated sparkles */ }
  {
    sparkles.map((sparkle, index) => (
      <div
        key={index}
        className="fixed w-1 h-1 bg-white animate-twinkle"
        style={{
          left: ${sparkle.x}%,
      top: ${ sparkle.y } %,
      width: ${ sparkle.size }px,
      height: ${ sparkle.size }px,
      opacity: 0.8,
          }
}
        />
      ))}

{/* Content container */ }
      <div className="relative z-10">
        {children}
      </div>

      <style jsx>{
        @keyframes twinkle {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }
        .animate-twinkle {
          animation: twinkle 2s infinite;
        }
      }</style>
    </div >
  )
}
