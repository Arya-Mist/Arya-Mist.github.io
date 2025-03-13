
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const { cartItems, getTotalPrice } = useCart();
  const totalSum = getTotalPrice();
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="glass-card p-8 rounded-lg max-w-md mx-auto">
            <ShoppingBag size={64} className="mx-auto mb-4 text-gray-400" />
            <h1 className="text-2xl font-bold text-white mb-4">Корзина пуста</h1>
            <p className="text-gray-400 mb-6">
              В вашей корзине пока нет товаров. Вы можете добавить их из каталога.
            </p>
            <Button asChild className="bg-aria-gradient hover:brightness-110">
              <Link to="/catalog">Перейти в каталог</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold gradient-text mb-8">Корзина</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          
          <div>
            <div className="glass-card p-6 rounded-lg sticky top-24">
              <h2 className="text-xl font-bold text-white mb-4">Итого</h2>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Стоимость товаров:</span>
                  <span className="text-white">{totalSum} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Доставка:</span>
                  <span className="text-white">Бесплатно</span>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Итоговая сумма:</span>
                  <span className="gradient-text">{totalSum} ₽</span>
                </div>
              </div>
              
              <Button asChild className="w-full bg-aria-gradient hover:brightness-110">
                <Link to="/payment">Перейти к оплате</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
