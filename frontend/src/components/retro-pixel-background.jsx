'use client'

import { useEffect, useState } from 'react'

interface Pixel {
  x: number
  y: number
  type: 'star' | 'dither' | 'cloud'
  speed?: number
  opacity?: number
}

export default function RetroPixelBackground() {
  const [pixels, setPixels] = useState < Pixel[] > ([])

  useEffect(() => {
    // Create initial pixels
    const newPixels: Pixel[] = [
      // Stars (sparse, bright pixels)
      ...Array.from({ length: 50 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: 'star' as const,
        opacity: 0.7 + Math.random() * 0.3
      })),
      // Dithering pattern (creates texture)
      ...Array.from({ length: 400 }, (_, i) => ({
        x: (i % 20) * 5,
        y: Math.floor(i / 20) * 5,
        type: 'dither' as const,
        opacity: 0.1 + Math.random() * 0.1
      })),
      // Clouds (clusters of pixels)
      ...Array.from({ length: 5 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: 'cloud' as const,
        speed: 0.02 + Math.random() * 0.03
      }))
    ]

    setPixels(newPixels)

    // Animate pixels
    const animatePixels = () => {
      setPixels(prevPixels =>
        prevPixels.map(pixel => {
          if (pixel.type === 'cloud') {
            return {
              ...pixel,
              x: (pixel.x + (pixel.speed || 0)) % 100
            }
          }
          if (pixel.type === 'star') {
            return {
              ...pixel,
              opacity: 0.7 + Math.sin(Date.now() / 1000 + pixel.x) * 0.3
            }
          }
          return pixel
        })
      )
    }

    const intervalId = setInterval(animatePixels, 50)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-purple-700 via-purple-500 to-orange-400"
        style={{ imageRendering: 'pixelated' }}
      />

      {/* Dithering pattern overlay */}
      <div className="absolute inset-0 opacity-50">
        {pixels.map((pixel, index) => {
          let pixelClass = ''
          let size = '1px'

          switch (pixel.type) {
            case 'star':
              pixelClass = 'bg-white animate-twinkle'
              size = '2px'
              break
            case 'dither':
              pixelClass = 'bg-white'
              break
            case 'cloud':
              pixelClass = 'bg-white rounded-full'
              size = '3px'
              break
          }

          return (
            <div
              key={index}
              className={absolute ${pixelClass}}
              style = {{
          left: ${ pixel.x } %,
          top: ${pixel.y}%,
        width: size,
        height: size,
        opacity: pixel.opacity,
              }}
            />
        )
        })}
      </div>

      {/* Your content goes here */}
      <div className="relative z-10 p-8">
        {/* Content wrapper */}
      </div>

      <style jsx>{
        @keyframes twinkle {
          0 %, 100 % { opacity: 1; }
          50% {opacity: 0.3; }
        }
        .animate-twinkle {
          animation: twinkle 2s infinite;
        }
      }</style>
    </div>
  )
}



