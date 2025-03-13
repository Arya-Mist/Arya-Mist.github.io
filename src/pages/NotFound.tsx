
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl md:text-8xl font-bold gradient-text">404</h1>
        <p className="text-xl text-gray-300 mb-4">Страница не найдена</p>
        <Link to="/" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft size={16} className="mr-2" /> Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
