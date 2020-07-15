import React from 'react';

type AnchorProps = {
  href: string;
  utilityClasses?: string;
  extraUtilityClasses?: string;
  isTargetBlank?: boolean;
};

export const Anchor: React.FC<AnchorProps> = ({
  href,
  utilityClasses,
  extraUtilityClasses,
  isTargetBlank = false,
  children,
}) => {
  if (utilityClasses && extraUtilityClasses) {
    throw new Error('You must provide one of the following attributes: utilityClasses, extraUtilityClasses');
  }

  return (
    <a
      href={href}
      className={utilityClasses ? utilityClasses : `text-gray-600 ${extraUtilityClasses}`}
      rel={isTargetBlank ? 'noopener noreferrer' : ''}
      target={isTargetBlank ? '_blank' : '_self'}
    >
      {children}
    </a>
  );
};
