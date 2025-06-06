
import React from "react";
import Navbar from "@/components/Navbar";
import AboutMe from "@/components/AboutMe";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GitHubStats from "@/components/GitHubStats";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <AboutMe />
      <Skills />
      <GitHubStats />
      <Projects />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
