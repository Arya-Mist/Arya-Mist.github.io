
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '@/components/ProductGrid';
import { useProducts } from '@/contexts/ProductContext';

const categoryTitles: Record<string, string> = {
  'e-liquid': 'Жидкости',
  'disposable': 'Одноразки',
  'pod-system': 'Под-системы',
  'accessories': 'Расходники',
};

const categoryDescriptions: Record<string, string> = {
  'e-liquid': 'Широкий выбор вкусов для вашего удовольствия. От фруктовых до десертных – каждый найдет то, что ему по душе.',
  'disposable': 'Удобные и простые в использовании устройства. Просто распакуйте и наслаждайтесь.',
  'pod-system': 'Компактные и мощные устройства для регулярного использования. Отличный выбор для тех, кто ценит качество и стиль.',
  'accessories': 'Все необходимое для обслуживания ваших устройств: от испарителей до батарей.',
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { getProductsByCategory } = useProducts();
  
  const title = categoryTitles[categoryId || ''] || 'Категория';
  const description = categoryDescriptions[categoryId || ''] || '';
  
  const products = categoryId ? getProductsByCategory(categoryId as any) : [];
  
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-gray-300 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
        
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CategoryPage;
