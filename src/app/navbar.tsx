"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";

export function Navbar({
  className,
  activeSection,
  setActiveSection,
}: {
  className?: string;
  activeSection: string;
  setActiveSection: (section: string) => void;
}) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "fixed top-6 inset-x-0 md:max-w-[55vw] mx-auto z-50",
        className
      )}
    >
      <Menu setActive={setActive}>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Home"
          activeSection={activeSection == "Home"}
        />
        <MenuItem
          setActive={setActive}
          active={active}
          item="Projects"
          activeSection={activeSection == "Projects"}
        >
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="#Semiconductor-Console">
              Virtual Tool Console for Semiconductor Equipment
            </HoveredLink>
            <HoveredLink href="#TSRAD">
              TSRAD: Time-Series Anomaly Detection System
            </HoveredLink>
            <HoveredLink href="#Aideal-Project">
              Aideal: Full-stack Education Platform
            </HoveredLink>
          </div>
        </MenuItem>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Experience"
          activeSection={activeSection == "Experience"}
        />
        <MenuItem
          setActive={setActive}
          active={active}
          item="Education"
          activeSection={activeSection == "Education"}
        />
        <MenuItem
          setActive={setActive}
          active={active}
          item="Skills"
          activeSection={activeSection == "Skills"}
        >
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="#Frontend">Frontend Development</HoveredLink>
            <HoveredLink href="#Backend">Backend Development</HoveredLink>
            <HoveredLink href="#Mobile">Mobile App Development</HoveredLink>
            <HoveredLink href="#Others">Others</HoveredLink>
          </div>
        </MenuItem>
        {/* <MenuItem setActive={setActive} active={active} item="Contact" activeSection={activeSection=="Contact"}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem> */}
      </Menu>
    </div>
  );
}
