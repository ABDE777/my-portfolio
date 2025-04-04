import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython } from "react-icons/fa";
import { SiVercel, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

const projects = [
  {
    id: 1,
    title: "Inferno Heart E-commerce",
    description: "Une plateforme e-commerce moderne avec une interface utilisateur élégante et des fonctionnalités de panier d'achat. Développée avec Next.js et Tailwind CSS.",
    url: "https://inferno-heart-ecommerce.vercel.app/",
    image: "/lovable-uploads/project1.jpg",
    tags: ["React", "Next.js", "Tailwind CSS", "Vercel", "E-commerce"]
  },
 {
    "id": 2,
    "title": "Portfolio Personnel",
    "description": "Exemple open source d'un portfolio professionnel présentant des compétences, projets et expériences en développement web. Conçu avec une approche minimaliste et élégante. (Ce n'est pas mon portfolio personnel mais une démonstration)",
    "url": "https://abdelmonim-mazgoura-portfolio.vercel.app/",
    "image": "/lovable-uploads/project2.jpg",
    "tags": ["React", "Tailwind CSS", "JavaScript", "Vercel"]
}
  {
    id: 3,
    title: "Club IT ISFO Site Web",
    description: "Un site web dynamique pour le club IT ISFO, présentant les activités, événements et membres. Conçu pour être informatif et facile à naviguer.",
    url: "https://clubitisfo.vercel.app/",
    image: "/lovable-uploads/project3.jpg",
    tags: ["HTML", "CSS", "JavaScript", "React", "Vercel"]
  },
  {
    id: 4,
    title: "ABDE MARKET",
    description: "Une plateforme e-commerce avec une interface utilisateur intuitive pour explorer et acheter des produits. Implémentée avec des animations fluides et un design réactif.",
    url: "https://abde777.github.io/ABDE-MARKET/",
    image: "/lovable-uploads/project4.jpg",
    tags: ["HTML", "CSS", "JavaScript", "E-commerce"]
  },
  {
    id: 5,
    title: "Python Types Game",
    description: "Un jeu éducatif interactif pour apprendre les types de données en Python. Idéal pour les débutants souhaitant renforcer leurs connaissances en programmation de manière ludique.",
    url: "https://abde777.github.io/python-type-game/py%20game/index.html",
    image: "/lovable-uploads/project5.jpg",
    tags: ["HTML", "CSS", "JavaScript", "Python", "Game", "Education"]
  }
];

const tagIcons = {
  HTML: <FaHtml5 className="text-orange-500" />,
  CSS: <FaCss3Alt className="text-blue-500" />,
  JavaScript: <FaJs className="text-yellow-400" />,
  React: <FaReact className="text-blue-400" />,
  Vercel: <SiVercel className="text-black" />,
  Python: <FaPython className="text-blue-600" />,
  "E-commerce": <span>🛒</span>,
  Game: <span>🎮</span>,
  Education: <span>📚</span>,
  "Next.js": <SiNextdotjs className="text-black" />,
  "Tailwind CSS": <SiTailwindcss className="text-sky-500" />,
};

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      const elements = backgroundRef.current.querySelectorAll('.bg-element');
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      elements.forEach((el, index) => {
        const factor = (index + 1) * 15;
        const htmlEl = el as HTMLElement;
        htmlEl.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section 
      id="projects" 
      className="py-32 bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white px-4 md:px-16 lg:px-24 relative overflow-hidden"
    >
      <div 
        ref={backgroundRef}
        className="absolute top-0 left-0 w-full h-full overflow-hidden z-0"
        style={{ perspective: '1000px' }}
      >
        <div className="bg-element absolute -top-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transition-transform duration-300 ease-out"></div>
        <div className="bg-element absolute top-1/3 -left-24 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl transition-transform duration-300 ease-out"></div>
        <div className="bg-element absolute bottom-1/4 right-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl transition-transform duration-300 ease-out"></div>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
        
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-40"></div>
        <div className="bg-element absolute top-3/4 left-2/3 w-3 h-3 bg-indigo-400 rounded-full animate-float opacity-30" style={{ animationDelay: '1s' }}></div>
        <div className="bg-element absolute top-1/2 left-1/5 w-2 h-2 bg-blue-300 rounded-full animate-float opacity-20" style={{ animationDelay: '2s' }}></div>
        <div className="bg-element absolute top-1/3 right-1/4 w-4 h-4 bg-purple-300/50 rounded-full animate-float opacity-30" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="absolute inset-0 bg-radial-gradient from-purple-900/10 to-transparent opacity-70"></div>
      </div>
      
      <div 
        ref={sectionRef}
        className="max-w-7xl mx-auto relative z-10 animate-on-scroll"
      >
        <div className="text-center mb-20">
          <span className="inline-block text-purple-400 text-sm tracking-wider uppercase font-semibold mb-2">
            Portfolio
          </span>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
            Mes Projets
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto mt-6 rounded-full"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
            Découvrez une sélection de mes réalisations et projets personnels, reflétant mes compétences en développement web.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          <div className="lg:col-span-7 order-2 lg:order-1 transform lg:-translate-x-6 z-10">
            <div className="relative group">
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-purple-500/30 rounded-lg"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-indigo-500/30 rounded-lg"></div>
              
              <div className="relative overflow-hidden rounded-xl border-2 border-white/10 shadow-2xl group-hover:border-purple-500/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                
                <AspectRatio ratio={16/9} className="bg-black/40">
                  {isLoading ? (
                    <Skeleton className="w-full h-full bg-gray-800/50" />
                  ) : (
                    <iframe 
                      src={projects[activeProject].url} 
                      title={projects[activeProject].title}
                      className="w-full h-full border-0"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  )}
                </AspectRatio>
                
                <div className="absolute -right-3 -top-3 w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow-lg transform rotate-12 group-hover:rotate-0 transition-all duration-300">
                  {activeProject + 1}/{projects.length}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="space-y-8 backdrop-blur-sm p-6 rounded-xl border border-white/10 bg-white/5">
              <div className="flex flex-wrap gap-2 mb-4">
                {projects[activeProject].tags.map((tag, index) => (
                  <HoverCard key={index}>
                    <HoverCardTrigger asChild>
                      <span 
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 backdrop-blur-md border border-white/5 cursor-pointer hover:bg-white/20 transition-colors shadow-sm"
                      >
                        <span className="mr-1.5">{tagIcons[tag]}</span>
                        {tag}
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="glass-card border border-white/10 text-white">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-purple-300">{tag}</h4>
                        <p className="text-xs text-gray-300">
                          {tag === "HTML" && "Structure et sémantique des pages web"}
                          {tag === "CSS" && "Mise en page et styles visuels"}
                          {tag === "JavaScript" && "Programmation côté client pour interactivité"}
                          {tag === "React" && "Bibliothèque JavaScript pour interfaces utilisateur"}
                          {tag === "Vercel" && "Plateforme de déploiement et d'hébergement"}
                          {tag === "Python" && "Langage de programmation polyvalent"}
                          {tag === "E-commerce" && "Solutions de vente en ligne"}
                          {tag === "Game" && "Développement de jeux interactifs"}
                          {tag === "Education" && "Outils d'apprentissage interactifs"}
                          {tag === "Next.js" && "Framework React pour applications web"}
                          {tag === "Tailwind CSS" && "Framework CSS utilitaire"}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                {projects[activeProject].title}
              </h3>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                {projects[activeProject].description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                <a 
                  href={projects[activeProject].url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    Voir le Projet 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </a>
                
                <div className="flex space-x-3">
                  <button 
                    onClick={prevProject}
                    className="w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 shadow-md hover:shadow-purple-500/10"
                    aria-label="Projet précédent"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={nextProject}
                    className="w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 shadow-md hover:shadow-purple-500/10"
                    aria-label="Projet suivant"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-16 space-x-4">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveProject(index)}
              className={cn(
                "group relative transition-all duration-300 focus:outline-none",
                activeProject === index ? "scale-110" : "opacity-50 hover:opacity-75"
              )}
              aria-label={`Aller au projet ${index + 1}`}
            >
              <div className={cn(
                "w-16 h-3 rounded-full overflow-hidden",
                activeProject === index ? "bg-gradient-to-r from-purple-400/30 to-indigo-400/30" : "bg-white/10"
              )}>
                <div className={cn(
                  "h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-500", 
                  activeProject === index ? "w-full" : "w-0 group-hover:w-1/3"
                )}></div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
