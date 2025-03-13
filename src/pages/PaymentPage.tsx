
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ExternalLink, CreditCard } from 'lucide-react';

const PaymentPage = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const totalSum = getTotalPrice();
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="glass-card p-8 rounded-lg max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-white mb-4">Корзина пуста</h1>
            <p className="text-gray-400 mb-6">
              Перед оплатой добавьте товары в корзину.
            </p>
            <Button asChild className="bg-aria-gradient hover:brightness-110">
              <Link to="/catalog">Перейти в каталог</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  const handlePayment = () => {
    // В реальном приложении здесь был бы редирект на платежный шлюз
    window.open('https://www.tinkoff.ru/payment/', '_blank');
    
    // Очищаем корзину после перехода к оплате
    clearCart();
  };
  
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold gradient-text mb-8">Оформление заказа</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Информация о заказе</h2>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Количество товаров:</span>
                <span className="text-white">{cartItems.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Итоговая сумма:</span>
                <span className="text-white">{totalSum} ₽</span>
              </div>
            </div>
            
            <Button 
              onClick={handlePayment}
              className="w-full bg-aria-gradient hover:brightness-110"
            >
              <CreditCard className="mr-2" size={18} />
              Перейти к оплате
              <ExternalLink className="ml-2" size={16} />
            </Button>
            
            <p className="text-gray-400 text-sm mt-4 text-center">
              После нажатия кнопки вы будете перенаправлены на сайт платежной системы
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Состав заказа</h2>
            
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between border-b border-gray-700 pb-3">
                  <div>
                    <h3 className="font-medium text-white">{item.product.name}</h3>
                    <p className="text-sm text-gray-400">Количество: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white">{item.product.price * item.quantity} ₽</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="flex justify-between text-lg font-bold">
                <span>Итого:</span>
                <span className="gradient-text">{totalSum} ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
