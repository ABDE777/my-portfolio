
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Experience {
  position: string;
  company: string;
  period: string;
  icon: React.ReactNode;
  description: string;
  responsibilities: string[];
  skills: string[];
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  return (
    <div className="space-y-8">
      {experiences.map((exp, index) => (
        <Card 
          key={index} 
          className="animate-card opacity-0 translate-y-8 overflow-hidden hover:shadow-amber-500/10 transition-all duration-500"
        >
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Left section - Timeline and company */}
              <div className="md:col-span-1">
                <div className="flex flex-col items-center md:items-start">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                    {exp.icon}
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium mb-2">
                    {exp.period}
                  </span>
                  <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 text-center md:text-left">
                    {exp.company}
                  </h4>
                </div>
              </div>
              
              {/* Right section - Details */}
              <div className="md:col-span-3">
                <h3 className="text-xl font-bold text-white mb-4">{exp.position}</h3>
                <p className="text-slate-400 mb-6">{exp.description}</p>
                
                <div className="space-y-5">
                  <div>
                    <h4 className="text-sm font-medium text-amber-400 mb-3">Responsabilités:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.responsibilities.map((responsibility, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1.5 text-sm rounded-lg bg-amber-500/10 text-slate-300 border border-amber-500/20 hover:bg-amber-500/20 transition-colors duration-300"
                        >
                          {responsibility}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-amber-400 mb-3">Compétences acquises:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {exp.skills.map((skill, i) => (
                        <div
                          key={i} 
                          className="px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-slate-300 text-sm border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExperienceSection;
