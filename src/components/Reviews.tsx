import React, { useRef, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { MessageCircle, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { supabase } from "@/integrations/supabase/client";
interface Review {
  id: string;
  name: string;
  email: string;
  role: string;
  message: string;
  avatar_url?: string;
  created_at?: string;
  star_rating: number;
  is_approved: boolean;
}
const Reviews = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [starRating, setStarRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {
    toast
  } = useToast();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  useEffect(() => {
    fetchReviews();
  }, []);
  const fetchReviews = async () => {
    try {
      console.log('Fetching reviews from database...');
      const {
        data,
        error
      } = await supabase.from('reviews').select('*').eq('is_approved', true).order('created_at', {
        ascending: false
      });
      if (error) {
        console.error('Error fetching reviews:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les avis.",
          variant: "destructive"
        });
        return;
      }
      console.log('Reviews fetched:', data);
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors du chargement des avis.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
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
    try {
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name.trim())}&background=8B5CF6&color=fff`;
      console.log('Submitting review...');
      const {
        data,
        error
      } = await supabase.from('reviews').insert([{
        name: name.trim(),
        email: email.trim(),
        role: role.trim(),
        message: message.trim(),
        star_rating: starRating,
        avatar_url: avatarUrl,
        is_approved: true
      }]).select().single();
      if (error) {
        console.error('Error submitting review:', error);
        throw error;
      }
      console.log('Review submitted successfully:', data);

      // Ajouter le nouvel avis en tête de liste immédiatement
      if (data) {
        setReviews(prevReviews => [data, ...prevReviews]);
      }

      // Reset form
      setName('');
      setEmail('');
      setRole('');
      setMessage('');
      setStarRating(5);
      toast({
        title: "Merci!",
        description: "Votre avis a été ajouté avec succès.",
        variant: "default"
      });
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi de l'avis. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section id="reviews" className="py-24 bg-slate-900 px-6 md:px-12">
      <div ref={sectionRef} className="max-w-6xl mx-auto animate-on-scroll">
        <div className="text-center mb-16">
          <span className="inline-block text-purple-400 text-sm tracking-wider uppercase font-semibold animate-pulse">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight text-white">
            Ce Que Disent Les Gens
          </h2>
          <div className="w-20 h-1 bg-purple-400 mx-auto mt-4"></div>
          <p className="mt-6 text-slate-300 max-w-3xl mx-auto">
            Découvrez ce que les visiteurs et collaborateurs disent à propos de mon travail et de mon portfolio.
          </p>
        </div>

        {isLoading ? <div className="flex justify-center items-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full"></div>
          </div> : reviews.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {reviews.map((review, index) => <Card key={review.id} style={{
          animationDelay: `${index * 150}ms`
        }} className="animate-on-scroll p-8 rounded-2xl border border-slate-700 relative transform hover:scale-105 transition-all duration-500 hover:-rotate-1 overflow-hidden bg-zinc-50">                
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none"></div>
                
                <div className="flex items-center gap-1 mb-4 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < review.star_rating ? "currentColor" : "none"} className={i < review.star_rating ? "text-yellow-400" : "text-slate-600"} />)}
                </div>
                
                <CardContent className="p-0">
                  <div className="mb-6 relative z-10">
                    <p className="text-slate-300 leading-relaxed">
                      "{review.message}"
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-slate-700 flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-purple-400">
                      <img src={review.avatar_url} alt={review.name} className="w-full h-full object-cover" onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=8B5CF6&color=fff`;
                }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{review.name}</h4>
                      <p className="text-sm text-slate-400">{review.role}</p>
                      {review.created_at && <p className="text-xs text-slate-500 mt-1">
                          {new Date(review.created_at).toLocaleDateString('fr-FR')}
                        </p>}
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div> : <div className="text-center py-12 mb-16">
            <p className="text-slate-300">Aucun avis pour le moment. Soyez le premier à laisser un commentaire !</p>
          </div>}

        <Card className="max-w-3xl mx-auto bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="text-purple-400" size={24} />
            <h3 className="text-2xl font-bold text-white">Laisser un Avis</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-white font-medium block">Nom</label>
                <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Votre nom" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-white font-medium block">Email</label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Votre email" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="role" className="text-white font-medium block">Votre Rôle/Profession</label>
              <Input id="role" type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="ex. Ingénieur Logiciel, Designer, Chef de Projet" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" required />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-white font-medium block">Message</label>
              <Textarea id="message" value={message} onChange={e => setMessage(e.target.value)} placeholder="Partagez vos impressions sur mon portfolio..." className="bg-slate-700 border-slate-600 min-h-[120px] text-white placeholder:text-slate-400" required />
            </div>
            
            <div className="space-y-2">
              <label className="text-white font-medium block">Évaluation</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(rating => <button key={rating} type="button" onClick={() => setStarRating(rating)} className="focus:outline-none transition-transform hover:scale-110" aria-label={`Évaluer ${rating} étoiles`}>
                    <Star size={24} fill={rating <= starRating ? "#FBBF24" : "none"} className={rating <= starRating ? "text-yellow-400" : "text-slate-600"} />
                  </button>)}
                <span className="ml-2 text-slate-300">{starRating}/5</span>
              </div>
            </div>
            
            <button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-8 py-3 bg-purple-600 text-white rounded-md transition-all duration-300 
                      hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
                      disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? 'Envoi en cours...' : 'Soumettre l\'avis'}
            </button>
          </form>
        </Card>
      </div>
    </section>;
};
export default Reviews;