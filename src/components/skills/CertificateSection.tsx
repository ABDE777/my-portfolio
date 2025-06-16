
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardBadgeImage } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Book, Trophy, Link } from "lucide-react";

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  icon: React.ReactNode;
  description: string;
  link: string;
  projects: string[];
}

interface Badge {
  name: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
  skills: string[];
  link?: string; // Added link property for badges
}

interface CertificateSectionProps {
  certificates: Certificate[];
  badges?: Badge[];
}

const CertificateSection = ({ certificates, badges = [] }: CertificateSectionProps) => {
  const [activeTab, setActiveTab] = useState<string>("certificates");
  const [animatedCertificates, setAnimatedCertificates] = useState<boolean>(false);
  const [animatedBadges, setAnimatedBadges] = useState<boolean>(false);

  // Fonction pour initialiser l'animation en fonction de l'onglet actif
  const initAnimations = (tab: string) => {
    if (tab === "certificates") {
      setTimeout(() => setAnimatedCertificates(true), 100);
    } else if (tab === "badges") {
      setTimeout(() => setAnimatedBadges(true), 100);
    }
  };

  // Réinitialiser les animations lors du changement d'onglet
  useEffect(() => {
    setAnimatedCertificates(false);
    setAnimatedBadges(false);
    initAnimations(activeTab);
  }, [activeTab]);

  // Initialiser les animations au premier rendu
  useEffect(() => {
    initAnimations(activeTab);
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Function to determine which image to use based on badge title
  const getBadgeImage = (badge: Badge) => {
    if (badge.name === "Get started with Microsoft Copilot Studio") {
      return "/lovable-uploads/5f035d53-2887-4137-887f-3c33afbd550a.png";
    } else if (badge.name === "Introduction to generative AI") {
      return "/lovable-uploads/58c1b4b7-c21e-4845-a725-4cb2fa607444.png";
    } else if (badge.name === "Introduction to Modern AI" && badge.issuer === "Cisco Networking Academy") {
      return "/lovable-uploads/8548e38d-82b6-4f90-974d-dd42da729751.png"; 
    } else if (badge.name === "Verified: Introduction to Modern AI" && badge.issuer === "Cisco Networking Academy") {
      return "/lovable-uploads/99069227-9f4e-43ec-ae0c-9517d0835af4.png";
    } else {
      // For all other Microsoft badges
      return "/lovable-uploads/81010666-d040-4f2e-af62-e66b55e10be3.png";
    }
  };

  return (
    <div className="space-y-8 bg-portfolio-dark text-white">
      <Tabs 
        value={activeTab} 
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="flex justify-center mb-8">
          <TabsList className="inline-flex p-1 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-white/5 shadow-xl">
            <TabsTrigger 
              value="certificates" 
              className="flex items-center px-5 py-2.5 rounded-lg transition-all duration-300"
            >
              <Book className="mr-2 h-5 w-5" />
              <span>Certificats</span>
            </TabsTrigger>
            <TabsTrigger 
              value="badges" 
              className="flex items-center px-5 py-2.5 rounded-lg transition-all duration-300"
            >
              <Award className="mr-2 h-5 w-5" />
              <span>Badges</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="certificates" className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {certificates.map((cert, index) => (
              <Card 
                key={index} 
                className={`overflow-hidden group hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-500 ${
                  animatedCertificates 
                    ? 'opacity-100 translate-y-0 transition-all duration-500 delay-100' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col">
                    {/* Certificate header */}
                    <div className="flex items-start gap-5 mb-6">
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        {cert.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-1">
                          {cert.name}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="text-sm px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                            {cert.issuer}
                          </span>
                          <span className="text-sm text-slate-400">
                            {cert.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-slate-400 mb-6">
                      {cert.description}
                    </p>
                    
                    <div className="mt-auto space-y-4">
                      <h4 className="font-medium text-teal-400 text-sm">Projets réalisés:</h4>
                      <div className="flex flex-wrap gap-2">
                        {cert.projects.map((project, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-teal-500/10 to-emerald-500/10 text-slate-300 text-sm border border-teal-500/10 hover:border-teal-500/30 transition-all duration-300"
                          >
                            {project}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 transform hover:-translate-y-1"
                      >
                        Voir le certificat
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="badges" className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {badges.map((badge, index) => (
              <Card 
                key={index} 
                className={`overflow-hidden group hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-500 ${
                  animatedBadges 
                    ? 'opacity-100 translate-y-0 transition-all duration-500 delay-100' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    {/* Make the badge image a link if there's a link property */}
                    {badge.link ? (
                      <a 
                        href={badge.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <CardBadgeImage 
                          src={getBadgeImage(badge)}
                          alt={badge.name} 
                          containerClassName="w-40 h-40 rounded-xl"
                        />
                      </a>
                    ) : (
                      <CardBadgeImage 
                        src={getBadgeImage(badge)}
                        alt={badge.name} 
                        containerClassName="w-40 h-40 rounded-xl"
                      />
                    )}

                    <div className="flex-1 flex flex-col text-center md:text-left">
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-1">
                        {badge.name}
                      </h3>
                      
                      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                        <Badge className="md:self-start bg-indigo-500/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/30">
                          {badge.issuer}
                        </Badge>
                        <span className="text-sm text-slate-400">
                          {badge.date}
                        </span>
                      </div>
                      
                      <p className="text-slate-400 mb-4">
                        {badge.description}
                      </p>
                      
                      <div className="mt-auto space-y-2">
                        <h4 className="font-medium text-indigo-400 text-sm">Compétences certifiées:</h4>
                        <div className="flex flex-wrap gap-2">
                          {badge.skills.map((skill, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-slate-300 text-sm border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Add link button if the badge has a link */}
                      {badge.link && (
                        <div className="mt-6">
                          <a 
                            href={badge.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 transition-all duration-300 text-sm"
                          >
                            <Link size={16} className="mr-2" /> Voir le badge
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CertificateSection;
