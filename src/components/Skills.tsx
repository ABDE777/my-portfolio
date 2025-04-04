
import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCode, FaCertificate, FaGraduationCap, FaBriefcase, FaUsers } from "react-icons/fa";
import SkillsSection from "./skills/SkillsSection";
import CertificateSection from "./skills/CertificateSection";
import EducationSection from "./skills/EducationSection";
import ExperienceSection from "./skills/ExperienceSection";
import ExtracurricularSection from "./skills/ExtracurricularSection";
import { 
  programmingSkills, 
  certificates, 
  education, 
  experience, 
  extracurricularActivities 
} from "./skills/skillsData";

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categories = ["All", "Frontend", "Backend", "DevOps", "Outil"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate skill bars
            const skillBars = document.querySelectorAll('.skill-progress-value');
            skillBars.forEach((bar, index) => {
              setTimeout(() => {
                (bar as HTMLElement).style.width = `${programmingSkills[index % programmingSkills.length]?.level || 0}%`;
              }, 100 * index);
            });
            
            // Animate cards
            const cards = document.querySelectorAll('.animate-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('show');
              }, 150 * index);
            });
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    // Add tab transitions
    const tabs = document.querySelectorAll('[role="tab"]');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        // Reset animations to trigger them again
        const cards = document.querySelectorAll('.animate-card');
        cards.forEach((card) => {
          card.classList.remove('show');
          setTimeout(() => {
            card.classList.add('show');
          }, 50);
        });
      });
    });

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  return (
    <section
      id="skills"
      className="py-28 relative overflow-hidden text-white"
      ref={skillsRef}
      style={{
        background: "linear-gradient(145deg, #0f172a 0%, #020617 100%)"
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 z-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-purple-600/5 to-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617] z-0"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm tracking-wider uppercase font-medium bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-full shadow-lg shadow-indigo-500/20">
            Technologies & Qualifications
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="relative inline-block">
              <span className="absolute inset-0 -z-10 blur-2xl opacity-20 bg-indigo-500 rounded-full transform scale-150"></span>
              Compétences Techniques
            </span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Expertise en développement web moderne et outils de productivité
          </p>
        </div>

        <div className="mb-16">
          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid grid-cols-5 w-fit mx-auto bg-slate-800/50 backdrop-blur-sm p-1 rounded-xl mb-12 border border-slate-700/30">
              <TabsTrigger 
                value="skills" 
                className="text-base py-2.5 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <FaCode className="text-lg" />
                  <span>Compétences</span>
                </span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="certificates" 
                className="text-base py-2.5 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <FaCertificate className="text-lg" />
                  <span>Certificats</span>
                </span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="education" 
                className="text-base py-2.5 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <FaGraduationCap className="text-lg" />
                  <span>Formation</span>
                </span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="experience" 
                className="text-base py-2.5 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <FaBriefcase className="text-lg" />
                  <span>Expérience</span>
                </span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="extracurricular" 
                className="text-base py-2.5 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <FaUsers className="text-lg" />
                  <span>Activités</span>
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="skills" className="animate-fade-in space-y-8">
              <SkillsSection 
                skills={programmingSkills}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
              />
            </TabsContent>

            <TabsContent value="certificates" className="animate-fade-in">
              <CertificateSection certificates={certificates} />
            </TabsContent>

            <TabsContent value="education" className="animate-fade-in">
              <EducationSection educations={education} />
            </TabsContent>
            
            <TabsContent value="experience" className="animate-fade-in">
              <ExperienceSection experiences={experience} />
            </TabsContent>
            
            <TabsContent value="extracurricular" className="animate-fade-in">
              <ExtracurricularSection activities={extracurricularActivities} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Skills;
