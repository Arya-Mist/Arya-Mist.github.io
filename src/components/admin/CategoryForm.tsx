
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Category, useSettings } from '@/contexts/SettingsContext';

type CategoryFormProps = {
  category?: Category;
  onSave: () => void;
};

const DEFAULT_CATEGORY: Omit<Category, 'id'> = {
  name: '',
  slug: '',
  description: '',
};

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onSave }) => {
  const { addCategory, updateCategory } = useSettings();
  const [formData, setFormData] = useState<Omit<Category, 'id'>>(DEFAULT_CATEGORY);
  const isEdit = !!category;
  
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || '',
      });
    }
  }, [category]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Автоматически генерируем slug из имени
    if (name === 'name' && !isEdit) {
      setFormData({
        ...formData,
        [name]: value,
        slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, ''),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Название категории не может быть пустым');
      return;
    }
    
    if (!formData.slug.trim()) {
      toast.error('Slug категории не может быть пустым');
      return;
    }
    
    if (isEdit && category) {
      updateCategory(category.id, formData);
    } else {
      addCategory(formData);
    }
    
    onSave();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Название категории</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Название категории"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="slug">Slug (для URL)</Label>
        <Input
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="slug-kategorii"
          required
          disabled={isEdit}
        />
        {isEdit && (
          <p className="text-xs text-muted-foreground">
            Slug нельзя изменить для существующей категории
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Описание категории"
          rows={3}
        />
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" className="bg-aria-gradient hover:brightness-110">
          {isEdit ? 'Обновить категорию' : 'Добавить категорию'}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
