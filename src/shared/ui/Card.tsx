import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export function Card({
  children,
  title,
  subtitle,
  actions,
  className = '',
}: CardProps) {
  return (
    <section className={`ui-card ${className}`}>
      {(title || subtitle || actions) && (
        <header className="ui-card-header">
          <div>
            {title && <h3>{title}</h3>}
            {subtitle && <p>{subtitle}</p>}
          </div>

          {actions && <div className="ui-card-actions">{actions}</div>}
        </header>
      )}

      <div className="ui-card-content">{children}</div>
    </section>
  );
}
