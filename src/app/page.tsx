"use client"
import { Home } from "./home";
import Experience from "./experience";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Navbar } from "./navbar";
import { useEffect, useState } from "react";
import Projects from "./projects";
import Skills from "./skills";
import Contact from "./contact";

export default function Page() {
  const [activeSection, setActiveSection] = useState("Home")
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection:string|null = activeSection;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 2) {
          currentSection = section.getAttribute("id");
        }
      });

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
      // console.log(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);
  return (
    <MantineProvider>
      <Navbar setActiveSection={setActiveSection} activeSection={activeSection} />
      <section id="Home" className="">
        <Home />
      </section>
      <section id="Experience" className="mb-24">
        <Experience />
      </section>
      <section id="Projects">
        <Projects />
      </section>
      <section id="Skills">
        <Skills />
      </section>
      <section id="">
        <Contact />
      </section>
    </MantineProvider>
  );
}
