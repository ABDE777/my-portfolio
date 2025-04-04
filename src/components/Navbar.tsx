
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      // Set navbar background based on scroll position
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine which section is currently in view
      const sections = ["about", "skills", "projects", "contact", "reviews"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { key: "about", label: "À Propos" },
    { key: "skills", label: "Compétences" },
    { key: "projects", label: "Projets" },
    { key: "contact", label: "Contact" },
    { key: "reviews", label: "Avis" }
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-6 md:px-12",
        scrolled
          ? "py-3 bg-portfolio-dark/95 backdrop-blur-lg shadow-lg"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="#top" 
          className="text-portfolio-light font-bold text-2xl tracking-tight opacity-90 hover:opacity-100 transition-opacity"
        >
          ABDEL<span className="text-portfolio-accent">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={`#${item.key}`}
              className={cn(
                "relative font-medium hover:text-portfolio-accent transition-colors px-3 py-2 group",
                activeSection === item.key ? "text-portfolio-accent" : "text-portfolio-light"
              )}
            >
              <span className="relative">
                {item.label}
                <span 
                  className={cn(
                    "absolute -bottom-1 left-0 w-full h-0.5 bg-portfolio-accent origin-left transition-transform duration-300",
                    activeSection === item.key ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                ></span>
              </span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-portfolio-light focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute left-0 right-0 top-full bg-portfolio-dark/95 backdrop-blur-lg shadow-xl transition-all duration-300 ease-in-out overflow-hidden",
          mobileMenuOpen ? "max-h-screen py-4" : "max-h-0 py-0"
        )}
      >
        <div className="px-6 flex flex-col space-y-4">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={`#${item.key}`}
              className={cn(
                "py-2 transition-colors relative group",
                activeSection === item.key ? "text-portfolio-accent" : "text-portfolio-light"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="relative">
                {item.label}
                <span 
                  className={cn(
                    "absolute -bottom-1 left-0 w-full h-0.5 bg-portfolio-accent origin-left transition-transform duration-300",
                    activeSection === item.key ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                ></span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
