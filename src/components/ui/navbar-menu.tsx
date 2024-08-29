"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
  duration: 1.0, // Slower transition duration
};

export const MenuItem = ({
  setActive,
  item,
  active,
  index,
  children,
  activeSection,
}: {
  setActive: (item: string) => void;
  active:string|null;
  item: string;
  index: number;
  children?: React.ReactNode;
  activeSection: boolean;
}) => {
  const delay = index * 0.15; // Adjust the delay for the cascading effect

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(item);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(item); // Update the active section
    }
  };

  return (
    <motion.div
      onMouseEnter={() => setActive(item)}
      className={`relative ${
        activeSection ? "bg-gray-400 text-white p-1 px-2 rounded-full md:w-auto w-[80%]" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...transition, delay }}
    >
      <Link href={`#${item}`} passHref onClick={handleScroll}>
        <motion.p
          className={`cursor-pointer text-black hover:opacity-[0.9] dark:text-white ${
            activeSection ? "text-white" : ""
          }`}
        >
          {item}
        </motion.p>
      </Link>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ ...transition, delay: delay + 0.2 }}
        >
          {active === item && children && (
            <div className="absolute top-[calc(100%_+_0.5rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
  <nav
    className="relative flex items-center justify-between bg-gray-300 md:rounded-full md:py-3 w-full"
    onMouseLeave={() => setActive(null)}
  >
    {/* Hamburger Icon / X Icon for Small Screens */}
    <div className="md:hidden absolute top-0 right-0 p-4 z-30">
      <button
        onClick={toggleMenu}
        className="text-blue-700 focus:outline-none"
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>
    </div>

    {/* Menu for Desktop and Expanded Menu for Mobile */}
    <div
      className={`${
        menuOpen ? "block" : "hidden"
      } md:flex md:justify-evenly flex-col md:flex-row items-center w-full top-full left-0 right-0 bg-gray-300 md:bg-transparent z-20 p-4 md:p-0`}
    >
      {children}
    </div>

    {/* Overlay for Small Screens */}
    {menuOpen && (
      <div
        className="fixed inset-0 bg-black opacity-50 z-10"
        onClick={toggleMenu}
      ></div>
    )}
  </nav>
);
};
export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link {...rest} className="text-neutral-700 dark:text-neutral-200 hover:text-black ">
      {children}
    </Link>
  );
};
