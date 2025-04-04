
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-portfolio-dark text-white p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-portfolio-accent">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold">Page Not Found</h2>
          <p className="text-gray-400 mt-4">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <Link 
          to="/" 
          className="inline-block mt-8 px-8 py-3 bg-portfolio-accent text-white rounded-md 
                   hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
