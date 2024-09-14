import { useContext, createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  userToken: string | null;
  userInfo: any | null;
  login: (token: string, user: any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any | null>(null);

  const login = async (token: string, user: any) => {
    setUserToken(token);
    setUserInfo(user);
    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('userInfo', JSON.stringify(user));
  };

  const logout = async () => {
    setUserToken(null);
    setUserInfo(null);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userInfo');
  };

  const loadSession = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const user = await AsyncStorage.getItem('userInfo');
    if (token) {
      setUserToken(token);
      setUserInfo(JSON.parse(user!));
    }
  };

  const checkExpired = (token: string) => {
    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = decodedToken.exp * 1000;
        return Date.now() > expirationTime;
    } catch(err) {
        return false
    }
  }

  useEffect(() => {
    loadSession();
    if (checkExpired(userToken!)) {
        logout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be within an AuthProvider');
  }
  return context;
};
