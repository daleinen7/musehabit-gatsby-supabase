import React, { ReactNode } from 'react';
import { Link } from 'gatsby';
import { useAuth } from '../auth/AuthProvider';
import '../styles/global.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const authContext = useAuth();

  const user = authContext?.user ?? null;
  const logout = authContext?.logout ?? (() => {});

  console.log(user);

  return (
    <>
      <header>
        {user ? (
          <>
            <h1>Musehabit</h1>
            <ul>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </>
        ) : (
          <>
            <h1>Musehabit</h1>
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </>
        )}
      </header>
      <main className="bg-blue-200">{children}</main>
    </>
  );
};

export default Layout;
