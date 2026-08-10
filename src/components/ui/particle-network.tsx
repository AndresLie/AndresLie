"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface ParticleNetworkProps {
  className?: string;
  particleDensity?: number;
  maxParticles?: number;
  particleColor?: string;
  lineColor?: string;
  connectionDistance?: number;
  mouseRadius?: number;
  repelStrength?: number;
  speed?: number;
}

const generateParticles = (
  width: number,
  height: number,
  particleDensity: number,
  maxParticles: number,
  speed: number
): Particle[] => {
  const count = Math.min(
    Math.floor(width * height * particleDensity),
    maxParticles
  );
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * speed,
    vy: (Math.random() - 0.5) * speed,
    radius: Math.random() * 1.5 + 2,
  }));
};

export const ParticleNetwork: React.FC<ParticleNetworkProps> = ({
  className,
  particleDensity = 0.00012,
  maxParticles = 180,
  particleColor = "rgba(255,255,255,0.8)",
  lineColor = "rgba(180,200,255,0.75)",
  connectionDistance = 160,
  mouseRadius = 160,
  repelStrength = 2.2,
  speed = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sizeRef = useRef({ width: 0, height: 0 });
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const reducedMotionRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const optsRef = useRef({ particleDensity, maxParticles, speed });

  useEffect(() => {
    optsRef.current = { particleDensity, maxParticles, speed };
  }, [particleDensity, maxParticles, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      sizeRef.current = { width, height };
      const { particleDensity, maxParticles, speed } = optsRef.current;
      particlesRef.current = generateParticles(
        width,
        height,
        particleDensity,
        maxParticles,
        speed
      );
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(canvas);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current =
        x >= 0 && x <= rect.width && y >= 0 && y <= rect.height
          ? { x, y }
          : null;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mql.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const tick = () => {
      const { width, height } = sizeRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      if (!reducedMotionRef.current) {
        for (const p of particles) {
          let dx = 0;
          let dy = 0;
          if (mouse) {
            const ddx = p.x - mouse.x;
            const ddy = p.y - mouse.y;
            const dist = Math.hypot(ddx, ddy);
            if (dist > 0.01 && dist < mouseRadius) {
              const force = (mouseRadius - dist) / mouseRadius;
              dx = (ddx / dist) * force * repelStrength;
              dy = (ddy / dist) * force * repelStrength;
            }
          }

          p.x += p.vx + dx;
          p.y += p.vy + dy;

          if (p.x < 0) {
            p.x = 0;
            p.vx *= -1;
          } else if (p.x > width) {
            p.x = width;
            p.vx *= -1;
          }
          if (p.y < 0) {
            p.y = 0;
            p.vy *= -1;
          } else if (p.y > height) {
            p.y = height;
            p.vy *= -1;
          }
        }
      }

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < connectionDistance) {
            ctx.globalAlpha = 1 - dist / connectionDistance;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      ctx.fillStyle = particleColor;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (rafIdRef.current == null) {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };

    if (document.visibilityState === "visible") start();

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      stop();
    };
  }, [particleColor, lineColor, connectionDistance, mouseRadius, repelStrength]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full absolute inset-0", className)}
    />
  );
};
