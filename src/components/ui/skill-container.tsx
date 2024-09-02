import React, { ReactNode } from 'react';

// Correct type definition for props
interface SkillContainerProps {
  children: ReactNode;
  title:String;
  id:string;
}

export default function SkillContainer({ children,title,id}: SkillContainerProps) {
  return (
    <div className='flex flex-col justify-evenly'>
      <div id={id} className='bg-gray-200 p-8 rounded-xl'>
        <h1 className='text-2xl mb-7 flex justify-center md:justify-start'>{title}</h1>
        <div className='flex flex-wrap w-full gap-3 md:gap-8 justify-center md:justify-start'>
          {children}
        </div>
      </div>
    </div>
  );
}
