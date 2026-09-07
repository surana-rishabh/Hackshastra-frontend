import * as React from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: SelectOption[];
  placeholder?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  typeAccent?: string;
  className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  options,
  placeholder = 'Select an option',
  helperText,
  error,
  required = false,
  typeAccent = '#1789E5',
  className,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

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
        <select
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            if (onBlur) onBlur();
          }}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            'w-full appearance-none px-2.5 py-1.5 sm:py-2 rounded-[4px] font-sans text-xs sm:text-sm text-white bg-black/60 backdrop-blur-md cursor-pointer',
            'border transition-all duration-200 outline-none',
            'shadow-inner focus:bg-black/80',
            !value && 'text-slate-400',
            error
              ? 'border-red-500 ring-1 ring-red-500/40'
              : 'border-white/20 hover:border-white/40'
          )}
          style={{
            borderColor: !error && isFocused ? typeAccent : undefined,
            boxShadow: !error && isFocused ? `0 0 0 1px ${typeAccent}, 0 0 12px ${typeAccent}30` : undefined,
          }}
        >
          <option value="" disabled className="bg-slate-900 text-slate-400">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
              {opt.label}
            </option>
          ))}
        </select>

        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 flex items-center gap-1">
          {error && <AlertCircle className="w-4 h-4 text-red-400" />}
          <ChevronDown className="w-4 h-4" />
        </div>
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
