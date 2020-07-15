import React, { useContext, useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import useSWR from 'swr';

import { GithubProfileRes } from 'api/github/models';
import { GithubEndpoints, githubFetcher } from 'api/github';
import { ArrowRightIcon, CompanyIcon, RepositoriesIcon, UsersIcon } from 'components/ui/Icons';
import { GlobalContext } from 'store';
import { Anchor } from 'components/ui/Anchor';
import { Avatar } from 'components/ui/Avatar';

type HomeProps = {
  initialData: GithubProfileRes;
  query: string;
};

const Home: NextPage<HomeProps> = ({ initialData }) => {
  const { query, shouldRevalidate, setShouldRevalidate } = useContext(GlobalContext);

  const { data, mutate } = useSWR(
    [`${GithubEndpoints.USERS}/`, query],
    (endpoint, username) => githubFetcher(endpoint + username),
    {
      initialData,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (shouldRevalidate) {
      mutate({ ...data });
      setShouldRevalidate && setShouldRevalidate(false);
    }
  }, [data, mutate, setShouldRevalidate, shouldRevalidate]);

  const { login, avatar_url, name, bio, public_repos, followers, following, hireable, html_url } = data;

  return (
    <main className="text-gray-500 bg-gray-900 body-font flex items-center justify-center">
      {data && !data.message ? (
        <div className="container px-5 py-10 sm:py-24  flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div id="main-block" className="flex flex-col sm:flex-row">
              <div className="sm:w-1/2 text-center sm:pr-8 sm:py-8">
                <Avatar src={avatar_url} />
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-white text-lg">{name}</h2>
                  <h4 className="mb-2">{login}</h4>
                  <div className="w-12 h-1 bg-purple-500 rounded mt-2 mb-4"></div>
                  <p className="text-sm text-gray-300">{bio || 'No bio'}</p>
                </div>
              </div>
              <div className="sm:w-1/2 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <div className="flex">
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 mb-5">
                    <RepositoriesIcon />
                  </div>
                  <div className="ml-4 text-left">
                    <h2 className="text-white text-lg title-font font-medium">Public Repositories</h2>
                    <a href={`${html_url}?tab=repositories`} className="leading-relaxed text-purple-400">
                      {public_repos}
                    </a>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 mb-5">
                    <UsersIcon />
                  </div>
                  <div className="ml-4 text-left">
                    <h2 className="text-white text-lg title-font font-medium">Followers / Following</h2>
                    <a href={`${html_url}?tab=followers`} className="leading-relaxed text-purple-400">
                      {followers}
                    </a>
                    <span className="select-none"> / </span>
                    <a href={`${html_url}?tab=following`} className="leading-relaxed text-purple-400">
                      {following}
                    </a>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 mb-5">
                    <CompanyIcon />
                  </div>
                  <div className="ml-4 text-left">
                    <h2 className="text-white text-lg title-font font-medium">Available for hire?</h2>
                    <p className="leading-relaxed text-purple-400">{hireable ? 'Yes' : 'No'}</p>
                  </div>
                </div>
                <Anchor href={html_url} isTargetBlank utilityClasses="text-purple-500 inline-flex items-center ">
                  Go to profile <ArrowRightIcon />
                </Anchor>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-3xl">Nothing found</h1>
      )}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data: GithubProfileRes = await githubFetcher(`${GithubEndpoints.USERS}/mayicodefuture`);

  return {
    props: { initialData: data },
  };
};

export default Home;
