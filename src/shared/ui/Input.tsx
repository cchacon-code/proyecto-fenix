import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function Input({
  label,
  error,
  hint,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label className="ui-field" htmlFor={inputId}>
      <span className="ui-field-label">{label}</span>

      <input
        id={inputId}
        className={`ui-input ${error ? 'ui-input-error' : ''} ${className}`}
        {...props}
      />

      {error ? (
        <span className="ui-field-error">{error}</span>
      ) : (
        hint && <span className="ui-field-hint">{hint}</span>
      )}
    </label>
  );
}
