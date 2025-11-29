import { useState } from 'react';
import { Copy, Check, Tag, X } from 'lucide-react';

export default function DiscountBanner() {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const discountCode = 'atelierulcuflori10';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(discountCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-secondary/10 via-secondary/5 to-secondary/10 border-b border-secondary/20">
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-sm">
          <Tag className="h-4 w-4 text-secondary flex-shrink-0" />
          <span className="text-primary/80">
            <span className="hidden sm:inline">Folosește codul </span>
            <span className="sm:hidden">Cod: </span>
            <button
              onClick={handleCopy}
              className="font-semibold text-primary hover:text-secondary transition-colors inline-flex items-center gap-1.5 bg-white/60 px-2 py-0.5 rounded border border-secondary/30 hover:border-secondary/50"
              data-testid="button-copy-discount"
            >
              {discountCode}
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-600" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-secondary/70" />
              )}
            </button>
            <span className="hidden sm:inline"> pentru </span>
            <span className="sm:hidden"> - </span>
            <span className="font-medium text-secondary">10% reducere</span>
          </span>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-2 p-1 text-primary/40 hover:text-primary/70 transition-colors"
            aria-label="Închide"
            data-testid="button-close-discount"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
