import { Link, useLocation } from 'wouter';
import { ReactNode } from 'react';

interface ScrollToTopLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * A Link component that scrolls to the top of the page when clicked
 */
export function ScrollToTopLink({ href, children, className = '' }: ScrollToTopLinkProps) {
  const [, setLocation] = useLocation();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'instant' });
    setLocation(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}