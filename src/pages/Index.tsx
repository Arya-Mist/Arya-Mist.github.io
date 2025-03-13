
import React from 'react';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import ProductGrid from '@/components/ProductGrid';
import { useProducts } from '@/contexts/ProductContext';

const Index = () => {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();
  
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <div className="container mx-auto px-4 md:px-6 py-16 space-y-24">
        <CategorySection />
        
        {featuredProducts.length > 0 && (
          <ProductGrid 
            products={featuredProducts} 
            title="Рекомендуемые товары"
          />
        )}
        
        <div className="glass-card neon-glow p-8 md:p-12 rounded-xl text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold gradient-text">Премиальный вейп-шоп Aria Mist</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Aria Mist – это больше, чем просто вейп-шоп. Мы предлагаем уникальный опыт для ценителей вейпинга,
            тщательно отбирая только лучшие продукты от ведущих производителей. Наша миссия – сделать ваше
            знакомство с миром вейпинга комфортным и приятным.
          </p>
          <p className="text-gray-300 max-w-3xl mx-auto">
            В нашем ассортименте вы найдете премиальные жидкости с разнообразными вкусами, современные
            под-системы, удобные одноразовые устройства и все необходимые аксессуары.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
