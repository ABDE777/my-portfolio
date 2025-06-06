
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython, FaGithub } from "react-icons/fa";
import { SiVercel, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ExternalLink, Code, LockIcon } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Inferno Heart E-commerce",
    description: "Une plateforme e-commerce moderne avec une interface utilisateur élégante et des fonctionnalités de panier d'achat. Développée avec Next.js et Tailwind CSS.",
    url: "https://inferno-heart-ecommerce.vercel.app/",
    github: "https://github.com/user/inferno-heart-ecommerce",
    image: "/project1.jpg",
    tags: ["React", "Next.js", "Tailwind CSS", "Vercel", "E-commerce"]
  },
  {
    id: 2,
    title: "Portfolio Personnel",
    description: "Exemple open source d'un portfolio professionnel présentant des compétences, projets et expériences en développement web. Conçu avec une approche minimaliste et élégante. (Ce n'est pas mon portfolio personnel mais une démonstration)",
    url: "https://abdelmonim-mazgoura-portfolio.vercel.app/",
    github: "https://github.com/user/portfolio-template",
    image: "/project2.jpg",
    tags: ["React", "Tailwind CSS", "JavaScript", "Vercel"]
  },
  {
    id: 3,
    title: "Club IT ISFO Site Web",
    description: "Un site web dynamique pour le club IT ISFO, présentant les activités, événements et membres. Conçu pour être informatif et facile à naviguer.",
    url: "https://clubitisfo.vercel.app/",
    github: "https://github.com/user/club-it-isfo",
    image: "/project3.jpg",
    tags: ["HTML", "CSS", "JavaScript", "React", "Vercel"]
  },
  {
    id: 4,
    title: "ABDE MARKET",
    description: "Une plateforme e-commerce avec une interface utilisateur intuitive pour explorer et acheter des produits. Implémentée avec des animations fluides et un design réactif.",
    url: "https://abde777.github.io/ABDE-MARKET/",
    github: "https://github.com/abde777/ABDE-MARKET",
    image: "/project4.jpg",
    tags: ["HTML", "CSS", "JavaScript", "E-commerce"]
  },
  {
    id: 5,
    title: "Python Types Game",
    description: "Un jeu éducatif interactif pour apprendre les types de données en Python. Idéal pour les débutants souhaitant renforcer leurs connaissances en programmation de manière ludique.",
    url: "https://abde777.github.io/python-type-game/py%20game/index.html",
    github: "https://github.com/abde777/python-type-game",
    image: "/project5.jpg",
    tags: ["HTML", "CSS", "JavaScript", "Python", "Game", "Education"]
  },
  {
    id: 6,
    title: "[Template Open-Source] Portfolio Développeur",
    description: "Template de portfolio professionnel open-source, conçu pour être personnalisable et clonable. Parfait pour développeurs souhaitant montrer leurs compétences/projets. Inclut : sections modulaires, dark/light mode, animations GSAP et design responsive. Tech : Next.js + Tailwind CSS.",
    url: "https://abdelmonim-mazgoura-portfolio.vercel.app/",
    github: "https://github.com/user/portfolio-template-open-source",
    image: "/project6.jpg",
    tags: ["Open-Source", "Template", "React", "Next.js", "Tailwind CSS", "Portfolio", "Responsive"]
  }
];

