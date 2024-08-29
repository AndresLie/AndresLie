import Image from 'next/image';
import React from 'react';

interface ImageHalfProps {
    imgPath: string;
    imgPathHovered: string;
    altText?: string; 
    isMobileImage?: boolean;
}

export default function ImageHalf({ imgPath, imgPathHovered, altText = "Image", isMobileImage }: ImageHalfProps) {
    return (
        <div className={`${isMobileImage ? 'w-full max-w-[150px]' : 'w-[50%]'} gap-4 pl-[10%] relative overflow-hidden group hidden md:block `}>
            {/* Default image with border */}
            <Image 
                src={imgPath} 
                alt={altText} 
                layout="fill" 
                objectFit="cover" 
                className="transform transition-all duration-500 translate-x-3 translate-y-4 opacity-100 group-hover:opacity-0 rounded-xl border-4 border-slate-950"
            />
            {/* Hovered image with border */}
            <Image 
                src={imgPathHovered} 
                alt={altText} 
                layout="fill" 
                objectFit="cover" 
                className="transform transition-all duration-500 translate-x-5 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:rotate-[-4deg] rounded-xl border-4 border-slate-950"
            />
        </div>
    );
}
