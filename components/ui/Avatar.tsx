import React from 'react';

type AvatarProps = {
  src?: string;
};

export const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <img
        alt="avatar"
        src={src}
        className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600"
      />
    );
  }

  return <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600" />;
};
