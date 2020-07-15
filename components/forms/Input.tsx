import React from 'react';

type InputProps = {
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  extraUtilityClasses?: string;
};

export const Input: React.FC<InputProps> = ({ placeholder = 'Enter...', onChange, value, extraUtilityClasses }) => {
  return (
    <input
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={`bg-gray-800 rounded text-white xl:mr-4 mr-2 border border-gray-700 focus:border-purple-500 text-base py-2 px-4 ${extraUtilityClasses}`}
      type="text"
    />
  );
};
