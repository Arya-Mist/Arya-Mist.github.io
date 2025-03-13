
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/contexts/ProductContext';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };
  
  return (
    <div className="glass-card neon-glow group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-aria-purple/20 via-aria-pink/20 to-aria-blue/20">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-white line-clamp-1">{product.name}</h3>
          <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-white font-bold">{product.price} ₽</span>
            <div className="flex space-x-2">
              <button 
                onClick={handleAddToCart}
                className="p-2 rounded-full bg-primary/80 hover:bg-primary text-white transition-colors duration-300"
                title="Добавить в корзину"
              >
                <ShoppingCart size={16} />
              </button>
              <Link 
                to={`/product/${product.id}`}
                className="p-2 rounded-full bg-secondary/80 hover:bg-secondary text-white transition-colors duration-300"
                title="Подробнее"
              >
                <Eye size={16} />
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
