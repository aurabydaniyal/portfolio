"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { siteConfig } from "@/data/site-config";
import NavName from "@/components/ui/NavName";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const icon = (d: string) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const links = [
  { href: "#about", label: "About", icon: icon("M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0") },
  { href: "#stack", label: "Stack", icon: icon("M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5") },
  { href: "#work", label: "Work", icon: icon("M3 7h18v13H3zM8 7V4h8v3") },
  { href: "#engineering", label: "Engineering", icon: icon("M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14") },
  { href: "#experience", label: "Experience", icon: icon("M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z") },
  { href: "#contact", label: "Contact", icon: icon("M4 5h16v14H4zM4 7l8 6 8-6") },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Compact dropdown: closes on Escape / outside click / resize to desktop
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !btnRef.current?.contains(t)) setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 880) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <nav className="container nav-inner" aria-label="Main navigation">
        <a href="#home" className="brand" aria-label={`${siteConfig.name} — home`}>
          <span className="brand-dot" aria-hidden="true" />
          <NavName />
        </a>

        {/* Desktop Navigation with Smooth Sliding Glass Pill */}
        <div className="nav-links-wrap" onMouseLeave={() => setHovered(null)}>
          <ul className="nav-links-list">
            {links.map((l) => {
              const isActive = active === l.href.slice(1);
              const isHovered = hovered === l.href;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`nav-link-item ${isActive ? "active" : ""}`}
                    onMouseEnter={() => setHovered(l.href)}
                    onClick={() => setActive(l.href.slice(1))}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="nav-active-indicator"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      />
                    )}
                    {!isActive && isHovered && (
                      <motion.span
                        layoutId="nav-hover-pill"
                        className="nav-hover-indicator"
                        transition={{ type: "spring", stiffness: 460, damping: 34 }}
                      />
                    )}
                    <span className="nav-link-text">{l.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Theme toggle + mobile hamburger */}
        <div className="nav-actions">
          <AnimatedThemeToggler className="theme-toggle" aria-label="Toggle light / dark theme" duration={550} />
          <button
            ref={btnRef}
            className="menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-dropdown"
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Compact Dropdown (no screen takeover) */}
      <div ref={menuRef} id="nav-dropdown" className={`nav-dropdown${open ? " open" : ""}`} hidden={!open}>
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={active === l.href.slice(1) ? "active" : ""}
                aria-current={active === l.href.slice(1) ? "true" : undefined}
                onClick={() => {
                  setActive(l.href.slice(1));
                  setOpen(false);
                }}
              >
                {l.icon}
                <span>{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
