import React, { useState, useEffect, useRef, ReactNode } from "react";

interface ProjectCardProps {
  children: ReactNode;
  id: string;
}

export default function ProjectCard({ children, id }: ProjectCardProps) {
  const [scale, setScale] = useState<number>(1);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleResize = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const cardCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        const distanceFromCenter = Math.abs(viewportCenter - cardCenter);
        const maxDistance = viewportHeight / 2;

        // Calculate scale based on proximity to center (minimum scale is 1)
        const newScale = Math.max(
          0.7,
          0.7 + (1 - distanceFromCenter / maxDistance) * 0.1
        );

        setScale(newScale);

        animationFrameId = requestAnimationFrame(handleResize);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener("scroll", handleResize);
            handleResize(); // Initial calculation when the card comes into view
          } else {
            window.removeEventListener("scroll", handleResize);
            setScale(1); // Reset to initial scale when out of view
            cancelAnimationFrame(animationFrameId);
          }
        });
      },
      {
        threshold: 0.1, // Start observing when 10% of the card is in view
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
      window.removeEventListener("scroll", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      id={id}
      ref={cardRef}
      className="transition-all duration-75 ease-in-out bg-gray-100 hover:bg-gray-200 mx-auto flex justify-between pl-8 pt-8 pr-8 pb-8 md:pr-0 md:pb-0 rounded-lg group"
      style={{ transform: `scale(${scale})` }}
    >
      {children}
    </div>
  );
}
