
import React from "react";
import { Instagram, Linkedin, Github, ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-white py-12 px-6 md:px-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* First Column */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Abd El Monim Mazgoura</h3>
            <p className="text-gray-400 max-w-md">
              Un développeur web passionné axé sur la création de sites web beaux, fonctionnels et conviviaux.
            </p>
            
            <div className="mt-6 flex space-x-4">
              <a
                href="https://www.instagram.com/techmo_x?igsh=Y3c2czZhbWVkZnB2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-portfolio-secondary hover:bg-purple-600 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/abd-el-monim-mazgoura-webfullstack/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-portfolio-secondary hover:bg-purple-600 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/ABDE777"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-portfolio-secondary hover:bg-purple-600 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
          
          {/* Second Column */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              {[
                {key: "about", label: "À Propos"},
                {key: "skills", label: "Compétences"},
                {key: "projects", label: "Projets"},
                {key: "contact", label: "Contact"},
                {key: "reviews", label: "Avis"}
              ].map((item) => (
                <li key={item.key}>
                  <a 
                    href={`#${item.key}`}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Third Column */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Informations de Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <i className="bi bi-geo-alt-fill text-purple-500 mt-1"></i>
                <span className="text-gray-400">CASABLANCA, Maroc</span>
              </li>
              <li className="flex items-start space-x-3">
                <i className="bi bi-envelope-fill text-purple-500 mt-1"></i>
                <span className="text-gray-400">mazgouraabdalmounim@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider and Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {currentYear} Abd El Monim Mazgoura. Tous Droits Réservés.
          </p>
          
          <a 
            href="#top" 
            className="mt-4 md:mt-0 inline-flex items-center text-purple-500 hover:text-white transition-colors duration-300"
          >
            Retour en Haut
            <ArrowUp className="ml-1 w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
