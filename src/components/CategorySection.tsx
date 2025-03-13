
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'e-liquid',
    name: 'Жидкости',
    description: 'Широкий выбор вкусов для вашего удовольствия',
    image: '/lovable-uploads/dbfa85f1-ad1d-4c36-85cd-bb99b6f64f5e.png',
  },
  {
    id: 'disposable',
    name: 'Одноразки',
    description: 'Удобные и простые в использовании устройства',
    image: '/lovable-uploads/dbfa85f1-ad1d-4c36-85cd-bb99b6f64f5e.png',
  },
  {
    id: 'pod-system',
    name: 'Под-системы',
    description: 'Компактные и мощные устройства для регулярного использования',
    image: '/lovable-uploads/dbfa85f1-ad1d-4c36-85cd-bb99b6f64f5e.png',
  },
  {
    id: 'accessories',
    name: 'Расходники',
    description: 'Все необходимое для обслуживания ваших устройств',
    image: '/lovable-uploads/dbfa85f1-ad1d-4c36-85cd-bb99b6f64f5e.png',
  },
];

const CategorySection = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 gradient-text">Категории товаров</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`}
              className="glass-card neon-glow rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg group relative"
            >
              <div className="aspect-square p-8 flex items-center justify-center bg-gradient-to-br from-aria-purple/20 via-aria-pink/20 to-aria-blue/20">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-24 h-24 object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-xl gradient-text">{category.name}</h3>
                <p className="text-gray-400 mt-2">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
