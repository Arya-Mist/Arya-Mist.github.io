
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navLinks = [
    { title: 'Главная', path: '/' },
    { title: 'Жидкости', path: '/category/e-liquid' },
    { title: 'Одноразки', path: '/category/disposable' },
    { title: 'Под-системы', path: '/category/pod-system' },
    { title: 'Расходники', path: '/category/accessories' },
  ];
  
  return (
    <nav className="sticky top-0 z-50 bg-aria-darker backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/dbfa85f1-ad1d-4c36-85cd-bb99b6f64f5e.png" 
                alt="Aria Mist Logo" 
                className="h-8 w-8 animate-glow"
              />
              <span className="gradient-text font-bold text-xl">Aria Mist</span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path}
                className={cn(
                  "text-sm hover:text-primary transition-colors duration-300",
                  location.pathname === link.path ? "gradient-text font-medium" : "text-gray-300"
                )}
              >
                {link.title}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Link 
                to="/admin" 
                className="text-gray-300 hover:text-primary transition-colors duration-300"
                title="Панель администратора"
              >
                <User size={20} />
              </Link>
            )}
            {!isAuthenticated && (
              <Link 
                to="/login" 
                className="text-gray-300 hover:text-primary transition-colors duration-300"
                title="Вход"
              >
                <User size={20} />
              </Link>
            )}
            <Link 
              to="/cart" 
              className="text-gray-300 hover:text-primary transition-colors duration-300 relative"
              title="Корзина"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden text-gray-300 hover:text-primary transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-card py-4 px-2 m-2 rounded-lg">
          <div className="flex flex-col space-y-4">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-md hover:bg-white/5 transition-colors duration-300",
                  location.pathname === link.path ? "gradient-text font-medium" : "text-gray-300"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
