import { Link } from 'wouter';
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
  const handleClick = () => {
    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}