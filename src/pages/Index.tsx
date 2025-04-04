
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";
import { Toaster } from "../components/ui/toaster";

// Add link to Bootstrap Icons in the document head
const addBootstrapIcons = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css';
  document.head.appendChild(link);
};

// Add Google Fonts for improved typography
const addGoogleFonts = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Raleway:wght@400;500;600;700&display=swap';
  document.head.appendChild(link);
};

// Set portfolio favicon
const setPortfolioFavicon = () => {
  const link = document.querySelector("link[rel='icon']") as HTMLLinkElement || document.createElement('link');
  link.type = 'image/svg+xml';
  link.rel = 'icon';
  link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="90">💼</text></svg>';
  document.head.appendChild(link);
  
  // Set the document title
  document.title = "Abd El Monim | Portfolio";
  
  // Add meta tags for SEO
  const metaDescription = document.createElement('meta');
  metaDescription.name = 'description';
  metaDescription.content = 'Portfolio de Abd El Monim Mazgoura, Développeur Full Stack en formation, passionné par le web et les technologies modernes.';
  document.head.appendChild(metaDescription);
  
  const metaKeywords = document.createElement('meta');
  metaKeywords.name = 'keywords';
  metaKeywords.content = 'développeur web, full stack, React, JavaScript, portfolio, OFPPT, ISFO, Club IT';
  document.head.appendChild(metaKeywords);
  
  const metaAuthor = document.createElement('meta');
  metaAuthor.name = 'author';
  metaAuthor.content = 'Abd El Monim Mazgoura';
  document.head.appendChild(metaAuthor);
  
  // Open Graph tags for social sharing - using setAttribute for non-standard attributes
  const ogTitle = document.createElement('meta');
  ogTitle.setAttribute('property', 'og:title');
  ogTitle.content = 'Abd El Monim | Portfolio';
  document.head.appendChild(ogTitle);
  
  const ogDescription = document.createElement('meta');
  ogDescription.setAttribute('property', 'og:description');
  ogDescription.content = 'Portfolio de Abd El Monim Mazgoura, Développeur Full Stack en formation';
  document.head.appendChild(ogDescription);
  
  // Add Twitter Card tags for better Twitter sharing
  const twitterCard = document.createElement('meta');
  twitterCard.setAttribute('name', 'twitter:card');
  twitterCard.content = 'summary_large_image';
  document.head.appendChild(twitterCard);
  
  const twitterTitle = document.createElement('meta');
  twitterTitle.setAttribute('name', 'twitter:title');
  twitterTitle.content = 'Abd El Monim | Portfolio';
  document.head.appendChild(twitterTitle);
  
  const twitterDesc = document.createElement('meta');
  twitterDesc.setAttribute('name', 'twitter:description');
  twitterDesc.content = 'Portfolio de Abd El Monim Mazgoura, Développeur Full Stack en formation';
  document.head.appendChild(twitterDesc);
};

