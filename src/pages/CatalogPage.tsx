
import React from 'react';
import ProductGrid from '@/components/ProductGrid';
import { useProducts } from '@/contexts/ProductContext';

const CatalogPage = () => {
  const { products } = useProducts();
  
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold gradient-text mb-8">Каталог товаров</h1>
        <ProductGrid products={products} showAllCategories={true} />
      </div>
    </div>
  );
};

export default CatalogPage;
