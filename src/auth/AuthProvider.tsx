import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../lib/types';

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = (): AuthContextProps => {
  const authContext = useContext(AuthContext);

  // Provide a default AuthContextProps object if authContext is null
  return (
    authContext || {
      user: null,
      login: () => Promise.resolve(),
      signup: () => Promise.resolve(),
      logout: () => Promise.resolve(),
      setUser: () => {},
    }
  );
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;

        if (data?.user) {
          const { id, email } = data.user;
          if (typeof email !== 'string') throw new Error('No email');
          setUser({ id, email });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null); // Set user to null in case of error
      }
    };
    getUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      if (data?.user) {
        const { id, email } = data.user;
        if (typeof email !== 'string') throw new Error('No email');
        setUser({ id, email });
        console.log('User logged in successfully', user);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const { data: userData, error: signupError } = await supabase.auth.signUp(
        {
          email,
          password,
        },
      );
      if (signupError) throw signupError;

      if (userData?.user) {
        const { id, email } = userData.user;
        if (typeof email !== 'string') throw new Error('No email');

        const { data: profile, error: profileError } = await supabase
          .from('Profile')
          .insert([{ user_id: id, user_name: email, shame: '', zipcode: null }])
          .select();

        if (profileError) throw profileError;
        setUser({ id, email });
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const value: AuthContextProps = {
    user,
    login,
    logout,
    signup,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
