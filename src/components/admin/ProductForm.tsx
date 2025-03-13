
import React, { useState, useEffect } from 'react';
import { Product, useProducts } from '@/contexts/ProductContext';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type ProductFormProps = {
  product?: Product;
  onSave: () => void;
};

const DEFAULT_PRODUCT: Omit<Product, 'id'> = {
  name: '',
  description: '',
  price: 0,
  image: '/lovable-uploads/dbfa85f1-ad1d-4c36-85cd-bb99b6f64f5e.png',
  category: 'e-liquid',
  stock: 0,
  featured: false,
};

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave }) => {
  const { addProduct, updateProduct } = useProducts();
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(DEFAULT_PRODUCT);
  const isEdit = !!product;
  
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        stock: product.stock,
        featured: product.featured || false,
      });
    }
  }, [product]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Название товара не может быть пустым');
      return;
    }
    
    if (formData.price <= 0) {
      toast.error('Цена должна быть больше нуля');
      return;
    }
    
    if (isEdit && product) {
      updateProduct(product.id, formData);
    } else {
      addProduct(formData);
    }
    
    onSave();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Название товара</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Название товара"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Описание товара"
              rows={5}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Категория</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="e-liquid">Жидкости</SelectItem>
                <SelectItem value="disposable">Одноразки</SelectItem>
                <SelectItem value="pod-system">Под-системы</SelectItem>
                <SelectItem value="accessories">Расходники</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="price">Цена (₽)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Цена"
              min="0"
              step="10"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stock">Количество на складе</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Количество"
              min="0"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">URL изображения</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="URL изображения"
              required
            />
          </div>
          
          <div className="flex items-center space-x-2 pt-4">
            <Switch 
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => handleSwitchChange('featured', checked)}
            />
            <Label htmlFor="featured">Показывать на главной странице</Label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button type="submit" className="bg-aria-gradient hover:brightness-110">
          {isEdit ? 'Обновить товар' : 'Добавить товар'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
