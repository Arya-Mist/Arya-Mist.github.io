
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductList from '@/components/admin/ProductList';
import ProductForm from '@/components/admin/ProductForm';
import CategoryList from '@/components/admin/CategoryList';
import CategoryForm from '@/components/admin/CategoryForm';
import SocialMediaList from '@/components/admin/SocialMediaList';
import SocialMediaForm from '@/components/admin/SocialMediaForm';
import ReviewsList from '@/components/admin/ReviewsList';
import PasswordForm from '@/components/admin/PasswordForm';
import { Product } from '@/contexts/ProductContext';
import { Category, SocialMedia } from '@/contexts/SettingsContext';
import { LogOut, Plus, Settings } from 'lucide-react';

const AdminPage = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState<SocialMedia | undefined>(undefined);
  
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  
  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);
  
  // Обработчики для товаров
  const handleNewProduct = () => {
    setSelectedProduct(undefined);
    setIsProductModalOpen(true);
  };
  
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };
  
  const handleProductModalClose = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(undefined);
  };
  
  // Обработчики для категорий
  const handleNewCategory = () => {
    setSelectedCategory(undefined);
    setIsCategoryModalOpen(true);
  };
  
  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  };
  
  const handleCategoryModalClose = () => {
    setIsCategoryModalOpen(false);
    setSelectedCategory(undefined);
  };
  
  // Обработчики для соц. сетей
  const handleNewSocial = () => {
    setSelectedSocial(undefined);
    setIsSocialModalOpen(true);
  };
  
  const handleEditSocial = (social: SocialMedia) => {
    setSelectedSocial(social);
    setIsSocialModalOpen(true);
  };
  
  const handleSocialModalClose = () => {
    setIsSocialModalOpen(false);
    setSelectedSocial(undefined);
  };
  
  // Обработчик для смены пароля
  const handleChangePassword = () => {
    setIsPasswordModalOpen(true);
  };
  
  const handlePasswordModalClose = () => {
    setIsPasswordModalOpen(false);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (!isAdmin) {
    return null;
  }
  
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">Панель администратора</h1>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleChangePassword}
              className="text-gray-300 hover:text-white"
            >
              <Settings size={16} className="mr-2" /> Сменить пароль
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="text-gray-300 hover:text-white"
            >
              <LogOut size={16} className="mr-2" /> Выйти
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="products">
          <TabsList className="mb-8">
            <TabsTrigger value="products">Товары</TabsTrigger>
            <TabsTrigger value="categories">Категории</TabsTrigger>
            <TabsTrigger value="social">Соц. сети</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-white">Список товаров</h2>
              <Button 
                onClick={handleNewProduct}
                className="bg-aria-gradient hover:brightness-110"
              >
                <Plus size={16} className="mr-2" /> Добавить товар
              </Button>
            </div>
            
            <ProductList onEdit={handleEditProduct} />
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-white">Список категорий</h2>
              <Button 
                onClick={handleNewCategory}
                className="bg-aria-gradient hover:brightness-110"
              >
                <Plus size={16} className="mr-2" /> Добавить категорию
              </Button>
            </div>
            
            <CategoryList onEdit={handleEditCategory} />
          </TabsContent>
          
          <TabsContent value="social" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-white">Социальные сети</h2>
              <Button 
                onClick={handleNewSocial}
                className="bg-aria-gradient hover:brightness-110"
              >
                <Plus size={16} className="mr-2" /> Добавить соц. сеть
              </Button>
            </div>
            
            <SocialMediaList onEdit={handleEditSocial} />
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-white">Управление отзывами</h2>
            </div>
            
            <ReviewsList />
          </TabsContent>
          
          <TabsContent value="orders">
            <div className="glass-card p-8 rounded-lg text-center">
              <h2 className="text-xl text-white mb-4">Раздел заказов находится в разработке</h2>
              <p className="text-gray-400">
                В будущих обновлениях здесь появится возможность управления заказами.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Модальное окно для товаров */}
        <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
          <DialogContent className="sm:max-w-[900px]">
            <DialogHeader>
              <DialogTitle>
                {selectedProduct ? 'Редактировать товар' : 'Добавить новый товар'}
              </DialogTitle>
            </DialogHeader>
            <ProductForm 
              product={selectedProduct} 
              onSave={handleProductModalClose}
            />
          </DialogContent>
        </Dialog>
        
        {/* Модальное окно для категорий */}
        <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedCategory ? 'Редактировать категорию' : 'Добавить новую категорию'}
              </DialogTitle>
            </DialogHeader>
            <CategoryForm 
              category={selectedCategory} 
              onSave={handleCategoryModalClose}
            />
          </DialogContent>
        </Dialog>
        
        {/* Модальное окно для соц. сетей */}
        <Dialog open={isSocialModalOpen} onOpenChange={setIsSocialModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedSocial ? 'Редактировать соц. сеть' : 'Добавить новую соц. сеть'}
              </DialogTitle>
            </DialogHeader>
            <SocialMediaForm 
              socialMedia={selectedSocial} 
              onSave={handleSocialModalClose}
            />
          </DialogContent>
        </Dialog>
        
        {/* Модальное окно для смены пароля */}
        <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Изменение пароля администратора</DialogTitle>
            </DialogHeader>
            <PasswordForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminPage;