// Add custom background color to body
const setDarkBackground = () => {
  document.body.style.backgroundColor = "#111827";
  
  // Add CSS for purple accents
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --portfolio-accent: #8B5CF6;
      --portfolio-light: #F9FAFB;
      --portfolio-dark: #111827;
      --portfolio-secondary: #1F2937;
      --portfolio-tertiary: #374151;
      --portfolio-border: #4B5563;
    }
    .btn-primary {
      background-color: #8B5CF6 !important;
    }
    .text-portfolio-accent {
      color: #8B5CF6 !important;
    }
    .border-portfolio-accent {
      border-color: #8B5CF6 !important;
    }
    .text-portfolio-light {
      color: #F9FAFB !important;
    }
    .bg-portfolio-dark {
      background-color: #111827 !important;
    }
    .bg-portfolio-secondary {
      background-color: #1F2937 !important;
    }
    .bg-portfolio-tertiary {
      background-color: #374151 !important;
    }
    .border-portfolio-border {
      border-color: #4B5563 !important;
    }
    
    /* Cursor Effects */
    .cursor-glow {
      position: fixed;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: rgba(139, 92, 246, 0.3);
      mix-blend-mode: screen;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: transform 0.15s ease-out, width 0.2s ease, height 0.2s ease;
    }
    
    /* Improved Accessibility */
    :focus-visible {
      outline: 2px solid #8B5CF6 !important;
      outline-offset: 2px !important;
    }
    
    /* Scrollbar styling */
    ::-webkit-scrollbar {
      width: 10px;
    }
    
    ::-webkit-scrollbar-track {
      background: #1F2937;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #4B5563;
      border-radius: 5px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #8B5CF6;
    }
    
    /* Animation Keyframes */
    @keyframes shimmer {
      0% { transform: translateX(-100%) skewX(-45deg); }
      100% { transform: translateX(200%) skewX(-45deg); }
    }
    
    .animate-shimmer {
      animation: shimmer 2s infinite;
    }
    
    /* Additional animations */
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }
    
    /* Page transition animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.6s ease-out forwards;
    }
    
    /* Card animation */
    .animate-card.show {
      opacity: 1 !important;
      transform: translateY(0) !important;
      transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    /* Enhanced background radial gradient */
    .bg-radial-gradient {
      background: radial-gradient(circle at center, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 70%);
    }
    
    /* Glass card styling */
    .glass-card {
      background: rgba(31, 41, 55, 0.7);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }
    
    /* Preloader */
    .preloader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #111827;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    
    .preloader-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .preloader-spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(139, 92, 246, 0.3);
      border-radius: 50%;
      border-top-color: #8B5CF6;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .preloader.loaded {
      opacity: 0;
      visibility: hidden;
      transition: all 0.6s ease;
    }
  `;
  document.head.appendChild(style);
};

// Add custom cursor effect
const setupCursorEffect = () => {
  // Create cursor element
  const cursor = document.createElement('div');
  cursor.classList.add('cursor-glow');
  document.body.appendChild(cursor);
  
  // Update cursor position on mouse move
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  // Add event listeners for interactive elements
  const addInteractiveEffects = () => {
    const interactiveElements = document.querySelectorAll('a, button, .interactive, input, select, [role="tab"]');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.width = '45px';
        cursor.style.height = '45px';
        cursor.style.backgroundColor = 'rgba(139, 92, 246, 0.4)';
        cursor.style.mixBlendMode = 'plus-lighter';
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursor.style.backgroundColor = 'rgba(139, 92, 246, 0.3)';
        cursor.style.mixBlendMode = 'screen';
      });
    });
  };

  // Initialize interactive effects and periodically refresh them as content may change
  addInteractiveEffects();
  setInterval(addInteractiveEffects, 2000);
};

// Setup preloader
const setupPreloader = () => {
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  
  const preloaderContent = document.createElement('div');
  preloaderContent.className = 'preloader-content';
  
  const spinner = document.createElement('div');
  spinner.className = 'preloader-spinner';
  
  const text = document.createElement('div');
  text.textContent = 'Chargement...';
  text.className = 'text-white text-lg font-medium';
  
  preloaderContent.appendChild(spinner);
  preloaderContent.appendChild(text);
  preloader.appendChild(preloaderContent);
  
  document.body.appendChild(preloader);
  
  return preloader;
};

const removePreloader = (preloader) => {
  preloader.classList.add('loaded');
  setTimeout(() => {
    if (preloader.parentNode) {
      preloader.parentNode.removeChild(preloader);
    }
  }, 600);
};

const Index = () => {
  useEffect(() => {
    // Setup preloader
    const preloader = setupPreloader();
    
    // Add Bootstrap Icons CSS
    addBootstrapIcons();
    
    // Add Google Fonts
    addGoogleFonts();
    
    // Set favicon and meta tags
    setPortfolioFavicon();
    
    // Set dark background
    setDarkBackground();
    
    // Page load animations
    document.body.classList.add('opacity-0');
    setTimeout(() => {
      document.body.classList.remove('opacity-0');
      document.body.classList.add('transition-opacity', 'duration-500', 'opacity-100');
      
      // Remove preloader when everything is ready
      removePreloader(preloader);
    }, 800);

    // Setup cursor effect (only on desktop)
    if (window.innerWidth > 768) {
      setupCursorEffect();
    }

    // Handle scroll animations
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll('.animate-on-scroll');
      scrollElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight * 0.9) {
          element.classList.add('animated');
        }
      });
    };

    // Initialize skill progress bars
    const initSkillBars = () => {
      const skillBars = document.querySelectorAll('.skill-progress-value');
      skillBars.forEach((bar, index) => {
        const parentElement = bar.parentElement;
        if (parentElement) {
          const progressValue = parentElement.closest('.card')?.querySelector('[class*="text-lg font-bold"]')?.previousElementSibling?.textContent;
          if (progressValue) {
            setTimeout(() => {
              (bar as HTMLElement).style.width = `${parseInt(progressValue) || 85}%`;
            }, 100 * index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();
    
    // Initialize skill bars
    setTimeout(initSkillBars, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Remove cursor element if it exists
      const cursor = document.querySelector('.cursor-glow');
      if (cursor) {
        document.body.removeChild(cursor);
      }
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <AboutMe />
      <Skills />
      <Projects />
      <Contact />
      <Reviews />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
