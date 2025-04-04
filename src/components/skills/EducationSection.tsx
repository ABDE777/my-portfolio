
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Education {
  degree: string;
  institution: string;
  period: string;
  icon: React.ReactNode;
  description: string;
  achievements: string[];
  courses: string[];
}

interface EducationSectionProps {
  educations: Education[];
}

const EducationSection = ({ educations }: EducationSectionProps) => {
  return (
    <div className="space-y-8">
      {educations.map((edu, index) => (
        <Card 
          key={index} 
          className="animate-card opacity-0 translate-y-8 overflow-hidden hover:shadow-lg hover:shadow-fuchsia-500/10 transition-all duration-500 group"
        >
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Left section - Timeline and degree */}
              <div className="md:col-span-1">
                <div className="flex flex-col items-center md:items-start">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {edu.icon}
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-400 text-xs font-medium mb-2">
                    {edu.period}
                  </span>
                  <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400 text-center md:text-left">
                    {edu.institution}
                  </h4>
                </div>
              </div>
              
              {/* Right section - Details */}
              <div className="md:col-span-3">
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-fuchsia-300 transition-all duration-300">
                  {edu.degree}
                </h3>
                <p className="text-slate-400 mb-6">{edu.description}</p>
                
                <div className="space-y-5">
                  <div>
                    <h4 className="text-sm font-medium text-fuchsia-400 mb-3">Réalisations:</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.achievements.map((achievement, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1.5 text-sm rounded-lg bg-fuchsia-500/10 text-slate-300 border border-fuchsia-500/20 hover:bg-fuchsia-500/20 transition-colors duration-300"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-fuchsia-400 mb-3">Cours principaux:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {edu.courses.map((course, i) => (
                        <div
                          key={i} 
                          className="px-3 py-2 rounded-lg bg-gradient-to-r from-fuchsia-500/10 to-pink-500/10 text-slate-300 text-sm border border-fuchsia-500/10 hover:border-fuchsia-500/30 transition-all duration-300"
                        >
                          {course}
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

export default EducationSection;
