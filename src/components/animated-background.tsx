"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Star field parameters
    const stars: Star[] = [];
    const numStars = 200;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const speed = 0.15;
    const starColors = [
      "rgba(255, 215, 0, 0.5)",
      "rgba(79, 180, 255, 0.3)",
      "rgba(255, 255, 255, 0.4)",
    ];

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width - centerX,
        y: Math.random() * canvas.height - centerY,
        z: Math.random() * 1000,
        prevZ: 0,
      });
    }

    // Nebula parameters
    const nebulaGradients = [
      { color: "rgba(255, 215, 0, 0.02)", size: 0.5 },
      { color: "rgba(79, 180, 255, 0.015)", size: 0.6 },
    ];

    const drawNebula = (
      x: number,
      y: number,
      gradient: { color: string; size: number }
    ) => {
      const radius = Math.min(canvas.width, canvas.height) * gradient.size;
      ctx.beginPath();
      const grd = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grd.addColorStop(0, gradient.color);
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebula effects with rotation
      nebulaGradients.forEach((gradient, i) => {
        const time = Date.now() * 0.0001;
        const radius = Math.min(canvas.width, canvas.height) * 0.4;
        const x = centerX + Math.cos(time + (i * Math.PI) / 2) * radius * 0.5;
        const y = centerY + Math.sin(time + (i * Math.PI) / 2) * radius * 0.5;
        drawNebula(x, y, gradient);
      });

      // Update star parameters
      stars.forEach((star, i) => {
        star.prevZ = star.z;
        star.z = star.z - speed;
        if (star.z <= 0) {
          star.z = 1000;
          star.prevZ = star.z;
          star.x = Math.random() * canvas.width - centerX;
          star.y = Math.random() * canvas.height - centerY;
        }

        const sx = map(star.x / star.z, 0, 1, 0, canvas.width) + centerX;
        const sy = map(star.y / star.z, 0, 1, 0, canvas.height) + centerY;
        const px = map(star.x / star.prevZ, 0, 1, 0, canvas.width) + centerX;
        const py = map(star.y / star.prevZ, 0, 1, 0, canvas.height) + centerY;

        // Increase star size and brightness
        const size = map(star.z, 0, 1000, 2, 0.1);
        const opacity = map(star.z, 0, 1000, 0.8, 0.1);

        // Draw star trail
        ctx.beginPath();
        ctx.strokeStyle = starColors[i % starColors.length];
        ctx.lineWidth = size;
        ctx.globalAlpha = opacity;
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Make the glow effect stronger
        ctx.beginPath();
        ctx.arc(sx, sy, size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = starColors[i % starColors.length];
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-50" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 0% 0%, rgba(255, 215, 0, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, rgba(79, 180, 255, 0.03) 0%, transparent 50%),
            linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%)
          `,
        }}
      />
    </div>
  );
}

// Utility function to map range of numbers
function map(
  value: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
): number {
  return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}
