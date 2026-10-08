import React from 'react';

interface CardProps {
  title?: string;
  badge?: string;
  badgeVariant?: 'neutral' | 'accent' | 'success';
  variant?: 'default' | 'subtle';
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  badge,
  badgeVariant = 'neutral',
  variant = 'default',
  children,
  className = '',
}) => {
  const getBadgeStyle = () => {
    switch (badgeVariant) {
      case 'accent':
        return 'bg-[#ff5a1f]/10 text-[#ff5a1f] border-[#ff5a1f]/20';
      case 'success':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'neutral':
      default:
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
    }
  };

  return (
    <div
      className={`border border-neutral-200/80 rounded-xl transition-all ${
        variant === 'subtle' ? 'bg-[#fafaf8]' : 'bg-white shadow-xs'
      } ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
          <h3 className="font-sans font-semibold text-neutral-900 text-sm tracking-tight">{title}</h3>
          {badge && (
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-sans font-medium border ${getBadgeStyle()}`}
            >
              {badge}
            </span>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};
