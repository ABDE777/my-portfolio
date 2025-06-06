
import React from "react";
import { useTranslation } from "./LanguageProvider";
import { Card } from "./ui/card";

export interface TimelineItem {
  id: string;
  title: string;
  date: string;
  description: string;
  icon?: React.ReactNode;
  category: "education" | "experience" | "project" | "certification";
  location?: string;
  link?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const { t } = useTranslation();

  const getCategoryColor = (category: TimelineItem['category']) => {
    switch (category) {
      case 'education':
        return 'from-blue-500 to-cyan-500';
      case 'experience':
        return 'from-purple-500 to-indigo-500';
      case 'project':
        return 'from-green-500 to-teal-500';
      case 'certification':
        return 'from-orange-500 to-amber-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  const getCategoryIcon = (category: TimelineItem['category'], icon?: React.ReactNode) => {
    if (icon) return icon;
    
    switch (category) {
      case 'education':
        return <i className="bi bi-mortarboard-fill"></i>;
      case 'experience':
        return <i className="bi bi-briefcase-fill"></i>;
      case 'project':
        return <i className="bi bi-code-slash"></i>;
      case 'certification':
        return <i className="bi bi-award-fill"></i>;
      default:
        return <i className="bi bi-bookmark-fill"></i>;
    }
  };

  return (
    <section id="timeline" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="inline-block text-cyan-400 text-sm tracking-wider uppercase font-semibold">
            Parcours Professionnel
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight text-white">
            Mon Parcours
          </h2>
          <div className="w-20 h-1 bg-cyan-400 mx-auto mt-4"></div>
          <p className="mt-6 text-slate-300 max-w-2xl mx-auto">
            Découvrez mon évolution professionnelle et académique à travers les projets et expériences qui ont façonné mon parcours.
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
          
          <div className="space-y-16">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`flex transition-all duration-500 hover:scale-[1.02] ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10">
                    <div className="space-y-3">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(item.category)} text-white text-xs font-medium`}>
                        {item.category === 'education' && 'Éducation'}
                        {item.category === 'experience' && 'Expérience'}
                        {item.category === 'project' && 'Projet'}
                        {item.category === 'certification' && 'Certification'}
                      </div>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <div className="flex items-center text-sm text-slate-400 gap-2">
                        <i className="bi bi-calendar3"></i>
                        <span>{item.date}</span>
                        {item.location && (
                          <>
                            <span className="text-slate-600">•</span>
                            <i className="bi bi-geo-alt"></i>
                            <span>{item.location}</span>
                          </>
                        )}
                      </div>
                      <p className="text-slate-300">{item.description}</p>
                      {item.link && (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 hover:underline mt-2 transition-colors"
                        >
                          <span>En savoir plus</span>
                          <i className="bi bi-arrow-right"></i>
                        </a>
                      )}
                    </div>
                  </Card>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full border-4 border-slate-900 flex items-center justify-center text-white shadow-lg">
                  <div className="text-lg">
                    {getCategoryIcon(item.category, item.icon)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
