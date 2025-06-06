
import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCode, FaCertificate, FaGraduationCap, FaBriefcase, FaUsers } from "react-icons/fa";
import SkillWebVisualization from "./skills/SkillWebVisualization";
import CertificateSection from "./skills/CertificateSection";
import EducationSection from "./skills/EducationSection";
import ExperienceSection from "./skills/ExperienceSection";
import ExtracurricularSection from "./skills/ExtracurricularSection";
import { certificates, badges, education, experience, extracurricularActivities } from "./skills/skillsData";
import { Button } from "./ui/button";
import { ChevronDown, Sparkles, Zap } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

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
    {
      value: "skills",
      label: "Compétences",
      icon: <FaCode className="w-4 h-4" />,
      gradient: "from-emerald-500 to-teal-600",
      glow: "emerald-500/30"
    },
    {
      value: "certificates",
      label: "Certificats",
      icon: <FaCertificate className="w-4 h-4" />,
      gradient: "from-amber-500 to-orange-600",
      glow: "amber-500/30"
    },
    {
      value: "education",
      label: "Formation",
      icon: <FaGraduationCap className="w-4 h-4" />,
      gradient: "from-blue-500 to-indigo-600",
      glow: "blue-500/30"
    },
    {
      value: "experience",
      label: "Expérience",
      icon: <FaBriefcase className="w-4 h-4" />,
      gradient: "from-purple-500 to-violet-600",
      glow: "purple-500/30"
    },
    {
      value: "extracurricular",
      label: "Activités",
      icon: <FaUsers className="w-4 h-4" />,
      gradient: "from-pink-500 to-rose-600",
      glow: "pink-500/30"
    }
  ];

  const currentTab = tabOptions.find(tab => tab.value === selectedTab);

  return (
    <section id="skills" className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden" ref={skillsRef}>
      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden opacity-40 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced title section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center px-6 py-2 mb-8 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 backdrop-blur-md shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-4 h-4 mr-2 text-cyan-400" />
            <span className="text-sm tracking-wider uppercase font-semibold text-cyan-300">
              Technologies & Qualifications
            </span>
            <Zap className="w-4 h-4 ml-2 text-blue-400" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 relative">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent relative z-10">
              Compétences
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
              Techniques
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-2xl -z-10 animate-pulse"></div>
          </h2>
          
          <p className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Maîtrise des technologies modernes et outils de développement avancés
          </p>
        </div>

        <div className="mb-20">
          {/* Revolutionary tabs design */}
          {isMobile ? (
            <div className="flex justify-center mb-16">
              <DropdownMenu>
                <DropdownMenuTrigger className="group relative overflow-hidden">
                  <div className="flex items-center justify-between px-8 py-4 rounded-2xl bg-gradient-to-r from-slate-800/90 via-slate-700/90 to-slate-800/90 backdrop-blur-md border border-white/20 shadow-2xl shadow-black/20 min-w-[280px] transition-all duration-500 hover:shadow-cyan-500/20 hover:border-cyan-400/40">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${currentTab?.gradient} shadow-lg shadow-${currentTab?.glow}`}>
                        {currentTab?.icon}
                      </div>
                      <span className="font-semibold text-white text-lg">
                        {currentTab?.label}
                      </span>
                    </div>
                    <ChevronDown className="h-5 w-5 text-white/80 group-hover:text-cyan-400 transition-colors duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/30 p-3 mt-3 z-50">
                  {tabOptions.map(tab => (
                    <DropdownMenuItem 
                      key={tab.value}
                      onClick={() => handleTabChange(tab.value)} 
                      className={`group relative overflow-hidden mb-2 rounded-xl px-6 py-4 text-base cursor-pointer transition-all duration-300 ${
                        selectedTab === tab.value 
                          ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg shadow-${tab.glow}` 
                          : "hover:bg-white/10 text-white/80 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center space-x-3 relative z-10">
                        <div className={`p-2 rounded-lg ${selectedTab === tab.value ? 'bg-white/20' : 'bg-white/10'} transition-all duration-300`}>
                          {tab.icon}
                        </div>
                        <span className="font-medium">{tab.label}</span>
                      </div>
                      {selectedTab !== tab.value && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex justify-center mb-16">
              <div className="inline-flex p-2 rounded-2xl bg-slate-800/60 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/20">
                {tabOptions.map(tab => (
                  <button 
                    key={tab.value} 
                    onClick={() => handleTabChange(tab.value)}
                    disabled={isAnimating}
                    className={`group relative overflow-hidden flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-500 transform hover:scale-105 ${
                      selectedTab === tab.value 
                        ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg shadow-${tab.glow} scale-105` 
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      selectedTab === tab.value ? 'bg-white/20' : 'bg-white/10 group-hover:bg-white/15'
                    }`}>
                      {tab.icon}
                    </div>
                    <span className="whitespace-nowrap font-medium">{tab.label}</span>
                    {selectedTab === tab.value && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced tabs content */}
          <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
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

        {/* Revolutionary call-to-action section */}
        <div className="relative animate-fade-in mt-24">
          <div className="group relative overflow-hidden p-12 rounded-3xl bg-gradient-to-br from-slate-800/70 via-slate-700/50 to-slate-800/70 backdrop-blur-xl border border-cyan-400/30 shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-700">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-t-3xl"></div>
            
            <div className="relative z-10 text-center space-y-6">
              <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 mb-4">
                <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                Innovation Continue
              </h3>
              
              <p className="text-slate-300 max-w-4xl mx-auto text-lg leading-relaxed">
                Passionné par l'évolution technologique, je me forme continuellement aux dernières innovations. 
                Mon expertise grandit chaque jour pour vous offrir des solutions à la pointe de la modernité, 
                adaptées aux défis de demain.
              </p>
              
              <div className="pt-6">
                <Button 
                  onClick={handleContactClick}
                  className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-none shadow-xl shadow-cyan-500/30 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/40 px-8 py-4 text-lg font-semibold rounded-2xl"
                >
                  <span className="relative z-10 flex items-center">
                    Collaborons ensemble
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                </Button>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
