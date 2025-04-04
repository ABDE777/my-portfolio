
import React, { useRef, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { MessageCircle, Star, X } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Ingénieur Logiciel",
    content: "Abd El Monim est un développeur talentueux. Son dévouement et ses compétences en résolution de problèmes sont remarquables. Fortement recommandé!",
    avatar: "/avatar1.jpg" // Placeholder image
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Chef de Projet",
    content: "Travailler avec Abd El Monim a été une expérience fantastique. Il a livré un travail de haute qualité dans les délais.",
    avatar: "/avatar2.jpg" // Placeholder image
  },
  {
    id: 3,
    name: "Michael Lee",
    role: "Designer",
    content: "Travail exceptionnel! La créativité et l'expertise technique d'Abd El Monim ont donné vie à nos idées.",
    avatar: "/avatar3.jpg" // Placeholder image
  }
];

interface VisitorComment {
  id: string;
  name: string;
  email: string;
  role: string;
  message: string;
  date: string;
  avatar?: string;
}

const Reviews = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [comments, setComments] = useState<VisitorComment[]>(() => {
    // Load comments from localStorage if available
    const savedComments = localStorage.getItem('visitorComments');
    return savedComments ? JSON.parse(savedComments) : [];
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // State for fixed testimonials visibility
  const [visibleTestimonials, setVisibleTestimonials] = useState<number[]>([1, 2, 3]);

  useEffect(() => {
    // Save comments to localStorage whenever they change
    localStorage.setItem('visitorComments', JSON.stringify(comments));
  }, [comments]);

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

    testimonialsRef.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      testimonialsRef.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !role.trim() || !message.trim()) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Create a new comment
    const newComment: VisitorComment = {
      id: Date.now().toString(),
      name,
      email,
      role,
      message,
      date: new Date().toLocaleDateString(),
      avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=8B5CF6&color=fff`
    };

    // Add the new comment to the list
    setComments(prevComments => [newComment, ...prevComments]);
    
    // Reset form
    setName('');
    setEmail('');
    setRole('');
    setMessage('');
    
    setIsSubmitting(false);
    
    toast({
      title: "Merci!",
      description: "Votre commentaire a été ajouté comme carte d'avis.",
      variant: "default"
    });
  };

  // Function to hide a testimonial
  const hideTestimonial = (id: number) => {
    setVisibleTestimonials(prev => prev.filter(itemId => itemId !== id));
    
    toast({
      title: "Avis masqué",
      description: "L'avis a été retiré de l'affichage.",
      variant: "default"
    });
  };

  // Function to remove a visitor comment
  const removeComment = (id: string) => {
    setComments(prev => prev.filter(comment => comment.id !== id));
    
    toast({
      title: "Commentaire supprimé",
      description: "Votre commentaire a été supprimé avec succès.",
      variant: "default"
    });
  };

  // Combine testimonials and visitor comments for display
  const filteredTestimonials = testimonials.filter(t => visibleTestimonials.includes(t.id));
  
  const allReviews = [
    ...filteredTestimonials.map(review => ({
      id: review.id.toString(),
      name: review.name,
      role: review.role,
      content: review.content,
      avatar: review.avatar,
      isFixedTestimonial: true
    })),
    ...comments.map(comment => ({
      id: comment.id,
      name: comment.name,
      role: comment.role || "Visiteur",
      content: comment.message,
      avatar: comment.avatar || `https://ui-avatars.com/api/?name=${comment.name.replace(' ', '+')}&background=8B5CF6&color=fff`,
      isFixedTestimonial: false
    }))
  ];

  return (
    <section 
      id="reviews" 
      className="py-24 bg-portfolio-tertiary px-6 md:px-12"
    >
      <div 
        ref={sectionRef}
        className="max-w-6xl mx-auto animate-on-scroll"
      >
        <div className="text-center mb-16">
          <span className="inline-block text-portfolio-accent text-sm tracking-wider uppercase font-semibold animate-pulse">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight text-portfolio-light">
            Ce Que Disent Les Gens
          </h2>
          <div className="w-20 h-1 bg-portfolio-accent mx-auto mt-4"></div>
          <p className="mt-6 text-portfolio-light/70 max-w-3xl mx-auto">
            Voici quelques témoignages de clients et collaborateurs avec qui j'ai eu le plaisir de travailler,
            ainsi que des commentaires des visiteurs du portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {allReviews.map((review, index) => (
            <div
              key={review.id}
              ref={el => testimonialsRef.current[index] = el}
              className="animate-on-scroll bg-portfolio-secondary p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col 
                border border-portfolio-border relative transform hover:scale-105 cursor-grab active:cursor-grabbing
                hover:-rotate-1 tinder-card overflow-hidden"
              style={{ 
                animationDelay: `${index * 150}ms`,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
              }}
            >
              {/* Close button */}
              <button 
                onClick={() => review.isFixedTestimonial 
                  ? hideTestimonial(Number(review.id)) 
                  : removeComment(review.id)
                }
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm hover:bg-portfolio-accent transition-colors duration-300 flex items-center justify-center z-20"
                aria-label="Fermer"
              >
                <X size={16} className="text-white" />
              </button>
              
              {/* Tinder-style card gradient overlay */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none"></div>
              
              <div className="flex items-center gap-1 mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <div className="mb-6 relative z-10">
                <p className="text-portfolio-light/90 leading-relaxed">
                  "{review.content}"
                </p>
              </div>
              
              <div className="mt-auto pt-6 border-t border-portfolio-border flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-portfolio-accent">
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${review.name.replace(' ', '+')}&background=8B5CF6&color=fff`;
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-portfolio-light">{review.name}</h4>
                  <p className="text-sm text-portfolio-light/50">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leave a comment section */}
        <div className="max-w-3xl mx-auto bg-portfolio-secondary/80 backdrop-blur-sm rounded-2xl p-8 border border-portfolio-border shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="text-portfolio-accent" size={24} />
            <h3 className="text-2xl font-bold text-portfolio-light">Laisser un Avis</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-portfolio-light/80 font-medium block">Nom</label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom"
                  className="bg-portfolio-dark/50 border-portfolio-border/50 text-portfolio-light"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-portfolio-light/80 font-medium block">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  className="bg-portfolio-dark/50 border-portfolio-border/50 text-portfolio-light"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="role" className="text-portfolio-light/80 font-medium block">Votre Rôle/Profession</label>
              <Input
                id="role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="ex. Ingénieur Logiciel, Designer, Chef de Projet"
                className="bg-portfolio-dark/50 border-portfolio-border/50 text-portfolio-light"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-portfolio-light/80 font-medium block">Message</label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Partagez vos impressions sur mon portfolio..."
                className="bg-portfolio-dark/50 border-portfolio-border/50 min-h-[120px] text-portfolio-light"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-3 bg-portfolio-accent text-white rounded-md transition-all duration-300 
                      hover:bg-portfolio-accent/90 focus:outline-none focus:ring-2 focus:ring-portfolio-accent focus:ring-opacity-50
                      disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Soumettre l\'avis'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
