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
  children,
  activeSection,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  activeSection: boolean;
}) => {
  const delay = 0.15; // Adjust the delay for the cascading effect

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(item);
    if (element) {
      const yOffset = -96; // Fixed offset of 96px
      const yPosition =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: yPosition,
        behavior: "smooth",
      });

      setActive(item); // Update the active section
    }
  };

  return (
    <motion.div
      onMouseEnter={() => setActive(item)}
      className={`relative flex items-center justify-center h-[6vh] md:h-auto ${
        activeSection
          ? "bg-gray-400 text-white md:p-1 md:px-2 rounded-lg md:rounded-full md:w-auto"
          : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...transition, delay }}
    >
      <Link href={`#${item}`} passHref onClick={handleScroll}>
        <motion.p
          className={`cursor-pointer text-black hover:opacity-[0.9] dark:text-white flex justify-center md:justify-normal items-center ${
            activeSection ? "text-white" : ""
          }`}
        >
          {item}
        </motion.p>
      </Link>
      {active === item && children && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition}
        >
          <div className="hidden md:block absolute top-[calc(100%_+_0.5rem)] left-1/2 transform -translate-x-1/2 pt-4 ">
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

  useEffect(() => {
    // Toggle body overflow when menu is open
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up by resetting overflow when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav
      className="relative flex items-center justify-between bg-gray-300 md:rounded-full md:py-3 w-full "
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
              className="h-12 w-12"
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
              className="h-12 w-12"
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
        } md:flex md:justify-evenly flex-col md:flex-row items-center w-full top-full left-0 right-0 bg-gray-300 md:bg-transparent z-20 p-4 md:p-0 h-[50vh] md:h-full pt-16 md:pt-0 space-y-4 md:space-y-0`}
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
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (href.startsWith("#")) {
      // Ensure the href is an internal link with a hash
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        const yOffset = -108; // Set the offset to 96px
        const yPosition =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: yPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <Link
      href={href}
      className="flex space-x-2 hover:text-black hover:bg-slate-200 p-2 rounded-xl dark:hover:text-white transition duration-300 ease-in-out"
      onClick={handleClick} // Attach the click handler to the Link component
    >
      <Image
        src={src}
        width={200}
        height={30}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
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

export const HoveredLink = ({ children, href, ...rest }: any) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Only handle smooth scrolling for internal links
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        const navbarHeight = 96;
        const yOffset = -navbarHeight;
        const yPosition =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: yPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <Link
      href={href}
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black"
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};
