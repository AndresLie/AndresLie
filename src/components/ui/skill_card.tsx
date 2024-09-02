import React, { ReactNode } from 'react';

interface SkillCardProps {
  children: ReactNode;
  desc: string;
}

export default function SkillCard({ children, desc }: SkillCardProps) {
  return (
    <div className="flex flex-col items-center group relative transition-all duration-500 ease-in-out p-5 hover:bg-slate-400 rounded-2xl">
      {/* Icon */}
      <div className="skill-content transform transition-transform duration-500 ease-in-out group-hover:translate-y-6 mb-4">
        {children}
      </div>
      
      {/* Line */}
      <div className="h-px w-full bg-black my-2  transition-all duration-500 ease-in-out group-hover:translate-y-12 group-hover:bg-white"></div>
      
      {/* Description */}
      <div className="transform transition-transform duration-500 ease-in-out mt-3 group-hover:-translate-y-2 group-hover:text-white">
        {desc}
      </div>
    </div>
  );
}