const tagIcons = {
  HTML: <FaHtml5 className="text-orange-400" />,
  CSS: <FaCss3Alt className="text-blue-400" />,
  JavaScript: <FaJs className="text-yellow-400" />,
  React: <FaReact className="text-cyan-400" />,
  Vercel: <SiVercel className="text-white" />,
  Python: <FaPython className="text-blue-500" />,
  "E-commerce": <span>🛒</span>,
  Game: <span>🎮</span>,
  Education: <span>📚</span>,
  "Next.js": <SiNextdotjs className="text-white" />,
  "Tailwind CSS": <SiTailwindcss className="text-cyan-400" />,
};

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [api, setApi] = useState<CarouselApi | null>(null);

  const handleCarouselChange = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    
    const selectedIndex = api.selectedScrollSnap();
    setActiveProject(selectedIndex);
  }, []);

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

    return () => {
      clearTimeout(timer);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        api?.scrollNext();
      } else if (e.key === 'ArrowLeft') {
        api?.scrollPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    
    handleCarouselChange(api);
    
    api.on("select", () => {
      handleCarouselChange(api);
    });
    
    return () => {
      api.off("select", () => {
        handleCarouselChange(api);
      });
    };
  }, [api, handleCarouselChange]);

  return (
    <section 
      id="projects" 
      className="py-24 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Enhanced title section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-cyan-500/10 border border-cyan-400/20 backdrop-blur-sm">
            <span className="text-sm tracking-wider uppercase font-medium text-cyan-400">
              Portfolio
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight mb-6">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
              Mes Projets
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mt-4"></div>
          <p className="mt-6 text-slate-300 max-w-2xl mx-auto text-lg">
            Découvrez une sélection de mes réalisations et projets personnels, reflétant mes compétences en développement web.
          </p>
        </div>
        
        <div className="mt-12 relative">
          <Carousel 
            setApi={setApi} 
            className="w-full"
            opts={{
              align: "start",
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projects.map((project, index) => (
                <CarouselItem key={project.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                  <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:translate-y-[-5px] h-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-cyan-400/20">
                    <div className="relative">
                      <AspectRatio ratio={16/9} className="bg-slate-900/60 border-b border-cyan-400/20">
                        {isLoading ? (
                          <Skeleton className="w-full h-full bg-slate-800/50" />
                        ) : (
                          <iframe 
                            src={project.url} 
                            title={project.title}
                            className="w-full h-full border-0"
                            loading="lazy"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                          />
                        )}
                      </AspectRatio>
                      
                      <div className="absolute -right-3 -top-3 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-lg transform rotate-12 hover:rotate-0 transition-all duration-300">
                        {index + 1}
                      </div>
                    </div>
                    
                    <CardHeader className="pb-3">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <HoverCard key={tagIndex}>
                            <HoverCardTrigger asChild>
                              <span 
                                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-500/10 backdrop-blur-md border border-cyan-400/20 cursor-pointer hover:bg-cyan-500/20 transition-colors shadow-sm text-cyan-300"
                              >
                                <span className="mr-1">{tagIcons[tag]}</span>
                                {tag}
                              </span>
                            </HoverCardTrigger>
                            <HoverCardContent className="glass-card border border-cyan-400/20 text-white bg-slate-800/90 backdrop-blur-md z-50">
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-cyan-300">{tag}</h4>
                                <p className="text-xs text-slate-300">
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
                        
                        {project.tags.length > 3 && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-700/50 backdrop-blur-md border border-slate-600/50 text-slate-400">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-xl md:text-2xl text-white leading-tight">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-slate-300 line-clamp-3 leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex flex-wrap gap-3 pt-2">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white transition-all duration-300 shadow-lg"
                        asChild
                      >
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Voir le Projet
                        </a>
                      </Button>
                      
                      {project.github && (
                        project.title === "Club IT ISFO Site Web" ? (
                          <Button 
                            variant="outline" 
                            className="flex-1 bg-slate-700/60 text-slate-400 border border-slate-600 cursor-not-allowed opacity-70"
                            disabled
                          >
                            <LockIcon className="mr-2 h-4 w-4" />
                            Privé
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            className="flex-1 bg-slate-700/60 hover:bg-slate-600/80 text-white border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
                            asChild
                          >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Code className="mr-2 h-4 w-4" />
                              Code Source
                            </a>
                          </Button>
                        )
                      )}
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="mt-8 flex items-center justify-center gap-4">
              <CarouselPrevious className="relative inset-auto mx-2 bg-cyan-500/20 hover:bg-cyan-500/30 backdrop-blur-sm border-cyan-400/20 text-white hover:text-white h-10 w-10" />
              <div className="flex space-x-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-300",
                      index === activeProject 
                        ? "w-8 bg-gradient-to-r from-cyan-500 to-blue-600" 
                        : "w-2.5 bg-white/20 hover:bg-white/40"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <CarouselNext className="relative inset-auto mx-2 bg-cyan-500/20 hover:bg-cyan-500/30 backdrop-blur-sm border-cyan-400/20 text-white hover:text-white h-10 w-10" />
            </div>
          </Carousel>

          <div className="mt-16 text-center">
            <Button 
              variant="outline" 
              className="group bg-transparent border border-cyan-500/30 text-white hover:bg-cyan-500/10 hover:border-cyan-500 transition-all duration-300"
              asChild
            >
              <a href="https://github.com/YourUsername" target="_blank" rel="noopener noreferrer">
                <span>Voir plus de projets sur GitHub</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
