import React, { ReactNode } from 'react';
import { Link } from 'gatsby';
import '../styles/global.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header>
        <h1>Musehabit</h1>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </header>
      <main className="bg-blue-200">{children}</main>
    </>
  );
};

export default Layout;
