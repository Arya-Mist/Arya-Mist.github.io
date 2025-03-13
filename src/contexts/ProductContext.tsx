
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'e-liquid' | 'disposable' | 'pod-system' | 'accessories';
  stock: number;
  featured?: boolean;
};

type ProductContextType = {
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: Product['category']) => Product[];
  getFeaturedProducts: () => Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

// Демо-данные для первоначального заполнения
const initialProducts: Product[] = [
  {
    id: uuidv4(),
    name: 'Forest Mist',
    description: 'Сладкий аромат лесных ягод с оттенками мяты.',
    price: 1200,
    image: '/lovable-uploads/dbfa85f1-ad1d-4c36-85cd-bb99b6f64f5e.png',
    category: 'e-liquid',
    stock: 15,
    featured: true,
  },
  {
    id: uuidv4(),
    name: 'Arctic Breeze',
    description: 'Освежающий вкус мяты с нотками эвкалипта.',
    price: 1100,
    image: '/lovable-uploads/dbfa85f1-ad1d-4c36-85cd-bb99b6f64f5e.png',
    category: 'e-liquid',
    stock: 20,
  },
  {
    id: uuidv4(),
    name: 'Aria One Disposable',
    description: 'Одноразовая электронная сигарета с никотином 5%.',
    price: 850,
    image: '/lovable-uploads/dbfa85f1-ad1d-4c36-85cd-bb99b6f64f5e.png',
    category: 'disposable',
    stock: 30,
    featured: true,
  },
  {
    id: uuidv4(),
    name: 'Mist Pod System',
    description: 'Компактная под-система с длительным временем работы.',
    price: 3500,
    image: '/lovable-uploads/dbfa85f1-ad1d-4c36-85cd-bb99b6f64f5e.png',
    category: 'pod-system',
    stock: 10,
    featured: true,
  },
  {
    id: uuidv4(),
    name: 'Сменные койлы для Mist',
    description: 'Сменные испарители для под-системы Mist.',
    price: 500,
    image: '/lovable-uploads/dbfa85f1-ad1d-4c36-85cd-bb99b6f64f5e.png',
    category: 'accessories',
    stock: 50,
  },
];

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('aria-mist-products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('aria-mist-products', JSON.stringify(products));
  }, [products]);

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: Product['category']) => {
    return products.filter(product => product.category === category);
  };

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: uuidv4() };
    setProducts(prevProducts => [...prevProducts, newProduct]);
    toast.success(`Товар ${product.name} добавлен`);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
    toast.success(`Товар обновлен`);
  };

  const deleteProduct = (id: string) => {
    const product = products.find(p => p.id === id);
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    if (product) {
      toast.info(`Товар ${product.name} удален`);
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      getProductById,
      getProductsByCategory,
      getFeaturedProducts,
      addProduct,
      updateProduct,
      deleteProduct,
    }}>
      {children}
    </ProductContext.Provider>
  );
};
