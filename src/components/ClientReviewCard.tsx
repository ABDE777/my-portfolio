
import React from "react";
import { Star } from "lucide-react";

interface ClientReviewCardProps {
  review: {
    id: string;
    name: string;
    message: string;
    role: string;
    avatar_url?: string;
    star_rating: number;
    created_at?: string;
  };
}

// Carte basique, claire et lisible, avec étoiles, avatar, et infos.
const ClientReviewCard: React.FC<ClientReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm flex flex-col h-full p-5 transition hover:shadow-lg">
      <div className="flex gap-1 mb-2">
        {[1,2,3,4,5].map(i => (
          <Star
            key={i}
            size={18}
            fill={i <= review.star_rating ? "#FFD700" : "none"}
            className={i <= review.star_rating ? "text-yellow-400" : "text-slate-300 dark:text-slate-600"}
          />
        ))}
      </div>
      <blockquote className="font-medium text-slate-700 dark:text-slate-200 mb-4 leading-relaxed">{review.message}</blockquote>
      <div className="flex items-center mt-auto pt-2">
        <div className="w-12 h-12 rounded-full border-2 border-purple-400 overflow-hidden mr-3 bg-slate-200 dark:bg-slate-700 flex-shrink-0">
          <img
            src={review.avatar_url}
            alt={review.name}
            className="w-full h-full object-cover"
            onError={e => {
              const target = e.target as HTMLImageElement;
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                review.name
              )}&background=8B5CF6&color=fff`;
            }}
          />
        </div>
        <div>
          <div className="font-bold text-slate-800 dark:text-white leading-tight">{review.name}</div>
          <div className="text-xs text-purple-700 dark:text-purple-300">{review.role}</div>
          {review.created_at && (
            <div className="text-xs text-slate-400 mt-1">
              {new Date(review.created_at).toLocaleDateString('fr-FR')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientReviewCard;
