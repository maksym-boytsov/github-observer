import React from 'react';

type ButtonProps = {
  type?: 'button' | 'reset' | 'submit';
  extraUtilityClasses?: string;
};

export const Button: React.FC<ButtonProps> = ({ type = 'button', extraUtilityClasses, children }) => {
  return (
    <button
      type={type}
      className={`flex-shrink-0 inline-flex text-white bg-purple-500 border-0 py-2 px-6 hover:bg-purple-600 rounded ${extraUtilityClasses}`}
    >
      {children}
    </button>
  );
};
