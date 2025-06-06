
import React, { useEffect, useRef } from "react";

const AboutMe = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <section 
      id="about" 
      className="min-h-screen flex items-center justify-center py-24 px-6 md:px-12 bg-portfolio-dark relative overflow-hidden"
    >
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 to-portfolio-dark opacity-90"></div>
      
      {/* Ambient light effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[120px] opacity-30"></div>

      <div ref={sectionRef} className="max-w-6xl w-full mx-auto animate-on-scroll z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          {/* Section Texte */}
          <div className="md:w-1/2 space-y-8">
            <div className="space-y-2 animate-slide-in-left" style={{ animationDelay: "200ms" }}>
              <span className="text-pink-500 text-sm tracking-wider uppercase font-semibold">
                À PROPOS DE MOI
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
                Abd El Monim<br />Mazgoura
              </h2>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed animate-fade-in" style={{ animationDelay: "400ms" }}>
              Développeur <span className="text-blue-400 font-semibold">Full Stack</span> en formation, passionné par le web et les technologies modernes. 
              Mon objectif : créer des expériences numériques performantes et innovantes.
            </p>

            {/* Boutons avec effet neon */}
            <div className="flex flex-col sm:flex-row gap-4 w-full animate-fade-in" style={{ animationDelay: "600ms" }}>
              <a 
                href="#contact" 
                className="button-3d bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center font-medium transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md neon-btn"
              >
                Me Contacter
              </a>
              <a 
                href="#projects" 
                className="button-3d border border-blue-600 text-blue-500 rounded-md hover:bg-blue-600/10 text-center font-medium transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md neon-btn"
              >
                Voir Projets
              </a>
              <a 
                href="/resume.pdf" 
                download 
                className="button-3d flex items-center justify-center gap-2 bg-white text-gray-900 rounded-md hover:bg-gray-100 font-medium w-full sm:w-auto transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md neon-btn"
              >
                Télécharger CV
              </a>
            </div>
          </div>

          {/* Section Image avec effet Neon et Animation */}
          <div ref={imageRef} className="md:w-1/2 flex justify-center animate-slide-in-right relative" style={{ animationDelay: "300ms" }}>
            <div className="absolute -top-12 right-0 bg-gray-900/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-blue-500/20 z-20 animate-float">
              <p className="text-white font-medium">Développeur Full Stack<br />(Phase d'apprentissage)</p>
            </div>

            <div className="relative w-80 h-80 md:w-[300px] md:h-[300px] rounded-full overflow-hidden">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-blue-500/30 relative z-10 animate-spin-slow">
                <div className="w-full h-full rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg" style={{ background: "linear-gradient(45deg, rgba(0, 132, 255, 0.3), rgba(255, 0, 255, 0.3))" }}>
                  <img 
                    src="/3.png" 
                    alt="Abd El Monim Mazgoura"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/300x300?text=Abd+El+Monim";
                    }}
                  />
                </div>
              </div>

              {/* Effet Néon autour de l'image */}
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-blue-500/50 animate-pulse"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutMe;
