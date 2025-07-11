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
import { ArrowRight, ExternalLink, Code, LockIcon, ArrowDown } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "CHEBKA",
    description: "La toile qui connecte les talents d'aujourd'hui aux opportunités de demain. Une plateforme marocaine innovante qui tisse des liens solides entre étudiants, établissements de formation et entreprises, pour favoriser l'insertion professionnelle et développer un écosystème éducatif performant.",
    url: "https://chebka.vercel.app/",
    github: "https://github.com/ABDE777",
    image: "/project1.jpg",
    tags: ["React", "Next.js", "Tailwind CSS"]
  },
  {
    id: 2,
    title: "Club IT ISFO Site Web",
    description: "Un site web dynamique pour le club IT ISFO, présentant les activités, événements et membres. Conçu pour être informatif et facile à naviguer.",
    url: "https://clubitisfo.vercel.app/",
    github: "https://github.com/ABDE777",
    image: "/project3.jpg",
    tags:  ["React", "Next.js", "Tailwind CSS"]
  },
  {
    id: 3,
    title: "Digital Skills & Jobs Day 2025",
    description: "Un événement incontournable pour les passionnés du numérique et les professionnels du secteur IT au Maroc. Cette première édition, organisée à l’OFPPT Casablanca, propose des conférences sur l’intelligence artificielle, la cybersécurité et la transformation digitale, ainsi que des opportunités de networking et de développement professionnel.",
    url: "https://conference-hazel.vercel.app/",
    github: "https://github.com/abde777",
    image: "/project4.jpg",
    tags: ["React", "Next.js", "Tailwind CSS"]
  },
  {
    id: 4,
    title: "ACAPA – La Communauté Passionnée de Pétanque",
    description: "ACAPA est une association dédiée aux amateurs et professionnels de la pétanque. Elle rassemble des joueurs de tous âges autour de tournois, entraînements et événements dans une ambiance conviviale. Le site propose des articles techniques, historiques et des astuces pour améliorer son jeu, ainsi qu’un espace de contact pour rejoindre la communauté.",
    url: "https://a-c-a-p-a.vercel.app/",
    github: "https://github.com/abde777",
    image: "/project5.jpg",
    tags: ["React", "Next.js", "Tailwind CSS"]
  },
  {
    id: 5,
    title: "MAZGOURA-LINKTREE",
    description: "Une page Linktree regroupant les projets, réseaux professionnels et plateformes d’ABD EL MONIM MAZGOURA. Elle permet une navigation rapide vers ses réalisations, ses collaborations et ses liens pertinents dans le domaine du développement et de l’innovation technologique.",
    url: "https://my-linktree-one.vercel.app/",
    github: "https://github.com/ABDE777",
    image: "/project6.jpg",
    tags: ["HTML","CSS","Vercel"]
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
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section 
      id="projects" 
      className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayedProjects.map((project, index) => (
                <Card key={project.id} className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:translate-y-[-5px] h-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-cyan-400/20">
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
                      {project.id}
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
              ))}
          </div>
          
          {!showAll && projects.length > 4 && (
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                className="group bg-transparent border border-cyan-500/30 text-white hover:bg-cyan-500/10 hover:border-cyan-500 transition-all duration-300"
                onClick={() => setShowAll(true)}
              >
                <span>Voir plus</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          )}

          {showAll && (
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                className="group bg-transparent border border-cyan-500/30 text-white hover:bg-cyan-500/10 hover:border-cyan-500 transition-all duration-300"
                onClick={() => {
                  setShowAll(false);
                  sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Voir moins</span>
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1 rotate-180" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
