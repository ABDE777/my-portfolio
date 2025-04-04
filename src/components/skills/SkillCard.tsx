
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SkillCardProps {
  name: string;
  level: number;
  skillLevel: string;
  icon: React.ReactNode;
  description: string;
  category: string;
  color: string;
  shadowColor: string;
  textColor: string;
  bgColor: string;
}

const SkillCard = ({
  name,
  level,
  skillLevel,
  icon,
  description,
  category,
  color,
  shadowColor,
  textColor,
  bgColor,
}: SkillCardProps) => {
  return (
    <Card 
      className={`animate-card opacity-0 translate-y-8 overflow-hidden hover:translate-y-[-5px] transition-all duration-500 ${shadowColor} group`}
    >
      <CardContent className="p-6 relative overflow-hidden">
        {/* Highlight effect on hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-45deg] group-hover:animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="flex flex-col h-full relative z-10">
          {/* Technology badge */}
          <div className="flex justify-between items-center mb-6">
            <Badge className={`bg-gradient-to-r ${color} border-0 px-3 py-1 text-white`}>
              {category}
            </Badge>
            <span className={`text-lg font-bold ${textColor}`}>
              {skillLevel}
            </span>
          </div>
          
          {/* Icon and name */}
          <div className="flex items-center gap-4 mb-5">
            <div className={`w-16 h-16 rounded-xl ${bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              {icon}
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-300 transition-all duration-300">
              {name}
            </h3>
          </div>
          
          <p className="text-slate-400 mb-6 flex-grow">
            {description}
          </p>
          
          {/* Progress bar */}
          <div className="mt-auto">
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`skill-progress-value h-full rounded-full relative bg-gradient-to-r ${color}`}
                style={{ width: "0%" }}
              >
                <div className="absolute inset-0 bg-white/10 overflow-hidden">
                  <div className="w-20 h-full bg-white/20 skew-x-30 animate-[pulse_2s_infinite] transform -translate-x-20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
