import React, { createContext, useContext, useState } from 'react';

type User = {
  uid: string;
  email: string; 
  isAdmin: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  verifyAdmin: () => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const isAdmin = email.endsWith('@admin.com') && password === 'admin123';
    if (!email || !password) return false;
    
    setUser({
      uid: `user-${Date.now()}`,
      email,
      isAdmin
    });
    return true;
  };

  const logout = () => setUser(null);

  const verifyAdmin = () => user?.isAdmin || false;

  return (
    <AuthContext.Provider value={{ user, login, logout, verifyAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
