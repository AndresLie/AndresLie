import React from "react";
import { Icon } from "@iconify/react";

export default function Contact() {
  return (
    <div className="h-[85vh]  flex flex-col items-center justify-center px-10 w-full">
      <h1 className="text-3xl mb-8">Contact Me</h1>

      {/* Wrap the icons in a mailto link */}
      <a
        href="mailto:andreeli707@gmail.com"
        className="relative group p-5 rounded-2xl bg-gray-200 hover:bg-gray-400 h-20 w-20 overflow-hidden"
      >
        {/* Mail icon */}
        <Icon
          icon="material-symbols:mail-outline"
          width={60}
          height={60}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:translate-x-20"
        />

        {/* Arrow right icon */}
        <Icon
          icon="material-symbols:arrow-right-alt-rounded"
          width={30}
          height={30}
          className="absolute top-1/2 left-0 transform -translate-x-8 -translate-y-1/2 transition-transform duration-500 group-hover:translate-x-7"
        />
      </a>
    </div>
  );
}
