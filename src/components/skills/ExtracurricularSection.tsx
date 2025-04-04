
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Extracurricular {
  position: string;
  organization: string;
  period: string;
  icon: React.ReactNode;
  description: string;
  responsibilities: string[];
  achievements: string[];
}

interface ExtracurricularSectionProps {
  activities: Extracurricular[];
}

const ExtracurricularSection = ({ activities }: ExtracurricularSectionProps) => {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <Card 
          key={index} 
          className="animate-card opacity-0 translate-y-8 overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-500 group"
        >
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Left section - Timeline and organization */}
              <div className="md:col-span-1">
                <div className="flex flex-col items-center md:items-start">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {activity.icon}
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium mb-2">
                    {activity.period}
                  </span>
                  <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-center md:text-left">
                    {activity.organization}
                  </h4>
                </div>
              </div>
              
              {/* Right section - Details */}
              <div className="md:col-span-3">
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-300 transition-all duration-300">
                  {activity.position}
                </h3>
                <p className="text-slate-400 mb-6">{activity.description}</p>
                
                <div className="space-y-5">
                  <div>
                    <h4 className="text-sm font-medium text-blue-400 mb-3">Responsabilités:</h4>
                    <div className="flex flex-wrap gap-2">
                      {activity.responsibilities.map((responsibility, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1.5 text-sm rounded-lg bg-blue-500/10 text-slate-300 border border-blue-500/20 hover:bg-blue-500/20 transition-colors duration-300"
                        >
                          {responsibility}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-blue-400 mb-3">Réalisations:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activity.achievements.map((achievement, i) => (
                        <div
                          key={i} 
                          className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-slate-300 text-sm border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
                        >
                          {achievement}
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

export default ExtracurricularSection;
