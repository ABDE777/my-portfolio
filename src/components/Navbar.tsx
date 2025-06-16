
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
      const sections = ["about", "skills", "github-stats", "projects", "reviews", "contact"];
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
    { key: "github-stats", label: "GitHub Stats" },
    { key: "projects", label: "Projets" },
    { key: "reviews", label: "Avis" },
    { key: "contact", label: "Contact" }
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-6 md:px-12",
        scrolled
          ? "py-3 bg-slate-900 backdrop-blur-xl shadow-2xl border-b border-cyan-500/30"
          : "py-5 bg-slate-900 backdrop-blur-lg shadow-xl border-b border-cyan-500/20"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="#top" 
          className="text-white font-bold text-2xl tracking-tight hover:text-cyan-400 transition-colors duration-300"
        >
          ABDEL<span className="text-cyan-400">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={`#${item.key}`}
              className={cn(
                "relative font-medium px-4 py-2 rounded-lg transition-all duration-300 group",
                activeSection === item.key 
                  ? "text-cyan-400 bg-cyan-400/15 shadow-lg shadow-cyan-400/25 border border-cyan-400/20" 
                  : "text-white hover:text-cyan-400 hover:bg-white/10 hover:shadow-md"
              )}
            >
              <span className="relative">
                {item.label}
                <span 
                  className={cn(
                    "absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400 origin-left transition-transform duration-300",
                    activeSection === item.key ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                ></span>
              </span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-3 rounded-xl bg-slate-800 text-white hover:bg-cyan-500/20 transition-all duration-300 shadow-lg backdrop-blur-sm border border-cyan-400/20"
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
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute left-0 right-0 top-full bg-slate-900 backdrop-blur-lg shadow-2xl transition-all duration-300 ease-in-out overflow-hidden border-b border-cyan-400/30",
          mobileMenuOpen ? "max-h-screen py-6" : "max-h-0 py-0"
        )}
      >
        <div className="px-6 flex flex-col space-y-3">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={`#${item.key}`}
              className={cn(
                "py-3 px-4 rounded-lg transition-all duration-300 relative group",
                activeSection === item.key 
                  ? "text-cyan-400 bg-cyan-400/15 shadow-lg shadow-cyan-400/25 border border-cyan-400/20" 
                  : "text-white hover:text-cyan-400 hover:bg-white/10"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="relative">
                {item.label}
                <span 
                  className={cn(
                    "absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400 origin-left transition-transform duration-300",
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
