
import React from "react";
import SkillCard from "./SkillCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Skill {
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
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

const SkillsSection = ({ 
  skills, 
  selectedCategory, 
  setSelectedCategory, 
  categories 
}: SkillsSectionProps) => {
  const filteredSkills = selectedCategory === "All" 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  return (
    <>
      <div className="flex justify-end mb-6">
        <div className="w-fit">
          <Select 
            value={selectedCategory} 
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "All" ? "Toutes les catégories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, index) => (
          <SkillCard
            key={index}
            {...skill}
          />
        ))}
      </div>
    </>
  );
};

export default SkillsSection;
