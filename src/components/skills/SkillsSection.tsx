
import React, { useState } from "react";
import SkillCard from "./SkillCard";
import { Button } from "@/components/ui/button";
import { useTranslation } from "../LanguageProvider";

interface Skill {
  id: string;
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

interface SkillsSectionProps {
  skills: Skill[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  categories: string[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  selectedCategory,
  setSelectedCategory,
  categories
}) => {
  const { t } = useTranslation();
  
  const filteredSkills = selectedCategory === "All" 
    ? skills 
    : skills.filter(skill => {
        console.log('Filtering skill:', skill.name, 'category:', skill.category, 'selected:', selectedCategory);
        // Normalize categories for comparison - remove accents and convert to lowercase
        const normalizeCategory = (cat: string) => {
          return cat.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim();
        };
        
        const skillCategory = normalizeCategory(skill.category);
        const selected = normalizeCategory(selectedCategory);
        
        console.log('Normalized - skill category:', skillCategory, 'selected:', selected);
        
        // Direct match first
        if (skillCategory === selected) return true;
        
        // Handle specific mappings for common variations
        if (selected === 'backend' && (skillCategory === 'backend' || skillCategory === 'back-end')) return true;
        if (selected === 'devops' && (skillCategory === 'devops' || skillCategory === 'dev-ops' || skillCategory === 'deployment')) return true;
        if (selected === 'outil' && (skillCategory === 'outil' || skillCategory === 'outils' || skillCategory === 'tools' || skillCategory === 'tool')) return true;
        if (selected === 'frontend' && (skillCategory === 'frontend' || skillCategory === 'front-end')) return true;
        
        return false;
      });

  const handleCategoryChange = (category: string) => {
    console.log('Changing category from', selectedCategory, 'to:', category);
    console.log('Available skills with categories:', skills.map(s => ({ name: s.name, category: s.category })));
    setSelectedCategory(category);
  };

  return (
    <div className="space-y-8">
      {/* Category filters */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 rounded-xl transition-all duration-300 cursor-pointer font-medium transform hover:scale-105 text-sm md:text-base ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/30"
                  : "bg-slate-800/70 text-slate-300 hover:bg-slate-700/70 hover:text-white border border-slate-600/50 hover:border-cyan-400/50 hover:shadow-md"
              }`}
            >
              {category === "All" ? "Toutes les catégories" : category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Skills cards display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSkills.map((skill, index) => (
          <SkillCard
            key={skill.id}
            name={skill.name}
            level={skill.level}
            skillLevel={skill.skillLevel}
            icon={skill.icon}
            description={skill.description}
            category={skill.category}
            color={skill.color}
            shadowColor={skill.shadowColor}
            textColor={skill.textColor}
            bgColor={skill.bgColor}
          />
        ))}
      </div>
      
      {/* Debug info and message when no skills found */}
      {filteredSkills.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg mb-4">
            Aucune compétence trouvée pour la catégorie "{selectedCategory}".
          </p>
          <div className="text-slate-500 text-sm space-y-2">
            <p>Catégories disponibles dans les données :</p>
            <p className="text-xs bg-slate-800 p-2 rounded">
              {skills.map(s => s.category).filter((v, i, a) => a.indexOf(v) === i).join(', ')}
            </p>
            <p>Total des compétences : {skills.length}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
