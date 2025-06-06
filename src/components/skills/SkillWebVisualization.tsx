
import React, { useState, useEffect } from 'react';
import { skillNodes, SkillNode } from '@/data/skillWebData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Code, Database, Settings, Wrench, Zap, Star } from 'lucide-react';
import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiTailwindcss, 
  SiBootstrap, SiVuedotjs, SiAngular, SiNodedotjs, SiExpress, SiMongodb, 
  SiMysql, SiFirebase, SiSupabase, SiPython, SiPhp, SiGit, SiGithub, 
  SiDocker, SiNetlify, SiAmazon, SiVercel, 
  SiFigma, SiAdobephotoshop, SiNpm, SiPostman, SiJest
} from 'react-icons/si';

const SkillWebVisualization = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [animationKey, setAnimationKey] = useState(0);
  
  const categories = [
    { 
      key: "All", 
      label: "Toutes les catégories", 
      icon: <Sparkles className="w-5 h-5" />, 
      gradient: "from-indigo-600 via-purple-600 to-pink-600",
      glow: "shadow-purple-500/50"
    },
    { 
      key: "Frontend", 
      label: "Frontend", 
      icon: <Code className="w-5 h-5" />, 
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      glow: "shadow-emerald-500/50"
    },
    { 
      key: "Backend", 
      label: "Backend", 
      icon: <Database className="w-5 h-5" />, 
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
      glow: "shadow-blue-500/50"
    },
    { 
      key: "DevOps", 
      label: "DevOps", 
      icon: <Settings className="w-5 h-5" />, 
      gradient: "from-orange-500 via-red-500 to-pink-500",
      glow: "shadow-orange-500/50"
    },
    { 
      key: "Outil", 
      label: "Outils", 
      icon: <Wrench className="w-5 h-5" />, 
      gradient: "from-amber-500 via-yellow-500 to-orange-500",
      glow: "shadow-amber-500/50"
    }
  ];
  
  const filteredSkills = selectedCategory === "All" 
    ? skillNodes 
    : skillNodes.filter(skill => skill.group === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setAnimationKey(prev => prev + 1);
  };

  const getSkillLevelLabel = (level: number) => {
    if (level >= 80) return "Expert";
    if (level >= 65) return "Avancé";
    if (level >= 50) return "Intermédiaire";
    return "Débutant";
  };

  const getSkillLevelColor = (level: number) => {
    if (level >= 80) return "from-emerald-400 to-green-500";
    if (level >= 65) return "from-blue-400 to-indigo-500";
    if (level >= 50) return "from-amber-400 to-orange-500";
    return "from-slate-400 to-slate-500";
  };

  const getSkillLevelGlow = (level: number) => {
    if (level >= 80) return "shadow-emerald-400/30";
    if (level >= 65) return "shadow-blue-400/30";
    if (level >= 50) return "shadow-amber-400/30";
    return "shadow-slate-400/30";
  };

  // Icon mapping
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiTailwindcss,
    SiBootstrap, SiVuedotjs, SiAngular, SiNodedotjs, SiExpress, SiMongodb,
    SiMysql, SiFirebase, SiSupabase, SiPython, SiPhp, SiGit, SiGithub,
    SiDocker, SiNetlify, SiAmazon, SiVercel,
    SiFigma, SiAdobephotoshop, SiNpm, SiPostman, SiJest
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="w-8 h-8" /> : <Code className="w-8 h-8" />;
  };

  // Trigger animation when category changes
  useEffect(() => {
    const cards = document.querySelectorAll('.skill-animate-card');
    cards.forEach((card, index) => {
      card.classList.remove('skill-show');
      setTimeout(() => {
        card.classList.add('skill-show');
      }, index * 80);
    });
  }, [selectedCategory, animationKey]);

  return (
    <div className="space-y-12">
      {/* Revolutionary Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((category) => (
          <Button
            key={category.key}
            onClick={() => handleCategoryChange(category.key)}
            variant="ghost"
            className={`group relative overflow-hidden px-8 py-4 rounded-2xl transition-all duration-500 font-bold text-lg transform hover:scale-110 border-2 ${
              selectedCategory === category.key
                ? `bg-gradient-to-r ${category.gradient} text-white shadow-2xl ${category.glow} border-transparent scale-110`
                : "bg-slate-800/40 text-slate-300 hover:bg-slate-700/60 hover:text-white border-slate-600/50 hover:border-cyan-400/50 backdrop-blur-xl"
            }`}
          >
            {/* Animated background for active state */}
            {selectedCategory === category.key && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-shimmer"></div>
            )}
            
            {/* Icon and text */}
            <div className="flex items-center space-x-3 relative z-10">
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                selectedCategory === category.key 
                  ? 'bg-white/20 shadow-lg' 
                  : 'bg-slate-700/50 group-hover:bg-slate-600/50'
              }`}>
                {category.icon}
              </div>
              <span className="whitespace-nowrap">{category.label}</span>
              {selectedCategory === category.key && (
                <Zap className="w-4 h-4 animate-pulse" />
              )}
            </div>
            
            {/* Hover effect for non-active buttons */}
            {selectedCategory !== category.key && (
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            )}
          </Button>
        ))}
      </div>
      
      {/* Spectacular Skills Grid */}
      <div key={animationKey} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredSkills.map((skill, index) => (
          <div
            key={`${skill.id}-${animationKey}`}
            className="group relative overflow-hidden skill-animate-card opacity-0 translate-y-12 scale-95"
            style={{ 
              animationDelay: `${index * 80}ms`,
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Main Skill Card */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-800/95 via-slate-900/80 to-slate-800/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/40 hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-6 hover:scale-105 group-hover:border-white/30">
              
              {/* Animated Gradient Background */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-3xl"
                style={{
                  background: `linear-gradient(135deg, ${skill.color}40, ${skill.color}20, transparent)`
                }}
              ></div>
              
              {/* Floating Glow Effect */}
              <div 
                className="absolute -inset-1 opacity-0 group-hover:opacity-60 transition-opacity duration-700 rounded-3xl blur-xl"
                style={{
                  background: `linear-gradient(135deg, ${skill.color}30, transparent, ${skill.color}20)`
                }}
              ></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header with Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border-2"
                    style={{ 
                      backgroundColor: skill.color + '15',
                      borderColor: skill.color + '40',
                      boxShadow: `0 8px 32px ${skill.color}30`,
                      color: skill.color
                    }}
                  >
                    {renderIcon(skill.iconName)}
                  </div>
                  
                  <Badge 
                    className={`bg-gradient-to-r ${getSkillLevelColor(skill.level)} text-white border-0 px-4 py-2 text-sm font-bold shadow-xl ${getSkillLevelGlow(skill.level)} transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Star className="w-3 h-3 mr-1" />
                    {getSkillLevelLabel(skill.level)}
                  </Badge>
                </div>
                
                {/* Skill Name & Category */}
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-cyan-200 group-hover:to-blue-200 transition-all duration-500">
                    {skill.name}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                    {skill.group}
                  </p>
                </div>
                
                {/* Revolutionary Progress Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm font-semibold">Niveau de maîtrise</span>
                    <span 
                      className="font-black text-2xl transition-colors duration-300"
                      style={{ color: skill.color }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  
                  {/* Mind-blowing Progress Bar */}
                  <div className="relative">
                    {/* Background Track */}
                    <div className="w-full h-4 bg-slate-700/60 rounded-full overflow-hidden border-2 border-white/10 shadow-inner">
                      {/* Animated Fill */}
                      <div
                        className="h-full rounded-full transition-all duration-1500 ease-out relative overflow-hidden"
                        style={{
                          background: `linear-gradient(90deg, ${skill.color}CC, ${skill.color}FF, ${skill.color}AA)`,
                          width: `${skill.level}%`,
                          boxShadow: `inset 0 0 20px ${skill.color}80, 0 0 20px ${skill.color}40`
                        }}
                      >
                        {/* Animated Shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 animate-shimmer"></div>
                        
                        {/* Pulsing Highlight */}
                        <div 
                          className="absolute inset-0 rounded-full opacity-60 animate-pulse"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${skill.color}60, transparent)`
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Outer Glow */}
                    <div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${skill.color}30, transparent)`,
                        width: `${skill.level}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-20 h-20 bg-gradient-to-tr from-white/5 to-transparent rounded-full"></div>
              
              {/* Corner Accent */}
              <div 
                className="absolute top-0 right-0 w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${skill.color}60, transparent)`,
                  clipPath: 'polygon(100% 0%, 0% 0%, 100% 100%)'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Enhanced Empty State */}
      {filteredSkills.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center p-8 rounded-full bg-gradient-to-br from-slate-800/80 to-slate-900/60 backdrop-blur-xl border border-white/20 mb-8 shadow-2xl">
            <Sparkles className="w-16 h-16 text-slate-400 animate-pulse" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">
            Aucune compétence trouvée
          </h3>
          <p className="text-slate-400 text-xl mb-6">
            Aucune compétence disponible pour la catégorie "{categories.find(c => c.key === selectedCategory)?.label}".
          </p>
          <p className="text-slate-500 text-sm">
            Sélectionnez une autre catégorie pour voir les compétences disponibles.
          </p>
        </div>
      )}
    </div>
  );
};

export default SkillWebVisualization;
