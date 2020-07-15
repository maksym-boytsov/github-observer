import React from 'react';

type LinkProps = {
  href: string;
  extraUtilityClasses?: string;
};

const Link: React.FC<LinkProps> = ({ children, extraUtilityClasses }) => {
  return (
    <Link href="/">
      <div className={`hover:text-white ${extraUtilityClasses}`}>{children}</div>
    </Link>
  );
};

export default Link;
