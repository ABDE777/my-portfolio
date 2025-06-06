
import React, { useEffect, useRef } from "react";
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
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize progress bar with a slight delay for animation
    const timer = setTimeout(() => {
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${level}%`;
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [level]);
  
  return (
    <Card 
      className={`animate-card opacity-0 translate-y-8 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${shadowColor} h-full backdrop-blur-sm`}
    >
      <CardContent className="p-5 relative overflow-hidden h-full flex flex-col">
        {/* Enhanced background decorative elements */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-30"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-gradient-to-tr from-white/5 to-transparent opacity-30"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            {/* Badge with improved styling */}
            <Badge className={`bg-gradient-to-r ${color} border-0 px-3 py-1 text-white shadow-sm`}>
              {category}
            </Badge>
            
            {/* Skill Level badge */}
            <span className={`text-sm font-semibold ${textColor} px-2 py-1 rounded-md bg-white/10`}>
              {skillLevel}
            </span>
          </div>
          
          {/* Main content with improved layout */}
          <div className="flex items-center gap-4 mb-5">
            <div 
              className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 bg-opacity-90 flex-shrink-0`}
              style={{
                boxShadow: "0 8px 16px -2px rgba(67, 56, 202, 0.15)"
              }}
            >
              {icon}
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-300 transition-all duration-300 line-clamp-2">
              {name}
            </h3>
          </div>
          
          {/* Description with better spacing */}
          <p className="text-slate-300 text-sm mb-6 line-clamp-3 flex-grow">
            {description}
          </p>
          
          {/* Progress bar with enhanced styling */}
          <div className="w-full h-4 bg-slate-800/80 rounded-full overflow-hidden flex items-center relative mt-auto border border-white/5">
            <div
              ref={progressBarRef}
              className={`skill-progress-value h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
              style={{ 
                width: "0%",
                boxShadow: "0 0 10px rgba(139, 92, 246, 0.3)"
              }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="w-20 h-full bg-white/20 skew-x-30 animate-[pulse_2s_infinite] transform -translate-x-20"></div>
              </div>
            </div>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white/90 shadow-inner">
              {level}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
