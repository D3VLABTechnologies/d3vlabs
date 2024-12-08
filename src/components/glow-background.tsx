'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function GlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Line animation parameters
    let startX = 50
    let startY = 50
    let currentX = startX
    let currentY = startY
    let targetX = startX + 100
    let targetY = startY
    let progress = 0
    let glowIntensity = 0
    let glowDirection = 1

    // Text parameters
    const text = 'D3V.LABs'
    const fontSize = Math.min(canvas.width, canvas.height) * 0.2
    ctx.font = `bold ${fontSize}px Arial`
    const textWidth = ctx.measureText(text).width

    const drawBlockLetter = (letter: string, x: number, y: number, width: number, height: number) => {
      const letterWidth = ctx.measureText(letter).width
      const scale = Math.min(width / letterWidth, height)
      const scaledWidth = letterWidth * scale
      const scaledHeight = fontSize * scale
      
      ctx.save()
      ctx.translate(x + (width - scaledWidth) / 2, y + height)
      ctx.scale(scale, scale)
      ctx.fillText(letter, 0, 0)
      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update glow intensity
      glowIntensity += 0.02 * glowDirection
      if (glowIntensity >= 1 || glowIntensity <= 0.3) {
        glowDirection *= -1
      }

      // Draw the glowing line
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(currentX, currentY)
      
      // Create glow effect for line
      ctx.shadowColor = '#FFD700'
      ctx.shadowBlur = 20 * glowIntensity
      ctx.strokeStyle = `rgba(255, 215, 0, ${glowIntensity * 0.5})`
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw block letters with glow
      const blockWidth = canvas.width / text.length
      const blockHeight = canvas.height * 0.8
      const letterStartY = (canvas.height - blockHeight) / 2

      ctx.fillStyle = `rgba(255, 215, 0, ${0.1 + glowIntensity * 0.1})`
      ctx.shadowColor = '#FFD700'
      ctx.shadowBlur = 30 * glowIntensity

      for (let i = 0; i < text.length; i++) {
        drawBlockLetter(text[i], i * blockWidth, letterStartY, blockWidth, blockHeight)
      }

      // Reset shadow for next frame
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0

      // Update line progress
      if (progress < 1) {
        progress += 0.01
        currentX = startX + (targetX - startX) * progress
        currentY = startY + (targetY - startY) * progress
      } else {
        // Reset animation with new coordinates
        startX = currentX
        startY = currentY
        progress = 0

        // Create geometric pattern
        const angle = Math.random() * Math.PI * 2
        const distance = 100
        targetX = startX + Math.cos(angle) * distance
        targetY = startY + Math.sin(angle) * distance

        // Keep within bounds
        targetX = Math.max(50, Math.min(canvas.width - 50, targetX))
        targetY = Math.max(50, Math.min(canvas.height - 50, targetY))
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-black" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: 0.7 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
    </div>
  )
}

