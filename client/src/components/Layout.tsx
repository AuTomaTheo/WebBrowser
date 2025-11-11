import { ReactNode, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Placeholder for fixed header to maintain layout flow */}
      <div style={{ height: '138px' }} />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      {showBackToTop && <BackToTop />}
    </div>
  );
}
