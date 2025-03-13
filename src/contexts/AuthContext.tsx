
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

type User = {
  id: string;
  username: string;
  role: 'admin' | 'user';
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// В реальном приложении эти данные хранились бы в базе данных
let ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('aria-mist-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (user) {
      localStorage.setItem('aria-mist-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aria-mist-user');
    }
  }, [user]);

  useEffect(() => {
    // Загрузка сохраненного пароля
    const savedCredentials = localStorage.getItem('aria-mist-admin-credentials');
    if (savedCredentials) {
      ADMIN_CREDENTIALS = JSON.parse(savedCredentials);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Имитация проверки учетных данных (в реальном приложении это был бы API-запрос)
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setUser({
        id: '1',
        username,
        role: 'admin',
      });
      toast.success('Вход выполнен успешно');
      return true;
    }
    
    toast.error('Неверное имя пользователя или пароль');
    return false;
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (currentPassword !== ADMIN_CREDENTIALS.password) {
      toast.error('Текущий пароль введен неверно');
      return false;
    }
    
    if (newPassword.length < 6) {
      toast.error('Новый пароль должен содержать не менее 6 символов');
      return false;
    }
    
    ADMIN_CREDENTIALS.password = newPassword;
    localStorage.setItem('aria-mist-admin-credentials', JSON.stringify(ADMIN_CREDENTIALS));
    toast.success('Пароль успешно изменен');
    return true;
  };

  const logout = () => {
    setUser(null);
    toast.info('Вы вышли из системы');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      changePassword,
      isAuthenticated,
      isAdmin,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
