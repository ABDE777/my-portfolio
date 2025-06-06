
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Blog from "@/components/Blog";
import { blogPosts } from "@/data/blogData";

const BlogPage = () => {
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = "Blog | Abd El Monim Portfolio";
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Blog posts={blogPosts} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
