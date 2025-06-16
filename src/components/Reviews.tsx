import React, { useRef, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { MessageCircle, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { supabase } from "@/integrations/supabase/client";
import ClientReviewCard from "./ClientReviewCard";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [starRating, setStarRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("is_approved", true)
        .in("star_rating", [4, 5])
        .order("created_at", { ascending: false })
        .limit(4);
      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les avis.",
          variant: "destructive",
        });
        return;
      }
      setReviews(data || []);
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Une erreur s'est produite lors du chargement des avis.",
        variant: "destructive",
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
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name.trim()
      )}&background=8B5CF6&color=fff`;
      const { data, error } = await supabase
        .from("reviews")
        .insert([
          {
            name: name.trim(),
            email: email.trim(),
            role: role.trim(),
            message: message.trim(),
            star_rating: starRating,
            avatar_url: avatarUrl,
            is_approved: true,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setReviews((prevReviews) => [data, ...prevReviews]);
      }

      setName("");
      setEmail("");
      setRole("");
      setMessage("");
      setStarRating(5);

      toast({
        title: "Merci !",
        description: "Votre avis a été ajouté avec succès.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Une erreur s'est produite lors de l'envoi de l'avis. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-24 bg-slate-900 px-2 md:px-0">
      <div
        ref={sectionRef}
        className="max-w-4xl mx-auto"
      >
        {/* Titre et intro */}
        <div className="text-center mb-12">
          <span className="inline-block text-purple-500 text-xs uppercase font-bold tracking-widest mb-2">
            Témoignages clients
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Ce que disent mes clients&nbsp;!
          </h2>
          <div className="mx-auto h-1 w-12 bg-purple-500 rounded-full mb-4" />
          <p className="text-md text-slate-300">
            Découvrez les retours d'expérience : qualité, accompagnement, professionnalisme.
          </p>
        </div>

        {/* Affichage des avis */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full"></div>
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-16">
            {reviews.map((review) => (
              <ClientReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-300">
              Aucun avis pour le moment. Soyez le premier à laisser un commentaire !
            </p>
          </div>
        )}

        {/* Formulaire d'envoi d'avis */}
        <Card className="max-w-xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 shadow">
          <div className="flex items-center gap-2 mb-5">
            <MessageCircle className="text-purple-400" size={22} />
            <h3 className="text-lg font-bold text-white">
              Laisser un avis
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="text-xs font-semibold text-white">
                  Nom
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Votre nom"
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-xs font-semibold text-white">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Votre email"
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="role" className="text-xs font-semibold text-white">
                Votre Rôle/Profession
              </label>
              <Input
                id="role"
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
                placeholder="ex. Chef de projet, Designer…"
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="text-xs font-semibold text-white">
                Message
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Partagez votre expérience…"
                className="bg-slate-800 border-slate-600 text-white min-h-[100px] placeholder:text-slate-400"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-white">
                Votre note
              </label>
              <div className="flex items-center gap-2 mt-1">
                {[1,2,3,4,5].map(rating => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setStarRating(rating)}
                    className="focus:outline-none"
                    aria-label={`Note ${rating} étoiles`}
                  >
                    <Star
                      size={24}
                      fill={rating <= starRating ? "#FFD700" : "none"}
                      className={rating <= starRating ? "text-yellow-400" : "text-slate-600"}
                    />
                  </button>
                ))}
                <span className="ml-2 text-slate-300">{starRating}/5</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-3 bg-purple-600 text-white rounded-md transition-all duration-300 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed font-semibold shadow"
            >
              {isSubmitting ? "Envoi en cours..." : "Soumettre l'avis"}
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default Reviews;
