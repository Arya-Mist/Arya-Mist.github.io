
import React from 'react';
import { Eye, Edit, Trash } from 'lucide-react';
import { Product, useProducts } from '@/contexts/ProductContext';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

type ProductListProps = {
  onEdit: (product: Product) => void;
};

const CategoryLabels: Record<Product['category'], string> = {
  'e-liquid': 'Жидкости',
  'disposable': 'Одноразки',
  'pod-system': 'Под-системы',
  'accessories': 'Расходники',
};

const ProductList: React.FC<ProductListProps> = ({ onEdit }) => {
  const { products, deleteProduct } = useProducts();

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl text-gray-400">Товары не найдены</h2>
      </div>
    );
  }
  
  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-black/20">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Изображение
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Название
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Категория
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Цена
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Наличие
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-white/5 transition-colors duration-150">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="w-12 h-12 rounded overflow-hidden bg-gradient-to-br from-aria-purple/20 via-aria-pink/20 to-aria-blue/20">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-white">{product.name}</div>
                  {product.featured && (
                    <div className="mt-1">
                      <span className="px-2 py-1 text-xs rounded-full bg-primary text-white">
                        Featured
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    {CategoryLabels[product.category]}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-white font-medium">{product.price} ₽</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className={`text-sm ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {product.stock > 0 ? `${product.stock} шт.` : 'Нет в наличии'}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onEdit(product)}
                      title="Редактировать"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => deleteProduct(product.id)}
                      title="Удалить"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      title="Просмотр"
                    >
                      <Link to={`/product/${product.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
