
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, ArrowLeft } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from "@/components/ui/button";

const categoryLabels: Record<string, string> = {
  'e-liquid': 'Жидкости',
  'disposable': 'Одноразки',
  'pod-system': 'Под-системы',
  'accessories': 'Расходники',
};

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  
  const product = productId ? getProductById(productId) : undefined;
  
  if (!product) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-gray-400">Товар не найден</h1>
          <Button 
            variant="link" 
            onClick={() => navigate(-1)}
            className="mt-4 text-primary"
          >
            <ArrowLeft size={16} className="mr-2" /> Вернуться назад
          </Button>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };
  
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 md:px-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8 text-gray-300 hover:text-white"
        >
          <ArrowLeft size={16} className="mr-2" /> Назад
        </Button>
        
        <div className="glass-card neon-glow rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="aspect-square bg-gradient-to-br from-aria-purple/20 via-aria-pink/20 to-aria-blue/20 rounded-xl p-8 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full max-w-xs mx-auto object-contain"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="text-sm text-primary mb-2">
                  {categoryLabels[product.category] || product.category}
                </div>
                <h1 className="text-3xl font-bold text-white">{product.name}</h1>
              </div>
              
              <p className="text-gray-300">
                {product.description}
              </p>
              
              <div className="text-3xl font-bold text-white">
                {product.price} ₽
              </div>
              
              <div className="flex items-center">
                <div className={`flex items-center ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  <Package size={18} className="mr-2" />
                  {product.stock > 0 ? 'В наличии' : 'Нет в наличии'}
                </div>
                {product.stock > 0 && (
                  <div className="text-gray-400 ml-4">
                    {product.stock} шт.
                  </div>
                )}
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={handleAddToCart}
                  className="bg-aria-gradient hover:brightness-110 text-white py-6 px-8 rounded-full flex items-center"
                  disabled={product.stock <= 0}
                >
                  <ShoppingCart size={20} className="mr-2" /> 
                  Добавить в корзину
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
