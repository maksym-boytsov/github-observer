import React from 'react';

import { FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from 'components/ui/Icons';
import { Anchor } from 'components/ui/Anchor';

export const Footer: React.FC = () => {
  return (
    <footer className="text-gray-500 bg-gray-800 body-font">
      <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
        <div className="text-gray-600 text-sm text-center sm:text-left">
          © 2020 Maksym Boytsov —{' '}
          <Anchor href="https://twitter.com/maxboytsov" isTargetBlank utilityClasses="text-gray-500">
            @maxboytsov
          </Anchor>
        </div>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
          <Anchor href="https://www.facebook.com/maksymboytsov" isTargetBlank extraUtilityClasses="mr-2">
            <FacebookIcon />
          </Anchor>
          <Anchor href="https://twitter.com/maxboytsov/" isTargetBlank extraUtilityClasses="mr-2">
            <TwitterIcon />
          </Anchor>
          <Anchor href="https://www.instagram.com/maxboytsov/" isTargetBlank extraUtilityClasses="mr-2">
            <InstagramIcon />
          </Anchor>
          <Anchor href="https://www.linkedin.com/in/maksym-boytsov/" isTargetBlank>
            <LinkedInIcon />
          </Anchor>
        </span>
      </div>
    </footer>
  );
};
