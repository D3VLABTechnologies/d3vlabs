"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
}

export function GlowBackground() {
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

    // Particle system
    const particles: Particle[] = [];
    const particleCount = 100;
    const colors = ["#4facfe", "#00f2fe", "#7b4397", "#dc2430", "#FFD700"];

    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.5,
      });
    }

    // Mouse interaction
    let mouse = { x: 0, y: 0 };
    canvas.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // Animation parameters
    let hue = 0;
    const text = "D3V.LABs";
    const fontSize = Math.min(canvas.width, canvas.height) * 0.15;

    const drawText = () => {
      ctx.save();
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Create gradient for text
      const gradient = ctx.createLinearGradient(
        canvas.width / 2 - 100,
        canvas.height / 2,
        canvas.width / 2 + 100,
        canvas.height / 2
      );
      gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 0.8)`);
      gradient.addColorStop(0.5, `hsla(${hue + 60}, 100%, 50%, 0.8)`);
      gradient.addColorStop(1, `hsla(${hue + 120}, 100%, 50%, 0.8)`);

      ctx.fillStyle = gradient;
      ctx.shadowColor = `hsla(${hue}, 100%, 50%, 0.8)`;
      ctx.shadowBlur = 20;
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      ctx.restore();
    };

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${
              0.1 * (1 - distance / 150)
            })`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Mouse interaction
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          particle.x -= Math.cos(angle) * 1;
          particle.y -= Math.sin(angle) * 1;
        }

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(particle.color)}, ${particle.alpha})`;
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 15;
        ctx.fill();
      });

      connectParticles();
      drawText();

      // Update hue for color cycling
      hue = (hue + 0.5) % 360;

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Helper function to convert hex to rgb
  function hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
          result[3],
          16
        )}`
      : "255, 255, 255";
  }

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-black" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
    </div>
  );
}
