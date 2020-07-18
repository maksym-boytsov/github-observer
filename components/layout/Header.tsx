import React, { useContext } from 'react';
import { useRouter } from 'next/dist/client/router';

import { Input } from 'components/forms/Input';
import { GlobalContext } from 'store';
import { GithubIcon } from 'components/ui/Icons';
import { Link } from 'components/ui/Link';
import { Button } from 'components/ui/Button';

export const Header: React.FC = () => {
  const { query, handleQueryChange, setShouldRevalidate } = useContext(GlobalContext);

  const { pathname } = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShouldRevalidate && setShouldRevalidate(true);
  };

  return (
    <header className="text-gray-500 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <div className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <GithubIcon />
          <span className="ml-3 text-xl select-none">Github Observer</span>
        </div>

        <form onSubmit={handleSubmit} className="flex justify-center mt-2 md:mt-0">
          <Input
            value={query}
            placeholder={`${pathname === '/' ? 'Github login' : 'Organization'}`}
            onChange={handleQueryChange}
            extraUtilityClasses="w-40 sm:w-auto"
          />
          <Button type="submit">Search</Button>
        </form>

        <nav className="flex flex-wrap items-center text-base justify-center mt-6 md:mt-0">
          <Link href="/" extraUtilityClasses="mr-2">
            Users
          </Link>
          <Link href="/organizations" extraUtilityClasses="ml-2">
            Organizations
          </Link>
        </nav>
      </div>
    </header>
  );
};
