import { Link } from 'react-router-dom';

interface BracketButtonProps {
  /** The text to display inside brackets */
  children: React.ReactNode;
  /** Route path for internal navigation */
  href?: string;
  /** External URL (opens in new tab) */
  externalHref?: string;
  /** Additional CSS class names */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

/**
 * BracketButton Component
 * Monospace bracket-wrapped CTA inspired by Next Tech Lab's `[EXPLORE OUR WORK]` buttons.
 * Clean hover inversion: transparent → white bg with black text.
 */
const BracketButton = ({
  children,
  href,
  externalHref,
  className = '',
  onClick,
}: BracketButtonProps) => {
  const baseClasses = `
    inline-flex items-center justify-center
    font-mono text-sm md:text-base tracking-wider uppercase
    px-6 py-3
    border border-neutral-500 hover:border-white
    text-neutral-300 hover:text-black
    hover:bg-white
    transition-all duration-300 ease-out
    group cursor-pointer
    ${className}
  `.trim();

  const content = (
    <>
      <span className="mr-1 text-neutral-500 group-hover:text-black transition-colors">[</span>
      {children}
      <span className="ml-1 text-neutral-500 group-hover:text-black transition-colors">]</span>
    </>
  );

  // External link
  if (externalHref) {
    return (
      <a
        href={externalHref}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  // Internal route link
  if (href) {
    return (
      <Link to={href} className={baseClasses} onClick={onClick}>
        {content}
      </Link>
    );
  }

  // Plain button
  return (
    <button className={baseClasses} onClick={onClick}>
      {content}
    </button>
  );
};

export default BracketButton;
