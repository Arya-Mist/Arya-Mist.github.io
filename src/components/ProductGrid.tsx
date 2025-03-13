
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/contexts/ProductContext';
import { Link } from 'react-router-dom';

type ProductGridProps = {
  products: Product[];
  title?: string;
  showAllCategories?: boolean;
};

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  title, 
  showAllCategories = false 
}) => {
  const categories = {
    'e-liquid': 'Жидкости',
    'disposable': 'Одноразки',
    'pod-system': 'Под-системы',
    'accessories': 'Расходники'
  };
  
  if (showAllCategories) {
    return (
      <div className="space-y-8">
        {title && (
          <h2 className="text-2xl font-bold gradient-text">{title}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(categories).map(([key, name]) => (
            <Link to={`/category/${key}`} key={key}>
              <div className="glass-card neon-glow p-8 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <h3 className="text-xl font-bold gradient-text">{name}</h3>
                <p className="text-gray-400 mt-2">Смотреть все товары</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl text-gray-400">Товары не найдены</h2>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {title && (
        <h2 className="text-2xl font-bold gradient-text">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
