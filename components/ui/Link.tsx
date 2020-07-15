import React from 'react';
import NextLink from 'next/link';

type LinkProps = {
  href: string;
  extraUtilityClasses?: string;
};

export const Link: React.FC<LinkProps> = ({ href, children, extraUtilityClasses }) => {
  return (
    <NextLink href={href}>
      <div className={`hover:text-white cursor-pointer focus:shadow-outline ${extraUtilityClasses}`}>{children}</div>
    </NextLink>
  );
};
