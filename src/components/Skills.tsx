import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { FaCode, FaCertificate, FaGraduationCap, FaBriefcase, FaUsers } from "react-icons/fa";
import SkillWebVisualization from "./skills/SkillWebVisualization";
import CertificateSection from "./skills/CertificateSection";
import EducationSection from "./skills/EducationSection";
import ExperienceSection from "./skills/ExperienceSection";
import ExtracurricularSection from "./skills/ExtracurricularSection";
import { certificates, badges, education, experience, extracurricularActivities as originalExtracurricularActivities } from "./skills/skillsData";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<string>("skills");
  const [isAnimating, setIsAnimating] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = document.querySelectorAll('.animate-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('show');
            }, 100 * index);
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  const handleTabChange = (value: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSelectedTab(value);

    // Smooth animation reset
    setTimeout(() => {
      const cards = document.querySelectorAll('.animate-card');
      cards.forEach((card, index) => {
        card.classList.remove('show');
        setTimeout(() => {
          card.classList.add('show');
        }, 50 * index);
      });
      setIsAnimating(false);
    }, 100);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const tabOptions = [
    { value: "skills", label: "Compétences", icon: <FaCode className="w-4 h-4" /> },
    { value: "certificates", label: "Certificats", icon: <FaCertificate className="w-4 h-4" /> },
    { value: "education", label: "Formation", icon: <FaGraduationCap className="w-4 h-4" /> },
    { value: "experience", label: "Expérience", icon: <FaBriefcase className="w-4 h-4" /> },
    { value: "extracurricular", label: "Activités", icon: <FaUsers className="w-4 h-4" /> }
  ];

  const currentTab = tabOptions.find(tab => tab.value === selectedTab);

  const newActivity = {
    position: "Ambassadeur",
    organization: "Institut Spécialisé de Formation de l'Offshoring Casablanca - ISFO Casablanca",
    period: "Mai 2025 - Présent",
    icon: (
      <Avatar className="w-16 h-16">
        <AvatarImage src="/lovable-uploads/cd9dab90-bbde-4b2e-9efa-85a6d0a9f306.png" alt="OFPPT Logo" />
        <AvatarFallback>OFPPT</AvatarFallback>
      </Avatar>
    ),
    description: "Représentation de l'ISFO, centre de formation professionnelle spécialisé dans les carrières tech et numériques. Promotion des formations, accompagnement des futurs apprenants et valorisation des réussites étudiantes.",
    responsibilities: [
      "Promotion des programmes de formation en développement web, IT et métiers du digital",
      "Orientation des apprenants vers des parcours adaptés",
      "Partage d'histoires de réussite et d'exemples concrets"
    ],
    achievements: [
      "Création de contenus inspirants sur les formations",
      "Renforcement de la visibilité du centre",
      "Accompagnement personnalisé des futurs étudiants"
    ]
  };

  const extracurricularActivities = [newActivity, ...originalExtracurricularActivities];

  return (
    <section id="skills" className="py-24 sm:py-32 bg-slate-900 border-t border-slate-800" ref={skillsRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Simplified title section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Compétences & Parcours
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Un aperçu de mon expertise technique, de ma formation et de mes expériences professionnelles.
          </p>
        </div>

        <div className="mb-12">
          {/* Simplified tabs design */}
          {isMobile ? (
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full max-w-xs text-base py-6 bg-slate-800 border-slate-700 hover:bg-slate-700/80 hover:text-white">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        {currentTab?.icon}
                        <span>{currentTab?.label}</span>
                      </div>
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] bg-slate-800/95 backdrop-blur-xl border border-slate-700 text-white mt-2 p-2">
                  {tabOptions.map(tab => (
                    <DropdownMenuItem 
                      key={tab.value}
                      onClick={() => handleTabChange(tab.value)} 
                      className={`flex items-center gap-3 px-4 py-3 text-base cursor-pointer rounded-md transition-colors focus:bg-slate-700 focus:text-white ${
                        selectedTab === tab.value 
                          ? `bg-slate-700` 
                          : "hover:bg-slate-700/50"
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="inline-flex p-1.5 rounded-xl bg-slate-800 border border-slate-700">
                {tabOptions.map(tab => (
                  <button 
                    key={tab.value} 
                    onClick={() => handleTabChange(tab.value)}
                    disabled={isAnimating}
                    className={`flex items-center space-x-2.5 px-5 py-2.5 rounded-lg transition-colors duration-200 text-sm font-semibold ${
                      selectedTab === tab.value 
                        ? `bg-slate-700 text-white` 
                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                    }`}
                  >
                    {tab.icon}
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full mt-12">
            <TabsContent value="skills" className="animate-fade-in space-y-8">
              <div className="transform transition-all duration-500">
                <SkillWebVisualization />
              </div>
            </TabsContent>

            <TabsContent value="certificates" className="animate-fade-in">
              <div className="transform transition-all duration-500">
                <CertificateSection certificates={certificates} badges={badges} />
              </div>
            </TabsContent>

            <TabsContent value="education" className="animate-fade-in">
              <div className="transform transition-all duration-500">
                <EducationSection educations={education} />
              </div>
            </TabsContent>
            
            <TabsContent value="experience" className="animate-fade-in">
              <div className="transform transition-all duration-500">
                <ExperienceSection experiences={experience} />
              </div>
            </TabsContent>
            
            <TabsContent value="extracurricular" className="animate-fade-in">
              <div className="transform transition-all duration-500">
                <ExtracurricularSection activities={extracurricularActivities} />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Simplified call-to-action section */}
        <div className="relative mt-20 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à collaborer ?
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
            Passionné par l'innovation, je suis prêt à transformer vos idées en solutions performantes.
            Discutons de votre projet.
          </p>
          <div className="pt-2">
            <Button 
              onClick={handleContactClick}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-8 text-base transition-transform duration-300 transform hover:scale-105"
            >
              Collaborons ensemble
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
