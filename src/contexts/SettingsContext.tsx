
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type SocialMedia = {
  id: string;
  name: string;
  url: string;
  icon: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  approved: boolean;
};

type SettingsContextType = {
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  socialMedia: SocialMedia[];
  addSocialMedia: (social: Omit<SocialMedia, 'id'>) => void;
  updateSocialMedia: (id: string, social: Partial<SocialMedia>) => void;
  deleteSocialMedia: (id: string) => void;
  
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'approved'>) => void;
  approveReview: (id: string) => void;
  deleteReview: (id: string) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

// Инициализация категорий
const initialCategories: Category[] = [
  {
    id: 'e-liquid',
    name: 'Жидкости',
    slug: 'e-liquid',
    description: 'Премиальные жидкости для электронных сигарет',
  },
  {
    id: 'disposable',
    name: 'Одноразки',
    slug: 'disposable',
    description: 'Одноразовые электронные сигареты',
  },
  {
    id: 'pod-system',
    name: 'Под-системы',
    slug: 'pod-system',
    description: 'Компактные под-системы для вейпинга',
  },
  {
    id: 'accessories',
    name: 'Расходники',
    slug: 'accessories',
    description: 'Аксессуары и расходные материалы',
  },
];

// Инициализация соц. сетей
const initialSocialMedia: SocialMedia[] = [
  {
    id: uuidv4(),
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: 'Instagram',
  },
  {
    id: uuidv4(),
    name: 'Facebook',
    url: 'https://facebook.com',
    icon: 'Facebook',
  },
  {
    id: uuidv4(),
    name: 'Twitter',
    url: 'https://twitter.com',
    icon: 'Twitter',
  },
];

// Инициализация отзывов
const initialReviews: Review[] = [
  {
    id: uuidv4(),
    author: 'Иван Петров',
    rating: 5,
    text: 'Отличный магазин, быстрая доставка!',
    date: new Date().toISOString(),
    approved: true,
  },
  {
    id: uuidv4(),
    author: 'Анна Иванова',
    rating: 4,
    text: 'Хорошие товары, но хотелось бы больше скидок.',
    date: new Date().toISOString(),
    approved: true,
  },
];

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(() => {
    const savedCategories = localStorage.getItem('aria-mist-categories');
    return savedCategories ? JSON.parse(savedCategories) : initialCategories;
  });

  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>(() => {
    const savedSocialMedia = localStorage.getItem('aria-mist-social-media');
    return savedSocialMedia ? JSON.parse(savedSocialMedia) : initialSocialMedia;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const savedReviews = localStorage.getItem('aria-mist-reviews');
    return savedReviews ? JSON.parse(savedReviews) : initialReviews;
  });

  useEffect(() => {
    localStorage.setItem('aria-mist-categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('aria-mist-social-media', JSON.stringify(socialMedia));
  }, [socialMedia]);

  useEffect(() => {
    localStorage.setItem('aria-mist-reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Функции для управления категориями
  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = { ...category, id: uuidv4() };
    setCategories(prevCategories => [...prevCategories, newCategory]);
    toast.success(`Категория ${category.name} добавлена`);
  };

  const updateCategory = (id: string, updatedCategory: Partial<Category>) => {
    setCategories(prevCategories => 
      prevCategories.map(category => 
        category.id === id ? { ...category, ...updatedCategory } : category
      )
    );
    toast.success(`Категория обновлена`);
  };

  const deleteCategory = (id: string) => {
    const category = categories.find(c => c.id === id);
    setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
    if (category) {
      toast.info(`Категория ${category.name} удалена`);
    }
  };

  // Функции для управления соц. сетями
  const addSocialMedia = (social: Omit<SocialMedia, 'id'>) => {
    const newSocialMedia = { ...social, id: uuidv4() };
    setSocialMedia(prevSocialMedia => [...prevSocialMedia, newSocialMedia]);
    toast.success(`Соц. сеть ${social.name} добавлена`);
  };

  const updateSocialMedia = (id: string, updatedSocial: Partial<SocialMedia>) => {
    setSocialMedia(prevSocialMedia => 
      prevSocialMedia.map(social => 
        social.id === id ? { ...social, ...updatedSocial } : social
      )
    );
    toast.success(`Соц. сеть обновлена`);
  };

  const deleteSocialMedia = (id: string) => {
    const social = socialMedia.find(s => s.id === id);
    setSocialMedia(prevSocialMedia => prevSocialMedia.filter(social => social.id !== id));
    if (social) {
      toast.info(`Соц. сеть ${social.name} удалена`);
    }
  };

  // Функции для управления отзывами
  const addReview = (review: Omit<Review, 'id' | 'date' | 'approved'>) => {
    const newReview = { 
      ...review, 
      id: uuidv4(), 
      date: new Date().toISOString(),
      approved: false
    };
    setReviews(prevReviews => [...prevReviews, newReview]);
    toast.success(`Отзыв добавлен и ожидает проверки`);
  };

  const approveReview = (id: string) => {
    setReviews(prevReviews => 
      prevReviews.map(review => 
        review.id === id ? { ...review, approved: true } : review
      )
    );
    toast.success(`Отзыв одобрен`);
  };

  const deleteReview = (id: string) => {
    const review = reviews.find(r => r.id === id);
    setReviews(prevReviews => prevReviews.filter(review => review.id !== id));
    if (review) {
      toast.info(`Отзыв от ${review.author} удален`);
    }
  };

  return (
    <SettingsContext.Provider value={{
      categories,
      addCategory,
      updateCategory,
      deleteCategory,
      
      socialMedia,
      addSocialMedia,
      updateSocialMedia,
      deleteSocialMedia,
      
      reviews,
      addReview,
      approveReview,
      deleteReview,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
