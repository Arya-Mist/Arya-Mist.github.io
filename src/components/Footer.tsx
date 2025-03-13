
import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '@/contexts/SettingsContext';
import * as Icons from 'lucide-react';

const Footer = () => {
  const { socialMedia, categories } = useSettings();
  
  // Динамически получаем иконку из Lucide
  const getIcon = (iconName: string) => {
    // @ts-ignore - Динамический доступ к иконкам
    const Icon = Icons[iconName] || Icons.Link;
    return <Icon size={20} />;
  };
  
  return (
    <footer className="bg-aria-darker border-t border-white/10 py-10 mt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/dbfa85f1-ad1d-4c36-85cd-bb99b6f64f5e.png" 
                alt="Aria Mist Logo" 
                className="h-8 w-8" 
              />
              <span className="gradient-text font-bold text-xl">Aria Mist</span>
            </div>
            <p className="text-gray-400 text-sm">
              Премиальные вейп-продукты для истинных ценителей. Погрузитесь в мир ароматных облаков с Aria Mist.
            </p>
            <div className="flex space-x-4">
              {socialMedia.map(social => (
                <a 
                  key={social.id}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors duration-300"
                  title={social.name}
                >
                  {getIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-white">Категории</h3>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category.id}>
                  <Link 
                    to={`/category/${category.slug}`} 
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-white">Клиентам</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary transition-colors duration-300">
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="text-gray-400 hover:text-primary transition-colors duration-300">
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-gray-400 hover:text-primary transition-colors duration-300">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-white">Контакты</h3>
            <p className="text-gray-400">E-mail: info@ariamist.ru</p>
            <p className="text-gray-400">Телефон: +7 (999) 123-45-67</p>
            <p className="text-gray-400">Адрес: г. Москва, ул. Примерная, д. 123</p>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Aria Mist. Все права защищены.</p>
          <p className="mt-2">Сайт предназначен для лиц старше 18 лет</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
