
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  icon: React.ReactNode;
  description: string;
  link: string;
  projects: string[];
}

interface CertificateSectionProps {
  certificates: Certificate[];
}

const CertificateSection = ({ certificates }: CertificateSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {certificates.map((cert, index) => (
        <Card 
          key={index} 
          className="animate-card opacity-0 translate-y-8 overflow-hidden group hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-500"
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
  );
};

export default CertificateSection;
