import * as React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CardFieldProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel';
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  typeAccent?: string;
  autoFocus?: boolean;
  className?: string;
}

export const CardField: React.FC<CardFieldProps> = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  helperText,
  error,
  required = false,
  typeAccent = '#1789E5',
  autoFocus = false,
  className,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className={cn('w-full space-y-1 text-left', className)}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block font-pokemon text-[11px] sm:text-xs uppercase tracking-wide transition-colors duration-200"
          style={{
            color: isFocused ? typeAccent : '#FDE68A',
            textShadow: isFocused ? `0 0 10px ${typeAccent}60` : undefined,
          }}
        >
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        {helperText && !error && (
          <span className="font-mono text-[9px] sm:text-[10px] text-slate-400 hidden sm:inline-block">
            {helperText}
          </span>
        )}
      </div>

      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            if (onBlur) onBlur();
          }}
          placeholder={placeholder}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            'w-full px-2.5 py-1.5 sm:py-2 rounded-[4px] font-sans text-xs sm:text-sm text-white bg-black/60 backdrop-blur-md',
            'border transition-all duration-200 outline-none placeholder:text-slate-500',
            'shadow-inner focus:bg-black/80',
            error
              ? 'border-red-500 ring-1 ring-red-500/40'
              : 'border-white/20 hover:border-white/40'
          )}
          style={{
            borderColor: !error && isFocused ? typeAccent : undefined,
            boxShadow: !error && isFocused ? `0 0 0 1px ${typeAccent}, 0 0 12px ${typeAccent}30` : undefined,
          }}
        />

        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-red-400">
            <AlertCircle className="w-4 h-4" />
          </div>
        )}
      </div>

      {error ? (
        <p id={`${id}-error`} className="font-mono text-[10px] sm:text-[11px] text-red-400 flex items-center gap-1 font-medium pt-0.5">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
};
