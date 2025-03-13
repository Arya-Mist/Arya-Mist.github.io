
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-radial from-aria-purple/20 via-aria-pink/10 to-transparent animate-glow"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="gradient-text">Aria Mist</span>
              <span className="block text-white mt-2">Вейп-продукция премиум класса</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-md mx-auto md:mx-0">
              Погрузитесь в мир изысканных ароматов и облаков с нашей коллекцией вейп-продуктов высочайшего качества.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Link 
                to="/catalog" 
                className="px-6 py-3 bg-aria-gradient rounded-full text-white font-medium hover:shadow-lg transition-all duration-300"
              >
                Смотреть каталог
              </Link>
              <Link 
                to="/about" 
                className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              >
                О нас <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-aria-gradient opacity-30 blur-3xl rounded-full"></div>
              <img 
                src="/lovable-uploads/dbfa85f1-ad1d-4c36-85cd-bb99b6f64f5e.png" 
                alt="Aria Mist Logo" 
                className="w-64 h-64 md:w-80 md:h-80 object-contain relative z-10 animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
