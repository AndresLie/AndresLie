"use client";
import { Home } from "../sections/home";
import Experience from "../sections/experience";
import { Navbar } from "./navbar";
import { useEffect, useState } from "react";
import Projects from "../sections/projects";
import Skills from "../sections/skills";
import Contact from "../sections/contact";

export default function Page() {
  const [activeSection, setActiveSection] = useState("Home");
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection: string | null = activeSection;

      const viewportMiddle = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.clientHeight;

        if (viewportMiddle >= sectionTop && viewportMiddle < sectionBottom) {
          currentSection = section.getAttribute("id");
        }
      });

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <>
      <Navbar
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
      <section id="Home" className="">
        <Home />
      </section>
      <section id="Experience" className="pt-16 pb-16">
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
    </>
  );
}
