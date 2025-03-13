
import React from 'react';
import { Plus, Minus, Trash } from 'lucide-react';
import { CartItem as CartItemType, useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

type CartItemProps = {
  item: CartItemType;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const increaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };
  
  return (
    <div className="glass-card p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="w-full sm:w-24 h-24 bg-gradient-to-br from-aria-purple/20 via-aria-pink/20 to-aria-blue/20 rounded-lg overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-contain p-2"
        />
      </div>
      
      <div className="flex-1">
        <Link 
          to={`/product/${item.id}`} 
          className="text-lg font-medium text-white hover:text-primary transition-colors duration-300"
        >
          {item.name}
        </Link>
      </div>
      
      <div className="flex items-center space-x-2">
        <button 
          onClick={decreaseQuantity}
          className="p-1 rounded-full bg-muted hover:bg-muted/70 text-white transition-colors duration-300"
          disabled={item.quantity <= 1}
        >
          <Minus size={16} />
        </button>
        <span className="w-8 text-center text-white">{item.quantity}</span>
        <button 
          onClick={increaseQuantity}
          className="p-1 rounded-full bg-muted hover:bg-muted/70 text-white transition-colors duration-300"
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div className="text-white font-medium text-lg">
        {item.price * item.quantity} ₽
      </div>
      
      <button 
        onClick={() => removeFromCart(item.id)}
        className="p-2 text-white bg-destructive/80 hover:bg-destructive rounded-full transition-colors duration-300"
        title="Удалить из корзины"
      >
        <Trash size={16} />
      </button>
    </div>
  );
};

export default CartItem;
