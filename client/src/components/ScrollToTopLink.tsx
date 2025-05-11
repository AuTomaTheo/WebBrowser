import { Link, useLocation } from 'wouter';
import { ReactNode, useCallback } from 'react';

interface ScrollToTopLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * A Link component that scrolls to the top of the page when clicked
 */
export function ScrollToTopLink({ href, children, className = '' }: ScrollToTopLinkProps) {
  const [location] = useLocation();
  
  const handleClick = useCallback(() => {
    // If it's the same route, just scroll to top without navigation
    if (location === href) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // For different routes, scroll to top after the navigation occurs
      // We use a small timeout to ensure the navigation happens first
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'auto' // Use 'auto' instead of 'smooth' for navigation to other pages
        });
      }, 50);
    }
  }, [location, href]);

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}