
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
}: SkillCardProps) => { // Unused styling props are kept for compatibility
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
      className="shadow-none animate-card opacity-0 translate-y-8 group transition-all duration-300 hover:-translate-y-1 h-full bg-slate-800/50 border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 hover:shadow-lg"
    >
      <CardContent className="p-5 h-full flex flex-col">
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <Badge variant="secondary" className="bg-slate-700 text-slate-300 border-transparent font-medium">
              {category}
            </Badge>
            <span className={`text-xs font-semibold text-slate-400 px-2 py-1 rounded-md bg-slate-700/50`}>
              {skillLevel}
            </span>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div 
              className={`w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300`}
            >
              {icon}
            </div>
            <h3 className="text-base font-bold text-slate-100 group-hover:text-white transition-colors duration-300 line-clamp-2">
              {name}
            </h3>
          </div>
          
          <p className="text-slate-400 text-sm mb-5 line-clamp-3 flex-grow">
            {description}
          </p>
          
          {/* Simplified progress bar */}
          <div className="w-full mt-auto">
             <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-medium text-slate-400">Maîtrise</span>
              <span className="text-sm font-semibold text-slate-200">{level}%</span>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden relative border border-white/5">
              <div
                ref={progressBarRef}
                className={`h-full rounded-full bg-indigo-500 transition-all duration-1000 ease-out`}
                style={{ 
                  width: "0%",
                }}
              >
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
