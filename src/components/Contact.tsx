
import React, { useRef, useEffect, useState } from "react";
import { Linkedin, Github, Instagram, Mail, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card } from "./ui/card";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Nom requis",
        description: "Veuillez fournir votre nom.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.email.trim()) {
      toast({
        title: "Email requis",
        description: "Veuillez fournir votre adresse email.",
        variant: "destructive",
      });
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast({
        title: "Email invalide",
        description: "Veuillez fournir une adresse email valide.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.message.trim()) {
      toast({
        title: "Message requis",
        description: "Veuillez écrire un message.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      console.log("Submitting contact form to database");

      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim() || null,
            message: formData.message.trim()
          }
        ]);

      if (error) {
        console.error("Error submitting contact form:", error);
        throw error;
      }

      toast({
        title: "Message envoyé!",
        description: "Merci pour votre message. Je vous répondrai dès que possible.",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erreur!",
        description: "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 bg-slate-900 px-6 md:px-12"
    >
      <div 
        ref={sectionRef}
        className="max-w-6xl mx-auto animate-on-scroll"
      >
        <div className="text-center mb-16">
          <span className="inline-block text-purple-400 text-sm tracking-wider uppercase font-semibold">
            Contactez-Moi
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight text-white">
            Me Contacter
          </h2>
          <div className="w-20 h-1 bg-purple-400 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Discutons</h3>
              <p className="text-slate-300">
                N'hésitez pas à me contacter pour des collaborations, des questions ou simplement pour dire bonjour. Je vous répondrai dès que possible.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Mail className="text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Email</h4>
                  <a href="mailto:mazgouraabdalmounim@gmail.com" className="text-purple-400 hover:underline">
                    mazgouraabdalmounim@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Connectez-Vous Avec Moi</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Instagram", icon: <Instagram size={18} />, url: "https://www.instagram.com/techmo_x?igsh=Y3c2czZhbWVkZnB2" },
                  { name: "LinkedIn", icon: <Linkedin size={18} />, url: "https://www.linkedin.com/in/abd-el-monim-mazgoura-webfullstack/" },
                  { name: "GitHub", icon: <Github size={18} />, url: "https://github.com/ABDE777" }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 hover:bg-purple-500 text-white transition-all duration-300"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <Card className="bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700 w-full max-w-none">
            <h3 className="text-2xl font-bold mb-6 text-white">Envoyez-Moi un Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Nom</Label>
                <Input 
                  id="name"
                  name="name"
                  placeholder="Votre nom"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-white">Sujet</Label>
                <Input 
                  id="subject"
                  name="subject"
                  placeholder="Sujet de votre message"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-white">Message</Label>
                <Textarea 
                  id="message"
                  name="message"
                  placeholder="Votre message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="min-h-[150px] bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 resize-none"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer le message
                    <Send size={16} />
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
