import React from 'react';

export type ButtonVariants = 'primary' | 'secondary';

type ButtonProps = {
  variant?: ButtonVariants;
  type?: 'button' | 'reset' | 'submit';
  extraUtilityClasses?: string;
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  type = 'button',
  extraUtilityClasses,
  children,
}) => {
  const primaryButtonStyles = `flex-shrink-0 inline-flex text-white bg-purple-500 border-0 py-2 px-6 hover:bg-purple-600 rounded ${extraUtilityClasses}`;
  const secondaryButtonStyles = `hover:text-white ${extraUtilityClasses}`;

  return (
    <button type={type} className={variant === 'primary' ? primaryButtonStyles : secondaryButtonStyles}>
      {children}
    </button>
  );
};
