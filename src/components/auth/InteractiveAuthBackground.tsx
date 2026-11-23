"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
}

export function InteractiveAuthBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseOver = false;

    // Colores de partículas: tonalidades Deinsa naranja, ámbar, cian y blanco estelar
    const colors = ["#F47F27", "#FB923C", "#38BDF8", "#818CF8", "#F8FAFC"];

    const particleCount = Math.min(85, Math.floor((width * height) / 14000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.5 + 0.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: baseAlpha,
        baseAlpha,
      });
    }

    function handleResize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseOver = true;
    }

    function handleMouseLeave() {
      isMouseOver = false;
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    function draw() {
      if (!ctx) return;

      // Fondo oscuro con estela suave
      ctx.clearRect(0, 0, width, height);

      // Resplandor radial interactivo centrado en el ratón
      if (isMouseOver) {
        const mouseGlow = ctx.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          260
        );
        mouseGlow.addColorStop(0, "rgba(244, 127, 39, 0.12)");
        mouseGlow.addColorStop(0.5, "rgba(56, 189, 248, 0.05)");
        mouseGlow.addColorStop(1, "transparent");
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 260, 0, Math.PI * 2);
        ctx.fill();
      }

      // Actualizar y dibujar partículas
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Movimiento
        p.x += p.vx;
        p.y += p.vy;

        // Rebote en bordes
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Atracción suave hacia el ratón si está cerca
        if (isMouseOver) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;

          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 0.03;
            p.vx += dx * force * 0.15;
            p.vy += dy * force * 0.15;
            p.alpha = Math.min(1, p.baseAlpha + 0.4);

            // Línea luminosa hacia el ratón
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(244, 127, 39, ${0.25 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          } else {
            p.alpha = p.baseAlpha;
          }
        }

        // Fricción suave para evitar velocidades extremas
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Dibujar partícula con aura
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Conexiones entre partículas cercanas (Constelación)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const connectionLimit = 115;

          if (dist < connectionLimit) {
            const lineAlpha = (1 - dist / connectionLimit) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-90"
    />
  );
}
