import React, { ReactNode } from 'react';
import '../styles/global.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <main className="bg-blue-200">{children}</main>;
};

export default Layout;
