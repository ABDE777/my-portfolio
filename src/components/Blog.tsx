
import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "./LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  category: string;
  readTime: string;
  content: string;
  slug: string;
}

interface BlogProps {
  posts: BlogPost[];
}

const Blog: React.FC<BlogProps> = ({ posts }) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const categories = ["all", ...new Set(posts.map(post => post.category))];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Add a small delay before observing blog cards to ensure DOM is ready
    setTimeout(() => {
      const blogCards = document.querySelectorAll('.blog-card');
      blogCards.forEach(card => {
        observer.observe(card);
      });
    }, 100);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      document.querySelectorAll('.blog-card').forEach(card => {
        observer.unobserve(card);
      });
    };
  }, [selectedCategory, posts]);

  const filteredPosts = selectedCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <section id="blog" className="py-16 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzRjMC0xLjEuOS0yIDItMmgxMmExIDEgMCAwIDEgMSAxdjEyYTEgMSAwIDAgMS0xIDFoLTEyYy0xLjEgMC0yLS45LTItMnYtMTB6TTEwIDM0YzAtMS4xLS45LTItMi0ySDJhMSAxIDAgMCAwLTEgMXYxMmExIDEgMCAwIDAgMSAxaDZjMS4xIDAgMi0uOSAyLTJ2LTEwem0yNC0zMGMwLTEuMS45LTIgMi0yaDEyYTEgMSAwIDAgMSAxIDF2MTJhMSAxIDAgMCAxLTEgMWgtMTJjLTEuMSAwLTItLjktMi0yVjR6TTEwIDRjMC0xLjEtLjktMi0yLTJIMmExIDEgMCAwIDAtMSAxdjEyYTEgMSAwIDAgMCAxIDFoNmMxLjEgMCAyLS45IDItMlY0eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
      
      <div className="container px-4 mx-auto relative z-10" ref={sectionRef}>
        <div className="text-center mb-10 opacity-0 translate-y-8 transition-all duration-500 animated">
          <span className="inline-block text-portfolio-accent text-sm tracking-wider uppercase font-semibold">
            Blog
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight text-portfolio-light">
            Articles Récents
          </h2>
          <div className="w-20 h-1 bg-portfolio-accent mx-auto mt-4"></div>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            Articles techniques et tutoriels sur le développement web et la programmation
          </p>
        </div>
        
        {/* Category filters */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-portfolio-accent text-white'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                {category === "all" ? "Tous" : category}
              </button>
            ))}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <Card 
                key={post.id}
                className="blog-card opacity-0 translate-y-8 transition-all duration-500 hover:transform hover:scale-105 bg-slate-900/90 border-slate-700/30 overflow-hidden shadow-xl"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {post.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/400x200?text=Blog+Post`;
                      }}
                    />
                  </div>
                )}
                <CardHeader className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-portfolio-accent/20 text-portfolio-accent rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <i className="bi bi-clock"></i> {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-lg text-white">{post.title}</CardTitle>
                  <CardDescription className="text-slate-400">
                    <span className="flex items-center gap-1 text-xs">
                      <i className="bi bi-calendar3"></i> {post.date}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-slate-300 text-sm line-clamp-2">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link to={`/blog/${post.slug}`}>
                    <Button 
                      variant="ghost" 
                      className="text-portfolio-accent hover:text-portfolio-accent hover:bg-portfolio-accent/10 gap-1 p-0"
                    >
                      Lire plus
                      <i className="bi bi-arrow-right ml-1"></i>
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-400">Aucun article trouvé dans cette catégorie.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
